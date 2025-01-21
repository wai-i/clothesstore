import React, { useState } from "react";
import Gallery from "../Components/Gallery";
import Showcase from "../Components/Showcase";
import ToTopButton from "../Components/ToTopButton";

const Home = () => { 
    return(
        <>
        <Gallery />
        <Showcase />
        <ToTopButton />
        </>
    )
}

export default Home;