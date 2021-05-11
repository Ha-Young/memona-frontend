import { mount, shallow } from "enzyme";
import React from "react";

import PageTemplate from ".";

const wrap = (props = {}) =>
  shallow(
    <PageTemplate header="header" footer="footer" {...props}>
      test
    </PageTemplate>
  );

it("mounts", () => {
  mount(
    <PageTemplate header="header" footer="footer">
      test
    </PageTemplate>
  );
});

it("renders children when passed in", () => {
  const wrapper = wrap();
  expect(wrapper.contains("test")).toBe(true);
});

it("renders header", () => {
  const wrapper = wrap();
  expect(wrapper.contains("header")).toBe(true);
});

it("renders footer", () => {
  const wrapper = wrap();
  expect(wrapper.contains("footer")).toBe(true);
});
