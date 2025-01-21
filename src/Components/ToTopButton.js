import React from "react";
import { useState } from "react";

const ToTopButton = () => {
    const [showBotton, setShowBotton] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 1000){
            setShowBotton(true);
        } 
        else{
            setShowBotton(false);
        }
      };
      
      window.addEventListener('scroll', toggleVisible);
    
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      };

    return(
        <>
            {showBotton && <button className="totopbutton fa-solid fa-arrow-up" onClick={scrollToTop}></button>}
        </>
    )
}

export default ToTopButton;