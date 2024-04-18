import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Comment = () => {
  const comments = [
    {
      id: 1,
      text: "“ดีมากเลย,ลองใช้เเล้ว มันว้าวมาก.”",
      author: "ลุงชัยสวนมะม่วง",
    },
    {
      id: 2,
      text: "Awesome content!",
      author: "Jane Smith",
    },
    {
      id: 3,
      text: "I learned a lot from this!",
      author: "Mike Johnson",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section>
      <div className=" md:container px-5 py-14 md:py-20">
        <div className="grid grid-rows-1 gap-2 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="py-5">
              <span className="flex justify-center text-lg font-semibold">
                รีวิว
              </span>
              <h1 className="relative md:pl-60 text-2xl md:text-3xl font-semibold">
                ผู้คนพูดถึงเราอย่างไรบ้าง
              </h1>
            </div>
            <div className="hidden md:flex absolute items-center z-[0] md:w-[20%] md:h-[20%] bg-gradient-to-t from-[#016A70] to-[#214d76] blur-[123px]" />
          </div>
          <div className="flex justify-center items-center">
            <Swiper
              direction={"vertical"}
              pagination={{ clickable: true }}
              loop={true}
              spaceBetween={40}
              slidesPerView={1.7}
              onSlideChange={(e) => {
                setActiveIndex(e.realIndex);
              }}
              modules={[Pagination]}
              className="md:h-80 h-[18rem] max-w-3xl"
            >
              {comments.map((comment, i) => (
                <SwiperSlide key={i}>
                  <div
                    className={` duration-500 bg-bg_light_primary mx-8 border-2 
              p-8 h-full rounded-2xl flex  justify-center items-center gap-6
               border-slate-200 md:flex-row flex-col
                ${activeIndex !== i && "scale-75 blur-sm"}`}
                  >
                    <div>
                      <h1 className="text-xl text-center">{comment.text}</h1>
                      <p className="text-center font-semibold">
                        {comment.author}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comment;
