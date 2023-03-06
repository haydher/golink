import React from "react";

export default function Card({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className="bg-white shadow-lg border p-4 rounded-lg mb-4">{children}</div>;
}
