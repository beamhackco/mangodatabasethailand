import React from "react";
import { Col } from "antd";
import Logo from "../../../assets/Logo4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="custom-shape-divider-bottom-1709307190">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="overflow-hidden"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="bg-[#016A70]">
        <div className="md:container px-5 py-6 lg:py-10">
          <div className="grid grid-rows-5 lg:grid-cols-5 lg:grid-rows-1 divide-y lg:divide-y-0">
            <div className="row-span-1 text-center text-white">
              <div className="flex justify-center">
                <img src={Logo} alt="Logo" className="h-[50px]" />
              </div>
              <p className="py-2">
                ที่อยู่ : สถานีวิจัยปากช่อง ตำบล ปากช่อง อำเภอปากช่อง
                จังหวัดนครราชสีมา 30340
              </p>
              <p className="py-2">โทรศัพท์ : 000-000-000</p>
              <p className="py-2">
                อีเมล์ :{" "}
                <a href="mailto: william.henry.harrison@example-pet-store.com">
                  johndoe@gmail.com
                </a>
              </p>
            </div>
            <div className="row-span-1 text-center text-white">
              <h1 className="text-xl md:text-2xl font-semibold py-4">
                {" "}
                ข่าวสาร
              </h1>
              <ul className="text-md md:text-lg gap-y-10">
                <li className="py-2">
                  <a href="/news">ข่าวสารทั่วไป</a>
                </li>
                <li className="py-2">
                  <a href="/news">ข่าววิจัย</a>
                </li>
                <li>
                  <a href="/news">ข่าวประชาสัมพันธ์</a>
                </li>
              </ul>
            </div>
            <div className="row-span-1 text-center text-white">
              <h1 className="text-xl md:text-2xl font-semibold py-4">บทความ</h1>
              <ul className="text-md md:text-lg">
                <li className="py-2">
                  <a href="/plant">วิธีการปลูก</a>
                </li>
                <li>
                  <a href="/plant">วิธีการดูแลรักษา</a>
                </li>
              </ul>
            </div>
            <div className="row-span-1 text-center text-white">
              <h1 className="text-xl md:text-2xl font-semibold py-4">
                ติดต่อเรา
              </h1>
              <ul className="text-md md:text-lg">
                <li className="py-2">
                  <a href="/contact">คำถามที่พบบ่อย</a>
                </li>
              </ul>
            </div>
            <div className="row-span-1 text-center text-white">
              <h1 className="text-xl md:text-2xl font-semibold py-4">
                ติดตามข่าวสารอื่นๆ
              </h1>
              <ul className="flex lg:block justify-center lg:space-y-2">
                <li className="mx-auto p-2 bg-[#1877F2] rounded-md lg:w-52">
                  <a
                    href="https://www.facebook.com/profile.php?id=100057349305402"
                    target="_blank"
                    className="flex items-center lg:justify-center hover:text-white"
                  >
                    <FontAwesomeIcon icon={faFacebook} className="h-6" />
                    <span className="px-2">สถานีวิจัยปากช่อง</span>
                  </a>
                </li>
                <li className="mx-auto p-2 bg-[#FF0000] rounded-md lg:w-52">
                  <a
                    href="https://www.youtube.com/channel/UCnAOCWliq7WWmBdYBp8RRlA"
                    target="_blank"
                    className="flex items-center lg:justify-center hover:text-white"
                  >
                    <FontAwesomeIcon icon={faYoutube} className="h-6" />
                    <span className="px-2">ขวัญใจ Style</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-white">
            <p className="py-2">© 2024 สถานีวิจัยปากช่อง</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
