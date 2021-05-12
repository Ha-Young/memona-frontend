import "./index.css";

import { useEmblaCarousel } from "embla-carousel/react";
import { setupWheelGestures } from "embla-carousel-wheel-gestures";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { prop } from "styled-tools";

import { getSlidesCss, WHEEL_ITEM_RADIUS } from "./wheelUtils";

const SlideValues = styled.div`
  position: absolute;
  top: 0 !important;
  left: 0 !important;
  width: 100%;
  height: 100%;
  font-size: ${prop("fontSize", "18px")};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  opacity: 0;
`;

const SlideLabel = styled.div`
  font-weight: bold;
  pointer-events: none;
  font-size: ${prop("fontSize", "18px")};
`;

const RotatingPicker = ({
  label,
  perspective,
  loop,
  slides,
  valueRef,
  fontSize,
}) => {
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

    const currentIndex = Math.round(embla.scrollProgress() * slideCount);

    if (valueRef) {
      valueRef.current = isArray ? slides[currentIndex] : currentIndex;
    }
  }, [embla, slideCount, rotationOffset, valueRef, isArray, slides]);

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
      <div className={`embla__wheel embla__wheel--perspective-${perspective}`}>
        <div className="embla__wheel__scene">
          <div className="embla__wheel__viewport" ref={viewportRef}>
            <div className="embla__wheel__container">
              {slideStyles.map((slideStyle, index) => (
                <SlideValues
                  key={index}
                  style={
                    wheelReady
                      ? slideStyle
                      : { transform: "none", position: "static" }
                  }
                  fontSize={fontSize}
                >
                  {isArray ? slides[index] : index}
                </SlideValues>
              ))}
            </div>
          </div>
        </div>
        <SlideLabel className="embla__wheel__label" fontSize={fontSize}>
          {label}
        </SlideLabel>
      </div>
    </>
  );
};

export default RotatingPicker;
