import React, { useState, useEffect } from "react";
import { Carousel, Card, Col, Row, Typography, Modal, Button } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const { Title } = Typography;
import axios from "axios";

const imageSize = {
  width: "250px",
  height: "250px",
  objectFit: "contain",
};

const cardstyle = {
  boxShadow: "0 6px 6px 0 rgba(0, 0, 0, 0.1), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
  width: "350px",
  margin: "0 auto",
  height: "350px",
};

function mango() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getmango")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderCards = () => {
    return data.map((item, index) => (
      <div
        key={index}
        onClick={() => handleCardClick(index)}
        className="min-w-[14rem] min-h-[23rem] duration-300 cursor-pointer border-2 hover:shadow-xl border-slate-200 rounded-xl text-center p-4 flex-1"
      >
        <img
          alt="example"
          src={`http://localhost:3000` + item.image}
          style={imageSize}
          className="flex mx-auto items-center py-2"
        />
        <h6 className="mx-auto py-4 font-prompt text-2xl font-semibold">
          {item.name} ({item.engname})
        </h6>
      </div>
    ));
  };

  const handleCardClick = (index) => {
    setSelectedCard(index);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedCard(null);
  };

  const slides = [];
  for (let i = 0; i < data.length; i += 3) {
    slides.push(
      <div key={i}>
        <div className="flex gap-5 justify-between flex-wrap group text-center items-center">
          {renderCards().slice(i, i + 3)}
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="md:container px-5 py-14 md:py-20">
        <h1 className="flex justify-center text-3xl font-semibold pb-20">
          สกุลของมะม่วงที่น่าสนใจ
        </h1>
        <Carousel autoplay dots={false}>
          {slides}
        </Carousel>
        <Modal
          title={data[selectedCard]?.name}
          open={modalVisible}
          onCancel={handleModalClose}
          footer={null}
          centered
          width={800}
          style={{ fontFamily: "Prompt" }}
        >
          {data[selectedCard] && (
            <div>
              <img
                src={`http://localhost:3000` + data[selectedCard].image}
                alt={data[selectedCard].name}
                className="flex w-1/3 mx-auto"
              />
              <p className="flex mx-auto justify-center text-xl">
                {data[selectedCard].info}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}

export default mango;
