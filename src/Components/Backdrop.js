import React from "react";

const Backdrop = (props) => {
    return(
        <div className="backdrop" style={{ backgroundColor: "rgba(0, 0, 0, " + props.transpanent + ")" }} onClick={() => props.close()}>
            {props.children}
        </div>
    )
}

export default Backdrop;