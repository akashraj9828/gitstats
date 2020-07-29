import React, { Fragment, useEffect, useState } from "react";
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
import { setUserName, resetState, setUserData, setRepoData, setUserActivity, setCommitHistory } from "redux/actions/app";
import { useDocumentTitle } from "CustomHooks";

const Stats = ({ match, history, theme, userName, name, userData, repoData, userActivity, dispatch }) => {
	let username = match.params.username;
	useDocumentTitle(name ? `${name} | GitStats` : `GitStats - An open-source contribution analyzer`);
	const [aggregateData, setAggregateData] = useState(null);
	const [languageData, setLanguageData] = useState(null);
	const [repoAnalysisData, setRepoAnalysisData] = useState(null);
	const [languageGraphDataSize, setLanguageGraphDataSize] = useState(null);
	const [languageGraphDataCount, setLanguageGraphDataCount] = useState(null);
	const [repoGraphDataCommitWise, setRepoGraphDataCommitWise] = useState(null);
	const [repoGraphDataPopularityWise, setRepoGraphDataPopularityWise] = useState(null);
	const [commitHistoryData, setCommitHistoryData] = useState(null);
	const [commitHistoryGraphData, setCommitHistoryGraphData] = useState(null);
	const [initialPageLoad, setInitialPageLoad] = useState(null);

	useEffect(() => {
		console.log("username Changed");
		dispatch(resetState());
		dispatch(setUserName(username));
		fetchApiData(username);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [username]);
	// API CALL
	const fetchApiData = async (username) => {
		getUserActivity(username);
		getCommitHistory(username);
		const userData = await DataProvider.getUserInfo(username);
		dispatch(setUserData(userData));
		const repoData = await DataProvider.getRepositoryInfo(username, userData.data.user.id);
		dispatch(setRepoData(repoData));
	};
	// API CALL
	const getUserActivity = async (username) => {
		const userActivity = await DataProvider.getUserActivity(username);
		dispatch(setUserActivity(userActivity));
	};
	// API CALL
	const getCommitHistory = async (username) => {
		const commitHistory = await DataProvider.getCommitHistory(username);
		dispatch(setCommitHistory(commitHistory));
	};

	useEffect(() => {
		const profileAnalysis = async () => {
			const profileData = await DataProvider.profileAnalysis(repoData);
			setAggregateData(profileData.basic_calculations);
			setLanguageData(profileData.language_calculations);
			setRepoAnalysisData(profileData.repo_calculations);
		};
		repoData && profileAnalysis();
	}, [repoData]);

	if (!userData) {
		return (
			<Fragment>
				<Header />
				{Loader.section_loading}
			</Fragment>
		);
	}

	return (
		<Fragment>
			<Header />
			{userData && <Share data={userData} />}
			{/* <Link to='akashraj9828'>akashraj9828</Link>
			<Link to='tovalds'>torvalds</Link> */}
			<div>
			<Layout>{userData && aggregateData && <BasicInformation basicInfo={userData} aggregateData={aggregateData} />}</Layout>
				{/* REPO SECTION */}
				<section className='pt-5 '>
								<div className='row'>
									<div className='col-sm-6 mt-3'>
										<h3 className='font-size-15 w-100'>My Recent activities</h3>
										<div
											className='card p-3 rounded'
											id='user-activity'
											style={{
												height: "calc( 100% - 20px )",
												maxHeight: "350px",
												overflow: "auto",
											}}>
											{/*Will show 30 recent activity by user */}
											{userActivity ? (
												<Fragment>
													<UserActivity data={userActivity} />
												</Fragment>
											) : (
												Loader.section_loading
											)}
										</div>
									</div>

									{/*  */}
								
								</div>
							</section>

			</div>
			
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	const { theme, userName, name, userData, repoData, userActivity } = state.app;
	return { theme, userName, name, userData, repoData, userActivity };
};

export default connect(mapStateToProps, null)(Stats);
