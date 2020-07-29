import React, { Fragment } from "react";

function UserActivity(props) {
	const { data } = props;

	if (data.length < 2) {
		return (
			<div style={{ height: "100%" }}>
				<div
					className='d-flex h-100'
					style={{
						flexDirection: "row",
						textAlign: "center",
						alignItems: "center",
					}}>
					<h6 className='text-center mt-3 w-100'>
						<span style={{ color: "gray" }}>Not recent activity :'( </span>
					</h6>
				</div>
			</div>
		);
	}

	let dom = data.map((event) => (
		<div key={event.id} className='row my-1'>
			<div className='px-2'>
				<img className='img img-fluid rounded' style={{ maxWidth: "30px" }} src={event.image} alt='' />
			</div>
			<div className='col'>
				<h6 className='m-0 font-size-11'>
					{event.title}
					<br />
					<small className='text-muted'>{event.time}</small>
				</h6>
			</div>
		</div>
	));
	return <Fragment>{dom}</Fragment>;
}

export default UserActivity;
