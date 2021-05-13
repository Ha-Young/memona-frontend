import { useReactiveVar } from "@apollo/client";

import { isMobileVar } from "../store";
import checkMobileDevice from "../utils/checkMobileDevice";

const useMobileDeviceCheck = () => {
  const isMobile = useReactiveVar(isMobileVar);

  if (isMobile !== null) {
    const _isMobile = checkMobileDevice();
    isMobileVar(_isMobile);
    return _isMobile;
  }

  return isMobile;
};

export default useMobileDeviceCheck;
