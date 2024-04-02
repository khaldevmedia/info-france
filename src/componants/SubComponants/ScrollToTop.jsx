import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  // Extraire `pathname` de l'objet de useLocation
  const { pathname } = useLocation();

  // Aller en haut de la page lorsque `pathname` change (scroll up)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
