import { shallow } from "enzyme";
import React from "react";

import MobileHeader from ".";

const wrap = (props = {}) => shallow(<MobileHeader {...props} />).dive();

it("renders props when passed in", () => {
  const wrapper = wrap({ id: "foo" });
  expect(wrapper.find({ id: "foo" })).toHaveLength(1);
});
