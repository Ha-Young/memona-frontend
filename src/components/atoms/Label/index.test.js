import { shallow } from "enzyme";
import React from "react";

import Label from ".";

const wrap = (props = {}) => shallow(<Label {...props} />);

it("renders children when passed in", () => {
  const wrapper = wrap({ children: "test" });
  expect(wrapper.contains("test")).toBe(true);
});

it("renders props when passed in", () => {
  const wrapper = wrap({ htmlFor: "foo" });
  expect(wrapper.find({ htmlFor: "foo" })).toHaveLength(1);
});
