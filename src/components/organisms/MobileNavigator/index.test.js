import { shallow } from "enzyme";
import React from "react";

import MobileNavigator from ".";

const wrap = (props = {}) => shallow(<MobileNavigator {...props} />).dive();

it("renders props when passed in", () => {
  const wrapper = wrap({ id: "foo" });
  expect(wrapper.find({ id: "foo" })).toHaveLength(1);
});
