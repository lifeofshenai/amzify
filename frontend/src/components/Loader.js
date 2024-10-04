// components/Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="loader" />
      <style jsx>{`
        .loader {
          border: 8px solid rgba(0, 0, 0, 0.1);
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
