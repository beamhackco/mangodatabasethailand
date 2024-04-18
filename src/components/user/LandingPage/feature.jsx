import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrochip,
  faHandHoldingDroplet,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

import { Divider } from "antd";

function feature() {
  return (
    <section>
      <div className="md:container px-5 py-14">
        <h1 className="flex justify-center text-3xl font-semibold pb-20">
          บริการที่ดีที่สุดสำหรับคุณ
        </h1>
        <div className="flex gap-5 justify-between flex-wrap group text-center items-center">
          <div className="min-w-[14rem] min-h-[20rem] duration-300 cursor-pointer border-2 border-slate-200 rounded-xl text-center p-6 flex-1">
            <FontAwesomeIcon
              icon={faMicrochip}
              className="mx-auto w-[88px] h-[88px] md:w-[100px] md:h-[100px] items-center"
            />
            <h6 className="mx-auto py-4">ค้นหาสายพันธุ์มะม่วงด้วย AI</h6>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic</p>
          </div>
          <div className="min-w-[14rem] min-h-[20rem] duration-300 cursor-pointer border-2 border-slate-200 rounded-xl text-center p-6 flex-1">
            <FontAwesomeIcon
              icon={faHandHoldingDroplet}
              className="mx-auto w-[88px] h-[88px] md:w-[100px] md:h-[100px] items-center"
            />
            <h6 className="mx-auto py-4">
              ศึกษาวิธีการปลูกและดูสายพันธุ์ทั้งหมด
            </h6>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic
              delectus
            </p>
          </div>
          <div className="min-w-[14rem] min-h-[20rem] duration-300 cursor-pointer border-2 border-slate-200 rounded-xl text-center p-6 flex-1">
            <FontAwesomeIcon
              icon={faNewspaper}
              className="mx-auto w-[88px] h-[88px] md:w-[100px] md:h-[100px] items-center"
            />
            <h6 className="mx-auto py-4">ข่าวสารทันใจ</h6>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
              quidem distinctio tempora
            </p>
          </div>
          {/* <Divider orientation="center"></Divider> */}
        </div>
      </div>
    </section>
  );
}

export default feature;
