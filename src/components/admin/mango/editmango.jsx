import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Form, Input } from "antd";
import Navbar from "../navbar";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const formItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 4,
    },
    md: {
      span: 8,
      offset: 8,
    },
  },
};

function editmango() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getmango/${id}`)
      .then((res) => res.data)
      .then((result) => {
        console.log(result);
        setData(result.data);
        if (result.status === "ok") {
          form.setFieldsValue({
            name: result.data.name,
            sciname: result.data.sciname,
            info: result.data.info,
            type: result.data.type,
            region: result.data.region,
            latitude: result.data.latitude,
            longitude: result.data.longitude,
            origin: result.data.origin,
            weight: result.data.weight,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, [form, id]);

  const handleSubmit = (values) => {
    // values contain the form field values
    console.log("Form submitted with values:", values);
    axios
      .put(`http://localhost:3000/api/updatmango/${id}`, values)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "บันทึกสำเร็จ",
            confirmButtonColor: "#5cb85c",
            text: "บทความถูกอัพเดทแล้ว",
          }).then(() => {
            // Redirect or navigate to another page after successful submission
            navigate("/admin/mango");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "มีบางอย่างผิดพลาด โปรดลองอีกครั้ง",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating plant:", error);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "มีบางอย่างผิดพลาด โปรดลองอีกครั้ง",
        });
      });
  };

  const uploadImage = (e) => {
    const formData = new FormData();
    formData.append("image", file);
    axios
      .put(`http://localhost:3000/api/uploadmango/${id}`, formData)

      .catch((error) => {
        console.error("Error updating plant:", error);
        Swal.fire({
          icon: "error",
          title: error,
          text: "มีบางอย่างผิดพลาด โปรดลองอีกครั้ง",
        });
      });
  };

  const [file, setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDualSubmit = (e) => {
    handleSubmit(e);
    uploadImage(e);
  };

  const showUpdateForm = () => (
    <Form
      form={form}
      name="basic"
      autoComplete="off"
      // labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      size="large"
      initialValues={{ remember: true }}
      onFinish={handleDualSubmit}
      layout="vertical"
    >
      <div className="grid grid-flow-col gap-4">
        <Form.Item
          label="ชื่อมะม่วง"
          name="name"
          rules={[{ required: true, message: "กรุณากรอกชื่อมะม่วง" }]}
        >
          <Input name="name" />
        </Form.Item>
        <Form.Item label="ชื่อทางวิทยาศาสตร์" name="sciname">
          <Input name="sciname" />
        </Form.Item>
      </div>
      <Form.Item
        label="รายละเอียด"
        name="info"
        rules={[{ required: true, message: "กรุณากรอกรายละเอียด!" }]}
      >
        <Input.TextArea rows={5} name="info" />
      </Form.Item>
      <div className="grid grid-flow-col gap-4">
        <Form.Item label="กลุ่มพันธุ์" name="type">
          <Select
            name="type"
            options={[
              {
                value: "กลุ่มแก้ว",
                label: "กลุ่มแก้ว",
              },
              {
                value: "กลุ่มเขียวเสวย",
                label: "กลุ่มเขียวเสวย",
              },
              {
                value: "กลุ่มน้ําดอกไม้",
                label: "กลุ่มน้ําดอกไม้",
              },
              {
                value: "กลุ่มหนังกลางวัน",
                label: "กลุ่มหนังกลางวัน",
              },
              {
                value: "กลุ่มอกร่อง",
                label: "กลุ่มอกร่อง",
              },
              {
                value: "กลุ่มพราหมณ์",
                label: "กลุ่มพราหมณ์",
              },
              {
                value: "กลุ่มผลกลม",
                label: "กลุ่มผลกลม",
              },
              {
                value: "เบ็ดเตล็ด",
                label: "เบ็ดเตล็ด",
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="สายพันธุ์" name="region">
          <Select
            name="region"
            options={[
              {
                value: "ไทย",
                label: "ไทย",
              },
              {
                value: "ต่างประเทศ",
                label: "ต่างประเทศ",
              },
            ]}
          />
        </Form.Item>
      </div>
      <div className="grid grid-flow-col gap-4">
        <Form.Item
          label="ละติจูด"
          name="latitude"
          rules={[{ required: true, message: "กรุณากรอกชื่อมะม่วง" }]}
        >
          <Input name="latitude" />
        </Form.Item>
        <Form.Item label="ลองจิจูด" name="longitude">
          <Input name="longitude" />
        </Form.Item>
      </div>
      <div className="grid grid-flow-col gap-4">
        <Form.Item label="แหล่งกำเนิด" name="origin">
          <Input name="origin" />
        </Form.Item>
        {data.weight !== 0 ? (
          <Form.Item label="น้ำหนัก (กรัม)" name="weight">
            <Input name="weight" />
          </Form.Item>
        ) : (
          <Form.Item label="น้ำหนัก (กรัม)">
            <Input name="weight" defaultValue={"-"} />
          </Form.Item>
        )}
      </div>
      <Form.Item {...formItemLayout}>
        <div className="flex justify-center">
          <button
            className="bg-[#016A70] text-white rounded-md py-1 mx-4 px-5 mt-2 hover:bg-[#0f858b] transition duration-300"
            type="submit"
          >
            บันทึก
          </button>
          <button className="bg-[#DD3333] text-white rounded-md py-1 mx-4 mt-2 hover:bg-[#ff5a5a] transition duration-300">
            <a
              href="/admin/mango"
              className="py-1 px-5 no-underline hover:no-underline hover:text-white"
            >
              ยกเลิก
            </a>
          </button>
        </div>
      </Form.Item>
    </Form>
  );

  return (
    <div>
      <Navbar />
      <div className="md:container py-14">
        <h1 className="flex justify-center text-2xl font-semibold pb-10">
          แก้ไขข้อมูลสายพันธุ์มะม่วง
        </h1>
        <div className="grid grid-cols-3">
          <div className="items-center py-5">
            <div className="flex justify-center items-center text-center gap-4 pt-5">
              <img
                alt={data.title}
                className="w-80 h-80 object-cover rounded-lg shadow-lg"
                src={`http://localhost:3000` + data.image}
                style={{
                  aspectRatio: "800/800",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="flex justify-center items-center py-5">
              <form action="" onSubmit={uploadImage}>
                <input type="file" name="image" onChange={handleFile} />
              </form>
            </div>
          </div>
          <div className="col-span-2">{showUpdateForm()}</div>
        </div>
      </div>
    </div>
  );
}

export default editmango;
