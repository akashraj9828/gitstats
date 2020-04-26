import React, { Fragment } from "react"


function UserActivity(props) {
    const { data } = props

    let dom = data.map(event => <div key={event.id} className="row">
        <div className="d-inline m-2">
            <img className="img img-fluid rounded" src={event.image} alt="" />
        </div>
        <div className="d-inline  m-2">
            <h6 className="m-0 font-size-11">
                {event.title}
                <br />
                <small className="text-muted">{event.time}</small>
            </h6>
        </div>
    </div>

    )
    return (
        <Fragment>
            {dom}
        </Fragment>
    )
}

export default UserActivity