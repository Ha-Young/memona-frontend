import { shallow } from "enzyme";
import React from "react";

import PostContent from ".";

const wrap = (props = {}) => shallow(<PostContent {...props} />);

it("renders props when passed in", () => {
  const wrapper = wrap({ id: "foo" });
  expect(wrapper.find({ id: "foo" })).toHaveLength(1);
});
