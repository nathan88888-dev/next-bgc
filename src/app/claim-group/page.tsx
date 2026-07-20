"use client";

import { ClaimGroupPage } from "@/app/pages/ClaimGroupPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ClaimGroupPage />
    </Suspense>
  );
}
