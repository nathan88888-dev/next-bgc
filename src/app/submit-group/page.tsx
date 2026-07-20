"use client";

import { SubmitGroupPage } from "@/app/pages/SubmitGroupPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SubmitGroupPage />
    </Suspense>
  );
}
