import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
import { Collapse, Divider } from "antd";

const fileTypes = ["JPG", "PNG"];

function info() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  return (
    <section>
      <div className="md:container px-5 py-14 md:py-20 flex flex-col md:flex-row items-center">
        <div className="flex justify-center w-full h-[550px]">
          <img
            src="/src/assets/up.png"
            alt=""
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
export default info;
