import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

function Main() {
  const [data, setData] = useState([]);
  const [filteredMangoData, setFilteredMangoData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery") || "";
  const selectedType = searchParams.get("type") || "";
  const selectedRegion = searchParams.get("region") || "";

  const navigate = useNavigate();
  const location = useLocation();

  const updateSearchParams = (params) => {
    const newSearchParams = new URLSearchParams(location.search);
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    }
    const newSearch = newSearchParams.toString();
    navigate(`?${newSearch}`, { replace: true });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getmango")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const searchdata = data.filter((mango) =>
      mango.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMangoData(searchdata);
  }, [searchQuery, data]);

  const handleSearch = (value) => {
    // setSearchQuery(value);
    updateSearchParams({ searchQuery: value });
  };

  useEffect(() => {
    setFilteredMangoData(data);
  }, []);

  const handleTypeChange = (type) => {
    updateSearchParams({ type });
  };

  const handleRegionChange = (region) => {
    updateSearchParams({ region });
  };

  const filterMangoes = () => {
    if (selectedType === "" && selectedRegion === "") {
      setFilteredMangoData(
        data.filter((mango) =>
          mango.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else if (selectedType === "") {
      setFilteredMangoData(
        data.filter(
          (mango) =>
            mango.region === selectedRegion &&
            mango.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else if (selectedRegion === "") {
      setFilteredMangoData(
        data.filter(
          (mango) =>
            mango.type === selectedType &&
            mango.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredMangoData(
        data.filter(
          (mango) =>
            mango.type === selectedType &&
            mango.region === selectedRegion &&
            mango.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    filterMangoes();
  }, [searchQuery, selectedType, selectedRegion, data]);

  return (
    <div>
      <div className="md:container px-5 py-14">
        <h2 className="flex justify-center text-3xl pb-4">สายพันธุ์ทั้งหมด</h2>
        <div className="bg-[#016A70] p-4 md:flex items-center mb-6 rounded-xl gap-4 shadow-lg justify-between md:justify-start">
          <div>
            <Input
              placeholder="ค้นหา"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchQuery}
              className="rounded-xl w-64 h-9 pr-10 focus:outline-none font-[Prompt]"
              suffix={
                <SearchOutlined className="absolute top-1/2 transform -translate-y-1/2 text-gray-400" />
              }
            />
          </div>
          <div className="flex text-white items-center gap-3 md:gap-1 space-y-2 md:space-y-0">
            <span className="hidden lg:flex mx-2 ">กลุ่มพันธุ์</span>
            <div>
              <Select
                defaultValue="ทั้งหมด"
                style={{ width: 130, fontFamily: "Prompt" }}
                onChange={handleTypeChange}
                value={selectedType}
              >
                <Select.Option value="">ทั้งหมด</Select.Option>
                {Array.from(new Set(data.map((mango) => mango.type))).map(
                  (type, index) => (
                    <Select.Option key={index} value={type}>
                      {type}
                    </Select.Option>
                  )
                )}
              </Select>
            </div>
            <span className="hidden lg:flex mx-2 ">สายพันธุ์</span>
            <div>
              <Select
                defaultValue="ทั้งหมด"
                style={{ width: 120, fontFamily: "Prompt" }}
                onChange={handleRegionChange}
                value={selectedRegion}
              >
                <Select.Option value="">ทั้งหมด</Select.Option>
                {Array.from(new Set(data.map((mango) => mango.region))).map(
                  (region, index) => (
                    <Select.Option key={index} value={region}>
                      {region}
                    </Select.Option>
                  )
                )}
              </Select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 mt-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 ">
          {filteredMangoData.map((data) => (
            <div
              key={data.id}
              className="bg-white border-2 border-slate-300 rounded-md shadow-lg group relative"
            >
              <div className="flex justify-center aspect-h-1 aspect-w-1 w-full h-48 lg:h-60 xl:h-64 overflow-hidden lg:aspect-none group-hover:opacity-75">
                <a href={`/mango/detail/${data.id}`}>
                  <img
                    src={`http://localhost:3000` + data.image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </a>
              </div>
              <div className="flex mx-auto justify-center">
                <h3 className="text-2xl font-bold text-gray-700 py-4">
                  <a href={`/mango/detail/${data.id}`}>{data.name}</a>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
