import React from 'react'

function Layout (props) {
    return <div className="app-wrapper pb-3" id="user-profile"><div className="container">{props.children}</div></div>
}

export default Layout