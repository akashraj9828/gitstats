import React from "react";

function Footer() {
    let color_scheme = localStorage.getItem('theme') === 'light' ? "no-preference: light; light: ligth; dark: light;" : "no-preference: dark; dark: dark; light: dark;"
    return (
        <footer className="mt-5">
            <div>
                <h5 className="logo w-100 d-block text-center" href="#" >
                    Made With <i className="fa fa-heart text-danger"></i> by
                    &nbsp;
                    <a href="http://github.com/akashraj9828" target="_blank" rel="noopener noreferrer">@akashraj9828</a>
                    &nbsp;
                    and
                    &nbsp;
                    <a href="http://github.com/amirsohel007" target="_blank" rel="noopener noreferrer">@amirshohel007</a>
                </h5>
                <div className="git-footer">
                    <a className="github-button" data-color-scheme={color_scheme} href="https://github.com/akashraj9828" data-show-count="true" aria-label="Follow @akashraj9828 on GitHub">Follow @akashraj9828</a>
                    <a className="github-button" data-color-scheme={color_scheme} href="https://github.com/amirsohel007" data-show-count="true" aria-label="Follow @amirsohel007 on GitHub">Follow @amirsohel007</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

// data-color-scheme="no-preference: dark; light: dark; dark: dark;"
// data-color-scheme="no-preference: dark; light: dark; dark: dark;"