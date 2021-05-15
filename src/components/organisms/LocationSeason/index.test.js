import { shallow } from "enzyme";
import React from "react";

import LocationSeason from ".";

const wrap = (props = {}) => shallow(<LocationSeason {...props} />).dive();

it("renders props when passed in", () => {
  const wrapper = wrap({ id: "foo" });
  expect(wrapper.find({ id: "foo" })).toHaveLength(1);
});
