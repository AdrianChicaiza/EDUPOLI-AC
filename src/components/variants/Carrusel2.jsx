import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CardCarrera } from "./CardCarrera";

export const Carrusel2 = ({ semestre }) => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className="rounded-[3px] mt-1 w-full bg-[#CAEAFF]"
      containerClass="container"
      dotListClass=""
      draggable={false}
      focusOnSelect={false}
      infinite={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 4,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
        desktopr: {
          breakpoint: {
            max: 763,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
        desktomin: {
          breakpoint: {
            max: 565,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {semestre.map((e, i) => (
        <div key={i}>
          <CardCarrera semestre={e} />
        </div>
      ))}
    </Carousel>
  );
};
