import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";

import theme from "../components/themes";
import { viewType as viewTypeConstant } from "../constants";
import { viewModeVar } from "../store";

export default function useViewMode() {
  const viewMode = useReactiveVar(viewModeVar);

  useEffect(() => {
    function handleResize() {
      const width = document.body.clientWidth;
      const viewType =
        width <= theme.sizes.maxWidth
          ? viewTypeConstant.MOBILE
          : viewTypeConstant.PC;

      viewModeVar({
        width,
        viewType,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewMode;
}
