import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, Form, Input, Modal, Upload } from "antd";
import Navbar from "../navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

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
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function addmango() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    sciname: "",
    info: "",
    type: "",
    region: "",
  });
  const {
    name,
    sciname,
    info,
    type,
    region,
    latitude,
    longitude,
    origin,
    weight,
  } = state;

  const inputValues = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };

  const submitForm = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("sciname", sciname);
      formData.append("info", info);
      formData.append("type", type);
      formData.append("region", region);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("origin", origin);
      formData.append("weight", weight);

      // fileList.forEach((fileList, index) => {
      //   formData.append(`image${index + 1}`, fileList[0].originFileObj);
      // });
      for (var i = 0; i < fileList.length; i++) {
        // Check if originFileObj exists before accessing it
        if (fileList[i].originFileObj) {
          var key = i === 0 ? "image" : "image" + i;
          formData.append(key, fileList[i].originFileObj);
        } else {
          console.error(
            "File at index " + i + " does not have originFileObj property."
          );
        }
      }

      const res = await axios.post(
        "http://localhost:3000/api/addmango",
        formData
      );
      Swal.fire({
        title: "เสร็จสิ้น!",
        text: "บันทึกข้อมูลเรียบร้อย",
        confirmButtonColor: "#5cb85c",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/admin/mango");
        }
      });
    } catch (error) {
      console.error("Error adding :", error);
      Swal.fire({
        title: "กรุณากรอกข้อมูล!!",
        text: "ท่านกรอกข้อมูลไม่ครบถ้วน",
        confirmButtonColor: "#5cb85c",
        icon: "error",
      });
    }
  };

  // const [file, setFile] = useState();

  // const handleFile = (e) => {
  //   setFile(e.target.files[0]);
  // };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState();

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleUploadChange = (info, e) => {
    let fileList = [...info.fileList];

    // Ensure only one file is uploaded
    fileList = fileList.slice(-3);

    // Manually set the status of uploading file to done
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(fileList);
  };

  console.log(fileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const province = [
    {
      value: "กรุงเทพมหานคร",
      label: "กรุงเทพมหานคร",
    },
    {
      value: "กระบี่",
      label: "กระบี่",
    },
    {
      value: "กาญจนบุรี",
      label: "กาญจนบุรี",
    },
    {
      value: "กาฬสินธุ์",
      label: "กาฬสินธุ์",
    },
    {
      value: "กำแพงเพชร",
      label: "กำแพงเพชร",
    },
    {
      value: "ขอนแก่น",
      label: "ขอนแก่น",
    },
    {
      value: "จันทบุรี",
      label: "จันทบุรี",
    },
    {
      value: "ฉะเชิงเทรา",
      label: "ฉะเชิงเทรา",
    },
    {
      value: "ชลบุรี",
      label: "ชลบุรี",
    },
    {
      value: "ชัยนาท",
      label: "ชัยนาท",
    },
    {
      value: "ชัยภูมิ",
      label: "ชัยภูมิ",
    },
    {
      value: "ชุมพร",
      label: "ชุมพร",
    },
    {
      value: "เชียงราย",
      label: "เชียงราย",
    },
    {
      value: "เชียงใหม่",
      label: "เชียงใหม่",
    },
    {
      value: "ตรัง",
      label: "ตรัง",
    },
    {
      value: "ตราด",
      label: "ตราด",
    },
    {
      value: "ตาก",
      label: "ตาก",
    },
    {
      value: "นครนายก",
      label: "นครนายก",
    },
    {
      value: "นครปฐม",
      label: "นครปฐม",
    },
    {
      value: "นครพนม",
      label: "นครพนม",
    },
    {
      value: "นครราชสีมา",
      label: "นครราชสีมา",
    },
    {
      value: "นครศรีธรรมราช",
      label: "นครศรีธรรมราช",
    },
    {
      value: "นครสวรรค์",
      label: "นครสวรรค์",
    },
    {
      value: "นราธิวาส",
      label: "นราธิวาส",
    },
    {
      value: "น่าน",
      label: "น่าน",
    },
    {
      value: "นนทบุรี",
      label: "นนทบุรี",
    },
    {
      value: "บึงกาฬ",
      label: "บึงกาฬ",
    },
    {
      value: "บุรีรัมย์",
      label: "บุรีรัมย์",
    },
    {
      value: "ปทุมธานี",
      label: "ปทุมธานี",
    },
    {
      value: "ประจวบคีรีขันธ์",
      label: "ประจวบคีรีขันธ์",
    },
    {
      value: "ปราจีนบุรี",
      label: "ปราจีนบุรี",
    },
    {
      value: "ปัตตานี",
      label: "ปัตตานี",
    },
    {
      value: "พระนครศรีอยุธยา",
      label: "พระนครศรีอยุธยา",
    },
    {
      value: "พะเยา",
      label: "พะเยา",
    },
    {
      value: "พังงา",
      label: "พังงา",
    },
    {
      value: "พัทลุง",
      label: "พัทลุง",
    },
    {
      value: "พิจิตร",
      label: "พิจิตร",
    },
    {
      value: "พิษณุโลก",
      label: "พิษณุโลก",
    },
    {
      value: "เพชรบุรี",
      label: "เพชรบุรี",
    },
    {
      value: "เพชรบูรณ์",
      label: "เพชรบูรณ์",
    },
    {
      value: "แพร่",
      label: "แพร่",
    },
    {
      value: "ภูเก็ต",
      label: "ภูเก็ต",
    },
    {
      value: "มหาสารคาม",
      label: "มหาสารคาม",
    },
    {
      value: "มุกดาหาร",
      label: "มุกดาหาร",
    },
    {
      value: "แม่ฮ่องสอน",
      label: "แม่ฮ่องสอน",
    },
    {
      value: "ยโสธร",
      label: "ยโสธร",
    },
    {
      value: "ยะลา",
      label: "ยะลา",
    },
    {
      value: "ร้อยเอ็ด",
      label: "ร้อยเอ็ด",
    },
    {
      value: "ระนอง",
      label: "ระนอง",
    },
    {
      value: "ระยอง",
      label: "ระยอง",
    },
    {
      value: "ราชบุรี",
      label: "ราชบุรี",
    },
    {
      value: "ลพบุรี",
      label: "ลพบุรี",
    },
    {
      value: "ลำปาง",
      label: "ลำปาง",
    },
    {
      value: "ลำพูน",
      label: "ลำพูน",
    },
    {
      value: "เลย",
      label: "เลย",
    },
    {
      value: "ศรีสะเกษ",
      label: "ศรีสะเกษ",
    },
    {
      value: "สกลนคร",
      label: "สกลนคร",
    },
    {
      value: "สงขลา",
      label: "สงขลา",
    },
    {
      value: "สตูล",
      label: "สตูล",
    },
    {
      value: "สมุทรปราการ",
      label: "สมุทรปราการ",
    },
    {
      value: "สมุทรสงคราม",
      label: "สมุทรสงคราม",
    },
    {
      value: "สมุทรสาคร",
      label: "สมุทรสาคร",
    },
    {
      value: "สระแก้ว",
      label: "สระแก้ว",
    },
    {
      value: "สระบุรี",
      label: "สระบุรี",
    },
    {
      value: "สิงห์บุรี",
      label: "สิงห์บุรี",
    },
    {
      value: "สุโขทัย",
      label: "สุโขทัย",
    },
    {
      value: "สุพรรณบุรี",
      label: "สุพรรณบุรี",
    },
    {
      value: "สุราษฎร์ธานี",
      label: "สุราษฎร์ธานี",
    },
    {
      value: "สุรินทร์",
      label: "สุรินทร์",
    },
    {
      value: "หนองคาย",
      label: "หนองคาย",
    },
    {
      value: "หนองบัวลำภู",
      label: "หนองบัวลำภู",
    },
    {
      value: "อ่างทอง",
      label: "อ่างทอง",
    },
    {
      value: "อำนาจเจริญ",
      label: "อำนาจเจริญ",
    },
    {
      value: "อุดรธานี",
      label: "อุดรธานี",
    },
    {
      value: "อุตรดิตถ์",
      label: "อุตรดิตถ์",
    },
    {
      value: "อุทัยธานี",
      label: "อุทัยธานี",
    },
    {
      value: "อุบลราชธานี",
      label: "อุบลราชธานี",
    },
  ];

  const showUpdateForm = () => (
    <Form
      form={form}
      name="basic"
      autoComplete="off"
      // labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      size="large"
      initialValues={{ remember: true }}
      onFinish={submitForm}
      layout="vertical"
    >
      <div className="grid grid-cols-3">
        <div className="grid col-span-1">
          <Form.Item
            label="เพิ่มรูป"
            rules={[{ required: true, message: "กรุณากรอกชื่อหัวข้อ" }]}
          >
            {/* <input type="file" name="image" onChange={handleFile} /> */}
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={handleUploadChange}
              name="image"
              maxCount={3}
              multiple={true}
              onPreview={handlePreview}
            >
              {uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>
        </div>
        <div className="grid col-span-2">
          <div className="grid grid-flow-col gap-4">
            <Form.Item
              label="ชื่อมะม่วง"
              name="name"
              rules={[{ required: true, message: "กรุณากรอกชื่อมะม่วง" }]}
            >
              <Input name="name" onChange={inputValues("name")} value={name} />
            </Form.Item>
            <Form.Item label="ชื่อทางวิทยาศาสตร์">
              <Input
                name="sciname"
                onChange={inputValues("sciname")}
                value={sciname}
              />
            </Form.Item>
          </div>
          <Form.Item
            label="รายละเอียด"
            name="info"
            rules={[{ required: true, message: "กรุณากรอกรายละเอียด!" }]}
          >
            <Input.TextArea
              rows={5}
              name="info"
              onChange={inputValues("info")}
              value={info}
            />
          </Form.Item>
          <div className="grid grid-flow-col gap-4">
            <Form.Item
              label={
                <span>
                  {" "}
                  <span className="text-[#fe0000]">*</span> กลุ่มพันธุ์
                </span>
              }
              rules={[{ required: true, message: "กรุณาเลือกกลุ่มพันธุ์!" }]}
            >
              <Select
                name="type"
                onChange={(value) => setState({ ...state, type: value })}
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
            <Form.Item
              label={
                <span>
                  {" "}
                  <span className="text-[#fe0000]">*</span> สายพันธุ์
                </span>
              }
              rules={[{ required: true, message: "กรุณาเลือกสายพันธุ์!" }]}
            >
              <Select
                name="region"
                onChange={(value) => setState({ ...state, region: value })}
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
            <Form.Item label="ละติจูด" name="latitude">
              <Input
                name="latitude"
                onChange={inputValues("latitude")}
                value={latitude}
              />
            </Form.Item>
            <Form.Item label="ลองจิจูด">
              <Input
                name="longitude"
                onChange={inputValues("longitude")}
                value={longitude}
              />
            </Form.Item>
          </div>
          <div className="grid grid-flow-col gap-4">
            <Form.Item label="แหล่งกำเนิด">
              <Select
                name="origin"
                onChange={(value) => setState({ ...state, origin: value })}
                options={province}
              />
            </Form.Item>
            <Form.Item label="น้ำหนัก (กรัม)">
              <Input
                name="weight"
                onChange={inputValues("weight")}
                value={weight}
              />
            </Form.Item>
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
        </div>
      </div>
    </Form>
  );

  return (
    <div>
      <Navbar />
      <div className="md:container py-14">
        <div>
          <h1 className="flex justify-center text-2xl font-semibold pb-10">
            เพิ่มข้อมูลสายพันธุ์มะม่วง
          </h1>
          <div className="col-span-1">{showUpdateForm()}</div>
        </div>
      </div>
    </div>
  );
}

export default addmango;
