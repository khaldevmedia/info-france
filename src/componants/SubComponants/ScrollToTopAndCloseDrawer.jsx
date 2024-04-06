import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../main/AppContext";

function ScrollToTopAndCloseDrawer() {
  // Extraire `pathname` de l'objet de useLocation
  const { pathname } = useLocation();
  const { setMobileOpen } = useContext(AppContext);

  // Aller en haut de la page lorsque `pathname` change (scroll up)
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTopAndCloseDrawer;
