import React, { useState, useEffect } from "react";
import Navbar from "../../../components/user/mango/navbar";
import Footer from "../../../components/user/LandingPage/footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";

function detail() {
  const { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getmango/${id}`)
      .then((res) => res.data)
      .then((result) => {
        console.log(result);
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, [id]);
  return (
    <section>
      <Navbar />
      <div className="md:container px-5 py-14">
        <div>
          <Breadcrumb
            className="text-md xl:text-xl font-[Prompt] font-semibold"
            separator=">"
            items={[
              {
                title: <a href="/">หน้าหลัก</a>,
              },
              {
                title: <a href="/mango">สายพันธุ์ทั้งหมด</a>,
              },
              {
                title: data.name,
              },
            ]}
          />
        </div>
        <div className="grid grid-rows-1 md:grid-cols-2 gap-4">
          <div className="flex col-span-1 lg:h-80 xl:h-[500px] justify-center m-8 rounded-lg overflow-hidden lg:aspect-none">
            <img
              src={`http://localhost:3000` + data.image}
              alt={data.name}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="col-span-1 m-8">
            <p className="text-xl font-bold">ชื่อ: {data.name}</p>
            <br />
            <div className="flex gap-4 text-lg">
              <p className="font-bold">ชื่อวิทยาศาสตร์:</p>
              <p> {data.sciname}</p>
            </div>
            <br />
            <div className="flex gap-4 text-lg">
              <p className="font-bold">กลุ่มพันธุ์:</p>
              <p>{data.type}</p>
            </div>
            <br />
            <div className="grid gap-4 text-lg">
              <p className="font-bold">รายละเอียด:</p>
              <p>{data.info}</p>
            </div>
            <br />
            <div className="grid gap-4 text-lg">
              <p className="font-bold">แหล่งกำเนิด:</p>
              <p>{data.origin}</p>
            </div>
            <br />
            <div className="grid gap-4 text-lg">
              <p className="font-bold">น้ำหนัก:</p>
              <p>{data.weight === 0 ? <p> - </p> : <p>{data.weight}</p>}</p>
            </div>
            <div className="mt-5 space-y-4">
              <button className="bg-[#2d3748] text-white rounded-md py-1 mt-2 hover:bg-[#4a5568] transition duration-300">
                <a href="/mango" className="px-5 hover:text-white">
                  ดูข้อมูลมะม่วงอื่นๆ
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default detail;
