import React, { useState } from "react";
import Logo from "../../../assets/Logo4.png";
import Black from "../../../assets/Black.png";

const color = {
  background: "#016A70",
};

function navbar() {
  const [activePage, setActivePage] = useState(
    "/" + window.location.pathname.split("/")[1]
  );

  const handleSetActivePage = (page) => {
    setActivePage(page);
  };

  return (
    <nav className="relative bg-[#016A70] py-2">
      <div className="h-[70px] bg-white flex items-center justify-between my-4 mx-6 md:mx-20 px-4 py-1 rounded-lg shadow-lg">
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-shrink-0 items-center gap-4">
            <a href="/">
              <img src={Logo} alt="Logo" className="h-[60px]" />
            </a>
            <a href="/">
              <img src={Black} alt="Logo" className="h-[50px]" />
            </a>
          </div>
          <div className="hidden lg:flex mx-auto">
            <div className="lg:space-x-3 xl:space-x-10">
              <a
                href="/"
                className="text-md xl:text-lg text-gray-700 px-4 font-semibold hover:text-[#016A70]"
              >
                หน้าแรก
              </a>
              <a
                href="/mango"
                className={`text-md xl:text-lg font-semibold text-gray-700 px-2 xl:px-4 hover:text-[#016A70] ${
                  activePage === "/mango"
                    ? "bg-[#016A70] text-white py-1 px-2 xl:px-4 rounded-md hover:text-white"
                    : ""
                }`}
                onClick={() => handleSetActivePage("/mango")}
              >
                สายพันธุ์ทั้งหมด
              </a>
            </div>
          </div>
          <div className="hidden lg:flex py-1 px-2 rounded-lg" style={color}>
            <a href="/contact" rel="contact">
              <span className="text-md xl:text-lg text-white font-light cursor-pointer">
                ติดต่อเรา
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default navbar;
