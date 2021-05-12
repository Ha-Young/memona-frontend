import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";

import theme from "../components/themes";
import config from "../config";
import { viewType as viewTypeConstant } from "../constants";
import { viewModeVar } from "../store";
import throttleOnRendering from "../utils/throttleOnRendering";

function useViewMode() {
  const viewMode = useReactiveVar(viewModeVar);

  useEffect(() => {
    const handleResize = throttleOnRendering(() => {
      const width = document.body.clientWidth;
      const viewType =
        width <= theme.sizes.maxWidth
          ? viewTypeConstant.MOBILE
          : viewTypeConstant.PC;

      viewModeVar({
        width,
        viewType,
      });
    }, config.resizeThrottleWaitTime);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewMode;
}

export default useViewMode;
