// src/test/wordToPdf.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  validateWordFile,
  formatFileSize,
  convertWordToPdf,
} from "@/lib/wordToPdf";

describe("wordToPdf", () => {
  describe("validateWordFile", () => {
    it("should validate .doc files", () => {
      const file = new File(["content"], "test.doc", {
        type: "application/msword",
      });
      const result = validateWordFile(file);
      expect(result.valid).toBe(true);
    });

    it("should validate .docx files", () => {
      const file = new File(["content"], "test.docx", {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const result = validateWordFile(file);
      expect(result.valid).toBe(true);
    });

    it("should reject non-Word files", () => {
      const file = new File(["content"], "test.pdf", {
        type: "application/pdf",
      });
      const result = validateWordFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toBe("Only .doc and .docx files are supported");
    });

    it("should reject files over 25MB", () => {
      const largeContent = new Array(26 * 1024 * 1024).fill("a").join("");
      const file = new File([largeContent], "large.docx", {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      Object.defineProperty(file, "size", { value: 26 * 1024 * 1024 });
      const result = validateWordFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toBe("File size exceeds 25MB limit");
    });
  });

  describe("formatFileSize", () => {
    it("should format bytes", () => {
      expect(formatFileSize(500)).toBe("500 B");
    });

    it("should format KB", () => {
      expect(formatFileSize(1024)).toBe("1 KB");
      expect(formatFileSize(1536)).toBe("2 KB");
    });

    it("should format MB", () => {
      expect(formatFileSize(1024 * 1024)).toBe("1.0 MB");
      expect(formatFileSize(1.5 * 1024 * 1024)).toBe("1.5 MB");
    });
  });

  describe("convertWordToPdf", () => {
    beforeEach(() => {
      vi.stubGlobal("import.meta", {
        env: { VITE_CLOUDCONVERT_API_KEY: "" },
      });
    });

    it("should throw error when API key is not configured", async () => {
      const file = new File(["content"], "test.docx", {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      await expect(convertWordToPdf(file)).rejects.toThrow(
        "CloudConvert API key not configured"
      );
    });
  });
});
