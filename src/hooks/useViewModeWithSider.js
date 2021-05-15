import { useEffect, useState } from "react";

import Theme from "../../src/components/themes";
import calcAddPixel from "../utils/calcAddPixel";
import useViewMode from "./useViewMode";

function useViewModeWithSider() {
  const viewMode = useViewMode();
  const [siderLeftPos, setSiderLeftPos] = useState();

  function setSiderPosition(clientWidth) {
    const siderleftPos =
      calcAddPixel(
        clientWidth,
        Theme.sizes.postListWidth,
        `-${Theme.sizes.friendsListWidth}`
      ) / 2;
    setSiderLeftPos(siderleftPos);
  }

  useEffect(() => {
    setSiderPosition(viewMode.width);
  }, [viewMode]);

  return { siderLeftPos, viewMode };
}

export default useViewModeWithSider;
