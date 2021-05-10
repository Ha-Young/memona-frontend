import { shallow } from "enzyme";
import React from "react";

import PrimaryNavigation from ".";

const wrap = (props = {}) => shallow(<PrimaryNavigation {...props} />);

it("renders props when passed in", () => {
  const wrapper = wrap({ id: "foo" });
  expect(wrapper.find({ id: "foo" })).toHaveLength(1);
});
