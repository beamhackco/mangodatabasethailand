import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo4.png";
import Black from "../../assets/Black.png";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../../services/authorize";
import { Dropdown, Space, Avatar } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";

const items = [
  {
    key: "1",
    label: (
      <Link
        to="/dashboard"
        className="text-sm lg:text-md xl:text-lg text-black hover:text-[#016A70]"
      >
        หน้าแรก
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link
        to="/admin/mango"
        className="text-sm lg:text-md xl:text-lg text-black hover:text-[#016A70]"
      >
        จัดการข้อมูลมะม่วง
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <Link
        to="/admin/plant"
        className="text-sm lg:text-md xl:text-lg text-black hover:text-[#016A70]"
      >
        จัดการข้อมูลบทความ
      </Link>
    ),
  },
  {
    key: "4",
    label: (
      <Link
        to="/admin/news"
        className="text-sm lg:text-md xl:text-lg text-black hover:text-[#016A70]"
      >
        จัดการข้อมูลข่าวสาร
      </Link>
    ),
  },
  {
    key: "5",
    label: (
      <Link
        to="/register"
        className="text-sm lg:text-md xl:text-lg text-black hover:text-[#016A70]"
      >
        จัดการข้อมูลสมาชิก
      </Link>
    ),
  },
  {
    key: "6",
    label: (
      <button
        onClick={() => logout(() => navigate("/admin"))}
        className="bg-[#DD3333] py-1 px-2 text-md lg:text-md text-white rounded-lg"
      >
        ออกจากระบบ
      </button>
    ),
  },
];

const getCookieValue = (name) => {
  const cookieName = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let cookie of cookieArray) {
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
};

function navbar() {
  const navigate = useNavigate();
  const [userAdmin, setUserAdmin] = useState("");

  useEffect(() => {
    // Retrieve userAdmin value from cookie
    const adminValue = getCookieValue("userAdmin");
    setUserAdmin(adminValue);
  }, []);

  const [activePage, setActivePage] = useState(
    "/" +
      window.location.pathname.split("/")["1"] +
      "/" +
      window.location.pathname.split("/")["2"]
  );

  const [activePageOne, setActivePageOne] = useState(
    "/" + window.location.pathname.split("/")["1"]
  );

  const handleSetActivePage = (page) => {
    setActivePage(page);
  };

  const handleSetActivePageOne = (page) => {
    setActivePageOne(page);
  };

  return (
    <nav className="relative bg-[#016A70] py-2">
      <div className="h-[70px] bg-white flex items-center justify-between mx-6 my-4 md:mx-20 px-4 py-1 rounded-lg shadow-lg">
        <div className="flex flex-1 items-center justify-center sm:justify-start">
          <div className="flex flex-shrink-0 items-center gap-4">
            <a href="/">
              <img src={Logo} alt="Logo" className="h-[60px]" />
            </a>
            <a href="/">
              <img src={Black} alt="Logo" className="h-[50px]" />
            </a>
          </div>
          <div className=" md:flex mx-auto sm:block">
            <div className="hidden md:flex space-x-20 sm:space-x-5 lg:space-x-10 ">
              {getUser() && (
                <a
                  href="/dashboard"
                  className={`text-lg font-semibold text-gray-700 px-4 flex items-center hover:text-[#016A70] ${
                    activePageOne === "/dashboard"
                      ? "bg-[#016A70] text-white py-1 px-4 rounded-md hover:text-white"
                      : ""
                  }`}
                  onClick={() => handleSetActivePageOne("/dashboard")}
                >
                  หน้าแรก
                </a>
              )}
              {getUser() && (
                <a
                  href="/admin/mango"
                  className={`text-lg font-semibold text-gray-700 px-4 flex items-center hover:text-[#016A70] ${
                    activePage === "/admin/mango"
                      ? "bg-[#016A70] text-white py-1 px-4 rounded-md hover:text-white"
                      : ""
                  }`}
                  onClick={() => handleSetActivePage("/admin/mango")}
                >
                  จัดการข้อมูลมะม่วง
                </a>
              )}
            </div>
          </div>
          <div className="flex md:hidden pr-5 md:pr-10">
            {getUser() ? (
              <Dropdown
                menu={{
                  items,
                }}
                placement={"bottomRight"}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <MenuOutlined
                      style={{ fontSize: "26px" }}
                      className="cursor-pointer inline-block"
                    />
                  </Space>
                </a>
              </Dropdown>
            ) : (
              <a href="/" rel="contact">
                <span className="bg-[#016A70] py-1 px-2 text-white font-light cursor-pointer rounded-lg">
                  Home
                </span>
              </a>
            )}
          </div>

          {getUser() && (
            <div className="mx-6 hidden md:flex items-center">
              <Avatar icon={<UserOutlined />} />
              <span className="px-2">{userAdmin}</span>
            </div>
          )}
          <div className="hidden md:flex rounded-lg">
            {getUser() ? (
              <div className="gap-4 flex items-center justify-end space-x-3">
                <button
                  onClick={() => logout(() => navigate("/admin"))}
                  className="bg-[#DD3333] py-1 px-2 text-md lg:text-md text-white rounded-lg"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <a href="/" rel="contact">
                <span className="bg-[#016A70] py-1 px-2 text-white font-light cursor-pointer rounded-lg">
                  Home
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default navbar;
