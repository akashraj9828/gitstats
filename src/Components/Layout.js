import React from 'react'
import Credits from "./Credits"
function Layout (props) {
    return <div className="app-wrapper pb-3" id="user-profile"><div className="container">{props.children} <Credits/> </div></div>
}

export default Layout