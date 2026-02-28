import React from "react";

export default function Test() {
  // 共通のボックススタイル（マージンとパディング）を定義
  const baseBoxClass = "mt-4 p-4";

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-600">Inertia + React + Tailwind</h1>
      <p className="mt-4">This is a test page to verify the hybrid environment.</p>
      <div className={`${baseBoxClass} border border-green-300 bg-green-50 rounded`}>
        <p>Tailwind CSS styling is applied here.</p>
      </div>
      <div className={`${baseBoxClass} bg-red-100 rounded-lg`}>
        <p className="text-red-700">Tailwind CSS styling is applied here.</p>
      </div>
    </div>
  );
}
