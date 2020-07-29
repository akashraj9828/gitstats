import React from "react";

import { connect } from "react-redux";

const Credits = ({ userName }) => {
	const date = new Date();
	// document.querySelector(".timestamp").innerText =
	return (
		<div className='credits my-3' id='credits'>
			<span className='timestamp  p-1 rounded '>{date.toDateString()}</span>
			<span className='credit-text p-1 rounded'>
				{" "}
				<a className='website' href={`https://gitstats.me/${userName}`}>
					{" "}
					gitstats.me/{userName}
				</a>
			</span>
		</div>
	);
};

const mapStateToProps = (state) => ({
	userName: state.app.userName,
});

export default connect(mapStateToProps, null)(Credits);
