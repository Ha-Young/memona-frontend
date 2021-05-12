import { makeVar } from "@apollo/client";

import { viewType } from "./constants";

export const viewMode = makeVar(viewType.PC);
