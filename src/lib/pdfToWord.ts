// src/lib/pdfToWord.ts
// CloudConvert API integration for PDF to Word conversion

const API_KEY = import.meta.env.VITE_CLOUDCONVERT_API_KEY || "";

export interface ConversionResult {
  blob: Blob;
  filename: string;
}

export interface CloudConvertError {
  message: string;
  code?: string;
}

/**
 * Validates PDF file
 * Max size: 25MB
 */
export function validatePdfFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 25 * 1024 * 1024; // 25MB

  const lowerName = file.name.toLowerCase();
  if (!lowerName.endsWith(".pdf")) {
    return { valid: false, error: "Only PDF files are supported" };
  }

  if (file.size > maxSize) {
    return { valid: false, error: "File size exceeds 25MB limit" };
  }

  return { valid: true };
}

/**
 * Formats file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Converts PDF to Word (DOCX) using CloudConvert API
 */
export async function convertPdfToWord(file: File): Promise<ConversionResult> {
  if (!API_KEY) {
    throw new Error("CloudConvert API key not configured. Please add VITE_CLOUDCONVERT_API_KEY to your environment.");
  }

  const validation = validatePdfFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  try {
    // Step 1: Create job
    const jobResponse = await fetch("https://api.cloudconvert.com/v2/jobs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tasks: {
          "import-file": {
            operation: "import/upload",
          },
          "convert-file": {
            operation: "convert",
            input: "import-file",
            input_format: "pdf",
            output_format: "docx",
          },
          "export-file": {
            operation: "export/url",
            input: "convert-file",
          },
        },
      }),
    });

    if (!jobResponse.ok) {
      const error = await jobResponse.json();
      throw new Error(error.message || "Failed to create conversion job");
    }

    const jobData = await jobResponse.json();
    const { data } = jobData;
    const uploadTask = data.tasks.find((t: any) => t.name === "import-file");

    if (!uploadTask?.result?.form) {
      throw new Error("Invalid upload task response");
    }

    // Step 2: Upload file
    const formData = new FormData();
    for (const [key, value] of Object.entries(uploadTask.result.form.parameters)) {
      formData.append(key, value as string);
    }
    formData.append("file", file);

    const uploadResponse = await fetch(uploadTask.result.form.url, {
      method: "POST",
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload file to CloudConvert");
    }

    // Step 3: Poll for completion
    const jobId = data.id;
    let attempts = 0;
    const maxAttempts = 60; // 2 minutes (2s intervals)

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const statusResponse = await fetch(`https://api.cloudconvert.com/v2/jobs/${jobId}`, {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
        },
      });

      if (!statusResponse.ok) {
        throw new Error("Failed to check job status");
      }

      const statusData = await statusResponse.json();
      const { data: job } = statusData;
      const status = job.status;

      if (status === "finished") {
        const exportTask = job.tasks.find((t: any) => t.name === "export-file");
        if (!exportTask?.result?.files?.[0]?.url) {
          throw new Error("Conversion completed but no file URL found");
        }

        // Step 4: Download converted file
        const fileUrl = exportTask.result.files[0].url;
        const downloadResponse = await fetch(fileUrl);

        if (!downloadResponse.ok) {
          throw new Error("Failed to download converted file");
        }

        const blob = await downloadResponse.blob();
        const baseName = file.name.replace(/\.pdf$/i, "");

        return {
          blob,
          filename: `${baseName}.docx`,
        };
      }

      if (status === "error") {
        const errorTask = job.tasks.find((t: any) => t.status === "error");
        throw new Error(errorTask?.result?.message || "Conversion failed");
      }

      attempts++;
    }

    throw new Error("Conversion timed out. Please try again.");
  } catch (error: any) {
    console.error("CloudConvert conversion error:", error);
    throw new Error(error.message || "Conversion failed. Please try again.");
  }
}
