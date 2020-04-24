import React, { useState } from "react";
import { ReactComponent as GitStatsLogo } from '../Images/logo.svg';

function Footer() {
    let [dayStatus, setTheme] = useState(true);
    let [imageUrl, setImageUrl] = useState("img/sun.png");
    const [searchString, setSearchString] = useState("")
    let body = document.querySelector("body");

    function changeTheme() {
        if (dayStatus) {
            body.classList = "";
            setImageUrl("/img/moon.png");
        } else {
            body.classList = "night-mode";
            setImageUrl("/img/sun.png");
        }
        setTheme(!dayStatus);
    };

    return (
        <footer>
            <div className="pt-5 mt-3 pb-2">
                    <h5 className="logo w-100 d-block text-center" href="#" >
                        Made With <i className="fa fa-heart text-danger"></i> by <a href="http://github.com/akashraj9828" target="_blank" rel="noopener noreferrer">@akashraj9828</a> and <a href="http://github.com/amirsohel007" target="_blank" rel="noopener noreferrer">@amirshohel007</a> 
                        {/* <img src={process.env.PUBLIC_URL + "/cat-logo.png"} alt="" /> */}
                    </h5>
            </div>
        </footer>
    );
};

export default Footer;
