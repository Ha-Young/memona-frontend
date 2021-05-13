import { makeVar } from "@apollo/client";

import { viewType } from "./constants";

export const viewModeVar = makeVar({
  viewType,
  width: "0px",
});

// {
//   latitude,
//   longitude,
//   altitude,
// }
export const locationVar = makeVar(null);

export const isMobileVar = makeVar(null);
