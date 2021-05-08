import { shallow } from "enzyme";
import React from "react";

import Img from ".";

const wrap = (props = {}) => shallow(<Img {...props} />);

it("renders props when passed in", () => {
  const wrapper = wrap({ id: "foo" });
  expect(wrapper.find({ id: "foo" })).toHaveLength(1);
});
