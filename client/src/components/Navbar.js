import { Fragment } from "react";

const Navbar = () => {
    return (
        <div className="nav-bar">
            <a className="active" href="#home">
                Home
            </a>
            <a href="videos">Videos</a>
        </div>
    );
};

export default Navbar;
