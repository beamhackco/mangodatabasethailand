import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Statistic } from "antd";
import CountUp from "react-countup";
// import { Column, Line } from "@ant-design/plots";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function main() {
  const [data, setData] = useState([]);
  const [dataNews, setDataNews] = useState([]);
  const [dataMango, setDataMango] = useState([]);
  const [userAdmin, setUserAdmin] = useState([]);
  const [mangoName, setMangoName] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getplant")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getnews")
      .then((res) => {
        setDataNews(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getmango")
      .then((res) => {
        setDataMango(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getuser")
      .then((res) => {
        setUserAdmin(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getmangoname")
      .then((res) => {
        setMangoName(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const formatter = (value) => (
    <CountUp end={value} duration={2} separator="," />
  );

  const processData = (data) => {
    const counts = {};
    data.forEach((mango) => {
      counts[mango.type] = (counts[mango.type] || 0) + 1;
    });
    return Object.keys(counts).map((type) => ({
      name: type,
      จำนวนมะม่วง: counts[type],
    }));
  };

  return (
    <div className="bg-[#F5F6FA] h-screen">
      <div className="md:container px-5 py-6">
        <Row gutter={[25, 24]}>
          <Col xs={12} md={6}>
            <Card bordered={false} className="cursor-pointer">
              <Statistic
                className="font-[prompt]"
                title="สายพันธุ์มะม่วงทั้งหมด"
                value={dataMango.length}
                valueStyle={{
                  fontSize: "35px",
                  fontFamily: "Prompt",
                  marginTop: "10px",
                }}
                formatter={formatter}
                suffix="สายพันธุ์"
              />
            </Card>
          </Col>
          <Col xs={24} md={24}>
            <Card bordered={false}>
              <div className="flex bg-[#eeeeee] rounded-t-xl items-center mb-4">
                <span className="py-4 px-8 font-[prompt] text-xl font-semibold">
                  จำนวนมะม่วงแต่ละสายพันธุ์
                </span>
              </div>
              {/* <Column {...config} /> */}

              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={processData(mangoName)}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  {/* <CartesianGrid stroke="#ccc" /> */}
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="จำนวนมะม่วง"
                    fill="#016A70"
                    label={{ position: "top", fontSize: 20, fill: "black" }}
                  ></Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default main;
