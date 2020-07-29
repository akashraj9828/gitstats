import React, { Fragment, useEffect } from "react";
import Layout from "Components/Layout";
import BasicInformation from "Components/Views/BasicInfo";
import Pinned from "Components/Views/Pinned";
import DataProvider from "Data-provider";
import PieChart from "Components/Charts/PieChart";
import BarChart from "Components/Charts/BarChart";
import Loader from "Components/Extras/Loader";
import Footer from "Components/Footer";
import Share from "Components/Views/Share";
import Header from "Components/Header";
import UserActivity from "Components/Views/UserActvity";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Stats = ({ match, history, user_id, basicInfo, pinnedInfo, repoInfo, repoLoaded, theme }) => {
	let username = match.params.username;

	useEffect(() => {
		console.log("username Changed");
		fetchApiData(username);
	}, [username]);

	const fetchApiData = async (username) => {
		getUserActivity(username)
		const userData = await DataProvider.getUserInfo(username);
		const repoData = await DataProvider.getRepositoryInfo(username, userData.data.user.id);
		console.log("---: fetchApiData -> userData", userData);
		console.log("---: fetchApiData -> repoData", repoData);
	};

	const getUserActivity=async (username)=>{
		const userActivity=await DataProvider.getUserActivity(username)
        console.log("---: getUserActivity -> userActivity", userActivity);
	}

	console.log("---: Stats -> username", username);
	return <Fragment>
				<Header />

		<Link to="akashraj9828">akashraj9828</Link>
		<Link to="tovalds">torvalds</Link>
	</Fragment> ;
};

const mapStateToProps = (state) => {
	const { user_id, basicInfo, pinnedInfo, repoInfo, repoLoaded } = state.app;
	return { user_id, basicInfo, pinnedInfo, repoInfo, repoLoaded };
};


export default connect(mapStateToProps, null)(Stats);
