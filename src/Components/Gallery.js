 import React, { useEffect, useReducer, useRef } from "react";
import banner1 from "../img/banner/banner1.jpg";
import banner2 from "../img/banner/banner2.jpg";
import banner3 from "../img/banner/banner3.jpg";
import banner4 from "../img/banner/banner4.jpg";

 const initialState = {count: 0};

 const reducer = (state,action) => {
    switch (action.type) {
        case "increment":
            return {count: state.count + 1};
        case "decrement":
            return {count: state.count - 1};
        case "reset":
            return {count: state.count = 0};
        case "set":
            return {count: action.value};
        default:
            return {count: state.count};
    }
 }

const Gallery = () => {
    const [indexOfCurrentImg, dispatch] = useReducer(reducer, initialState);
    const isFirstRender = useRef(true);
    const imgUrlLength = useRef(0);

    const imgUrl = [
        banner1,
        banner2,
        banner3,
        banner4
    ]
    imgUrlLength.current = imgUrl.length;
    let ulStyle = {transform: `translateX(-${indexOfCurrentImg.count*(1/imgUrl.length)*100}%`, width: `${imgUrl.length*100}%`};
    const imgList = imgUrl.map( (x, index)=> {
        return (
            <li key={index} className="gallery_li">
                <img src={x} className="gallery_img" alt="" />
            </li>
        )
    })
    
    useEffect(() => {
        if (isFirstRender.current){
            setInterval(()=>{
                //console.log("indexOfCurrentImgInside: " + indexOfCurrentImg);
                dispatch({type : "increment"});
            }, 5000)     
        }
        isFirstRender.current = false;
    },[])
    
    useEffect(() => {
        if(indexOfCurrentImg.count === imgUrlLength.current){
            dispatch({type : "reset"});
        }
    },[indexOfCurrentImg.count])

    //const dotClickHandler = (index) => {
    //    setindexOfCurrentImg(index);
    //}

    //function dotClickHandler(index){
    //    setindexOfCurrentImg(index);
    //}

    const indexDot = imgUrl.map((x, index) => {
        return(
            <button key={index} className={`gallery_index-dot ${index === indexOfCurrentImg.count && "gallery_index-dot_active"}`} 
            onClick={() => dispatch({type : "set", value: index})}>
                &nbsp;
            </button>
        )
    })

    return(
        <div className="gallery">
            <ul className="gallery_ul" style={ulStyle}>
                {imgList}
            </ul>
            <button className="gallery_left-button" onClick={() => dispatch({type : "decrement"})}>
                <span className="fa-solid fa-chevron-left"></span>
            </button>
            <button className="gallery_right-button" onClick={() => dispatch({type : "increment"})}>
                <span className="fa-solid fa-chevron-right"></span>
            </button>
            <div className="gallery_index">
                    {indexDot}
            </div>
        </div>
    );
};

export default Gallery;