import { useLocation } from "react-router-dom";
import { LocationDetail, placeKeyFromPath } from "@/pages/LocationDetail";
import { NotFound } from "@/pages/NotFound";

/**
 * Resolves `/starlink-installation-{place}` before the generic NotFound route.
 * Avoids `/locations/{place}` duplicates.
 */
export function LocationOrNotFound() {
  const { pathname } = useLocation();
  if (placeKeyFromPath(pathname)) {
    return <LocationDetail />;
  }
  return <NotFound />;
}
