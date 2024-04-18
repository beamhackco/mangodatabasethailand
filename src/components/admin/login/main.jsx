import React from "react";
import { Card } from "antd";
import Logo from "../../../assets/Logo3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  authenicate,
  getUser,
  onRemembered,
} from "../../../services/authorize";

function main() {
  const navigate = useNavigate();
  const [remembered, setRemembered] = useState(false);

  const toggleRemember = () => {
    setRemembered(!remembered);
  };

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { email, password } = state;
  const inputValues = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/login", { email, password })
      .then((res) => {
        if (res.status === 200) {
          if (remembered) {
            onRemembered(res, () => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "เข้าสู่ระบบสำเร็จ",
                timer: 1000,
              }).then(() => {
                navigate("/dashboard");
              });
            });
          } else {
            authenicate(res, () => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "เข้าสู่ระบบสำเร็จ",
                timer: 1000,
              }).then(() => {
                navigate("/dashboard");
              });
            });
          }
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
          icon: "error",
          confirmButtonText: "ยืนยัน",
        });
      });
  };

  useEffect(() => {
    getUser() && navigate("/dashboard");
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <Card
          title="Admin System"
          className="shadow-md w-[400px] mt-10 font-[Prompt]"
        >
          <form action="" onSubmit={handleSubmit} autoComplete="off">
            <div className="flex justify-center items-center py-5">
              <img src={Logo} alt="" className="h-48" />
            </div>
            <div>
              <p className="text-lg text-center">
                กรุณากรอกอีเมลและรหัสผ่านเพื่อเข้าระบบ
              </p>
            </div>
            <div className="py-2">
              <label htmlFor="email">อีเมล</label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={inputValues("email")}
                className="w-full border border-gray-300 rounded-md px-2 py-1 mt-2 focus:outline-none"
              />
            </div>
            <div className="py-2">
              <label htmlFor="username">รหัสผ่าน</label>
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={inputValues("password")}
                className="w-full border border-gray-300 rounded-md px-2 py-1 mt-2 focus:outline-none"
              />
            </div>
            <div className="flex items-center py-2">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="h-4 w-4"
                onClick={toggleRemember}
              />
              <label htmlFor="remember" className="ml-2">
                จำฉันให้หน่อยนะ
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#2d3748] text-white rounded-md py-1 mt-2 hover:bg-[#4a5568] transition duration-300"
              >
                ล็อกอิน
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default main;
