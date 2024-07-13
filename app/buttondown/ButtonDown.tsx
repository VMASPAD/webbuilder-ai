import React, { useState, useEffect } from "react";

const BottomHoverMenu = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientY } = event;
      const { innerHeight } = window;
      const threshold = innerHeight - 100; // Aparece cuando el cursor está a 100px del borde inferior

      setIsVisible(clientY > threshold);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 transition-all duration-300 ease-in-out z-10 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="container mx-auto flex items-center justify-center">
        <div className="panel__top"></div>
      </div>
    </div>
  );
};

export default BottomHoverMenu;
