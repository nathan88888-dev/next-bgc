import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import { AppProviders } from "./providers";
import { Navigation } from "@/app/components/Navigation";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "BGC 2.0 - Board Game Clubs Directory",
  description: "Find local board game groups, clubs, and events near you.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          <AppProviders>
            <Suspense fallback={<div className="h-16 bg-white border-b border-gray-200" />}>
              <Navigation />
            </Suspense>
            {children}
          </AppProviders>
        </div>
      </body>
    </html>
  );
}
