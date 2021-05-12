import { shallow } from "enzyme";
import React from "react";

import SeasonPicker from ".";

const wrap = (props = {}) => shallow(<SeasonPicker {...props} />);

it("renders props when passed in", () => {
  const wrapper = wrap({ id: "foo" });
  expect(wrapper.find({ id: "foo" })).toHaveLength(1);
});
