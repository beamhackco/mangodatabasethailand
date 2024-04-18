import React from "react";
import NavIMG from "../../../assets/bg/22.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Card, Col, Row } from "antd";

const cardstyle = {
  boxShadow: "0 6px 6px 0 rgba(0, 0, 0, 0.1), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
  // borderRadius: "50px",
  // width: "350px",
  // margin: "0 auto",
  // height: "200px",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  border: "none",
};

const textstyle = {
  color: "#016A70",
  fontFamily: "Prompt",
};

function hero() {
  return (
    <section className="overflow-hidden">
      <div className="py-10 md:py-24 mx-auto text-center">
        <img
          src={NavIMG}
          alt="Background Image"
          className="absolute inset-0 w-full h-[814px] md:h-[790px] lg:h-[822px] object-cover z-[-1] brightness-75"
        />
        <div>
          <p className="py-4 text-4xl md:text-6xl font-bold text-white text-center drop-shadow-xl">
            ฐานข้อมูลมะม่วงในประเทศไทย
          </p>
          <p className="text-sm md:text-xl text-white text-center py-6 drop-shadow-xl mx-10">
            เป็นฐานข้อมูลรวบรวมข้อมูลเกี่ยวกับมะม่วงในประเทศไทย
            ครอบคลุมข้อมูลด้านต่างๆ ที่เกี่ยวข้อง
            มีประโยชน์ต่อผู้สนใจมะม่วงทุกกลุ่ม
          </p>
        </div>
        <div className="mx-auto">
          <div className="block md:flex mx-auto justify-center">
            <Col className="basis-1/4 py-10 md:py-16 mx-4 lg:mx-6">
              <Card
                className="mx-auto flex w-[250px] h-[110px] rounded-[30px] md:rounded-[50px] md:w-[280px] md:h-[140px] lg:w-[350px] lg:h-[200px] items-center justify-center"
                style={cardstyle}
              >
                <div className="py-2 lg:py-4">
                  <FontAwesomeIcon
                    icon={faSeedling}
                    style={{ color: "#016A70" }}
                    className="mx-auto w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[70px] mlg:h-[70px] items-center"
                  />
                </div>
                <h1
                  style={textstyle}
                  className="text-md md:text-xl lg:text-2xl font-bold"
                >
                  สายพันธุ์มากกว่า 200 สายพันธุ์
                </h1>
              </Card>
            </Col>
            <Col className="basis-1/4 py-10 md:py-16 mx-4 lg:mx-6">
              <Card
                className="mx-auto flex w-[250px] h-[110px] rounded-[30px] md:rounded-[50px] md:w-[280px] md:h-[140px] lg:w-[350px] lg:h-[200px]  items-center justify-center"
                style={cardstyle}
              >
                <div className="py-2 lg:py-4">
                  <FontAwesomeIcon
                    icon={faBookOpen}
                    style={{ color: "#016A70" }}
                    className="mx-auto w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[70px] mlg:h-[70px] items-center"
                  />
                </div>
                <h1
                  style={textstyle}
                  className="text-md md:text-xl lg:text-2xl font-bold"
                >
                  แหล่งข้อมูล ครบถ้วน ง่ายต่อการเรียนรู้
                </h1>
              </Card>
            </Col>
          </div>
        </div>
      </div>
    </section>
  );
}

export default hero;
