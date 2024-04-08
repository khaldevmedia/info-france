import React, { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";
import styled from "@emotion/styled";

const ScrollButton = styled(Fab)`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <ScrollButton
        color="primary"
        aria-label="retourner en haut de la page"
        onClick={scrollToTop}
      >
        <KeyboardArrowUp />
      </ScrollButton>
    )
  );
};

export default ScrollToTopButton;
