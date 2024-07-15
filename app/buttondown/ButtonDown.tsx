// @ts-nocheck
import React, { useState, useEffect } from "react";

function ButtonDown(){
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientY } = event;
      const { innerHeight } = window;
      const threshold = innerHeight - 100; // Appears when the cursor is 100px from the bottom edge

      setIsVisible(clientY > threshold);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 bottom-8 transition-all duration-300 ease-in-out z-10 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
        <div className="panel__basic-actions"></div>
        <div className="panel__devices"></div>

      </div>
    </div>
  );
};

export default ButtonDown;