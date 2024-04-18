import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Input, Space } from "antd";
const Column = Table;
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

function main() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMangoData, setFilteredMangoData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getmango");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const searchdata = data.filter((mango) =>
      mango.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMangoData(searchdata);
  }, [searchQuery, data]);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const deleteMango = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/deletemango/${id}`
      );
      console.log("Response:", res.data);
      Swal.fire({
        title: "ลบแล้ว!",
        text: "ข้อมูลของคุณถูกลบแล้ว",
        confirmButtonColor: "#5cb85c",
        icon: "success",
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting :", error);
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "คุณต้องการลบหรือไม่?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5cb85c",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMango(id);
      }
    });
  };

  return (
    <div className="bg-[#F5F6FA] h-screen">
      <div className="md:container px-5 py-10">
        <Space direction="vertical" className="w-full">
          <div className="flex justify-end">
            <button className=" bg-[#016A70] text-white rounded-md py-1 mt-2 hover:bg-[#0f858b] transition duration-300">
              <a href="/admin/mango/add" className="px-5 hover:text-white">
                เพิ่มมะม่วง
              </a>
            </button>
          </div>
          <Table
            dataSource={filteredMangoData}
            bordered
            size="middle"
            pagination={{ position: ["bottomCenter"] }}
            rowKey="id"
            scroll={{
              x: 1000,
            }}
            title={() => {
              return (
                <div className="flex gap-2 items-center font-[Prompt]">
                  <div className="relative">
                    <Input
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="ค้นหา"
                      value={searchQuery}
                      className="rounded-2xl w-60 h-9 p-4 pr-10 focus:outline-none font-[Prompt]"
                    />
                    <SearchOutlined className="absolute right-4 top-1/2 ransform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              );
            }}
            className="shadow-md"
          >
            <Column
              title="รูป"
              className="font-[Prompt]"
              key="image"
              dataIndex="image"
              render={(_, record) => (
                <a
                  className="flex justify-center"
                  href={`/mango/detail/${record.id}`}
                >
                  <img
                    src={`http://localhost:3000${record.image}`}
                    alt={record.name}
                    className="h-8 w-8 object-contain object-center lg:h-16 lg:w-16"
                  />
                </a>
              )}
              width="200px"
              align="center"
            />
            <Column
              title="ชื่อ"
              key="image"
              className="font-[Prompt]"
              dataIndex="name"
              render={(_, record) => (
                <h1 className="flex justify-center text-lg">{record.name}</h1>
              )}
              width="350px"
              align="center"
            />
            <Column
              title="ชื่อวิทยาศาสตร์"
              key="sciname"
              className="font-[Prompt]"
              dataIndex="sciname"
              render={(_, record) => (
                <h1 className="flex justify-center text-lg italic">
                  {record.sciname}
                </h1>
              )}
              width="350px"
              align="center"
            />
            <Column
              title="จัดการ"
              key="id"
              className="font-[Prompt]"
              width="200px"
              align="center"
              render={(text, record) => (
                <Space size="small" className="font-[Prompt]">
                  <Link
                    className="bg-[#2d3748] text-white rounded-md py-1 px-4 hover:text-white hover:bg-[#4a5568] transition duration-300"
                    to={`/admin/mango/edit/${record.id}`}
                  >
                    <EditOutlined />
                    <span className="px-1">แก้ไข</span>
                  </Link>
                  <button
                    className="bg-[#DD3333] text-white rounded-md py-1 px-4 hover:bg-[#ff5a5a] transition duration-300"
                    onClick={() => confirmDelete(record.id)}
                  >
                    <DeleteOutlined />
                    <span className="px-1">ลบ</span>
                  </button>
                </Space>
              )}
            />
          </Table>
        </Space>
      </div>
    </div>
  );
}

export default main;
