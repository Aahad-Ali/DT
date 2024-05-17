import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import cancelIcon from "assets/x-circle.png";
import sliderOneImage from "assets/units-details-slider-one.png";
// import required modules
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
const UnitDetailsSliderModal = ({ onClose }) => {
  return (
    <>
      <div className="payment-modal-container ">
        <div className="payment-success-modal  position-relative slider-adjust">
          <Swiper
            loop={true}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper h-100"
          >
            <SwiperSlide>
              {" "}
              <img src={sliderOneImage} className="img-fluid" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img src={sliderOneImage} className="img-fluid" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img src={sliderOneImage} className="img-fluid" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img src={sliderOneImage} className="img-fluid" alt="" />
            </SwiperSlide>
          </Swiper>
          <div onClick={onClose} className="cancel-modal-icon cursor">
            <img src={cancelIcon} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UnitDetailsSliderModal;
