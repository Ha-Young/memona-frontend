import { shallow } from "enzyme";
import React from "react";

import Avatar from ".";

const wrap = (props = {}) => shallow(<Avatar {...props} />);

it("renders props when passed in", () => {
  const wrapper = wrap({ id: "foo" });
  expect(wrapper.find({ id: "foo" })).toHaveLength(1);
});
