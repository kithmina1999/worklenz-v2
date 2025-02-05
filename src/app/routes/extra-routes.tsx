import LicenseExpired from "@/pages/license-expired/license-expired";
import Unauthorized from "@/pages/unauthorized/unauthorized";

import { RouteObject } from "react-router-dom"; 

const extraRoutes: RouteObject[] = [
  { path: 'license-expired', element: <LicenseExpired /> },
  { path: 'unauthorized', element: <Unauthorized /> },
];

export default extraRoutes;
