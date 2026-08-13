import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Every page change starts at the top instead of keeping the previous scroll position.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
