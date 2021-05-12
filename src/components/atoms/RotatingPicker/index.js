import "./index.css";

import { useEmblaCarousel } from "embla-carousel/react";
import { setupWheelGestures } from "embla-carousel-wheel-gestures";
import React, { useCallback, useEffect, useState } from "react";

import { getSlidesCss, WHEEL_ITEM_RADIUS } from "./wheelUtils";

const RotatingPicker = ({ label, perspective, loop, slides }) => {
  const [isArray, slideCount] = Array.isArray(slides)
    ? [true, slides.length]
    : [false, slides];

  const [viewportRef, embla] = useEmblaCarousel({
    loop,
    axis: "y",
    dragFree: true,
    draggableClass: "",
    draggingClass: "",
    selectedClass: "",
  });

  const [wheelReady, setWheelReady] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const totalRadius = slideCount * WHEEL_ITEM_RADIUS;
  const rotationOffset = loop ? 0 : WHEEL_ITEM_RADIUS;
  const slideStyles = getSlidesCss(
    embla,
    loop,
    slideCount,
    totalRadius,
    wheelRotation
  );

  useEffect(() => embla && setupWheelGestures(embla), [embla]);

  const rotateWheel = useCallback(() => {
    if (!embla) return;
    const rotation = slideCount * WHEEL_ITEM_RADIUS - rotationOffset;
    setWheelRotation(rotation * embla.scrollProgress());
  }, [setWheelRotation, slideCount, rotationOffset, embla]);

  useEffect(() => {
    if (!embla) return;

    embla.dangerouslyGetEngine().translate.toggleActive(false);
    setWheelReady(true);

    embla.on("pointerUp", () => {
      const { scrollTo, target, location } = embla.dangerouslyGetEngine();
      scrollTo.distance((target.get() - location.get()) * 0.1, true);
    });

    embla.on("scroll", rotateWheel);
    rotateWheel();
  }, [embla, rotateWheel, setWheelReady]);

  return (
    <>
      <div className="embla__wheels__shadow embla__wheels__shadow--start" />
      <div className="embla__wheels__shadow embla__wheels__shadow--end" />
      <div className={`embla__wheel embla__wheel--perspective-${perspective}`}>
        <div className="embla__wheel__scene">
          <div className="embla__wheel__viewport" ref={viewportRef}>
            <div className="embla__wheel__container">
              {slideStyles.map((slideStyle, index) => (
                <div
                  key={index}
                  className="embla__wheel__slide"
                  style={
                    wheelReady
                      ? slideStyle
                      : { transform: "none", position: "static" }
                  }
                >
                  {isArray ? slides[index] : index}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="embla__wheel__label">{label}</div>
      </div>
    </>
  );
};

export default RotatingPicker;
