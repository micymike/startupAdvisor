import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Startup Advisor AI",
  description:
    "A LangGraph-powered multi-agent startup advisory platform using Azure OpenAI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
