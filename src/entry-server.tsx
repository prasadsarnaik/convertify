import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StaticRouter } from "react-router-dom/server";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoutes from "@/AppRoutes";

export function render(url: string) {
  const helmetContext: {
    helmet?: {
      title?: { toString: () => string };
      meta?: { toString: () => string };
      link?: { toString: () => string };
      script?: { toString: () => string };
    };
  } = {};
  const queryClient = new QueryClient();

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  return {
    appHtml,
    helmet: helmetContext.helmet,
  };
}
