import React from "react";

const Img = ({ ...props }) => {
  const { alt, src } = props;

  return <img alt={alt} src={src} {...props} />;
};

export default Img;
