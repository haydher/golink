import React from "react";

type Props = {
  state?: "error" | "loading" | "success";
};

export default function Repository({ state }: Props): JSX.Element | null {
  if (state && state !== "loading") {
    return null;
  }

  return (
    <React.Fragment>
      {[1, 2, 3, 4].map((result) => (
        <div className="border p-4 rounded-lg mb-4" key={result}>
          <div className="flex justify-between items-center">
            <div className="animate-pulse h-4 w-24 bg-gray-400 rounded-lg"></div>

            <div className="flex items-center mb-4">
              <div className="animate-pulse h-4 w-8 bg-gray-400 rounded-lg mr-2"></div>
              <div className="animate-pulse h-4 w-8 bg-gray-400 rounded-lg"></div>
            </div>
          </div>

          <div className="animate-pulse h-4 w-48 sm:w-80 mb-2 bg-gray-400 rounded-lg"></div>
          <div className="animate-pulse h-4 w-32 sm:w-72 mb-2 bg-gray-400 rounded-lg"></div>

          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="animate-pulse h-4 w-4 mr-2 bg-gray-400 rounded-full"></div>
              <div className="animate-pulse h-4 w-8 bg-gray-400 rounded-lg"></div>
            </div>

            <div className="animate-pulse h-4 w-8 bg-gray-400 rounded-lg"></div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}
