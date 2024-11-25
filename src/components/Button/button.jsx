import './Button.style.css';
import React from "react";

//✅
const Button = ({ classes, children, ...props }) => {
    return (
        <button className={`btn ${classes}`} {...props}>
            {children}
        </button>
    );
};

export default Button;