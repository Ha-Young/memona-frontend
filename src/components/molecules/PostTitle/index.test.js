import { shallow } from "enzyme";
import React from "react";

import PostTitle from ".";

const wrap = (props = {}) => shallow(<PostTitle {...props} />);

it("renders props when passed in", () => {
  const wrapper = wrap({ id: "foo" });
  expect(wrapper.find({ id: "foo" })).toHaveLength(1);
});
