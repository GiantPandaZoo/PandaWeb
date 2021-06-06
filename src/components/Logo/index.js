import './index.scss';
import React from "react";
import {Link} from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/" className="logo_link"></Link>
    );
};

export default Logo;
