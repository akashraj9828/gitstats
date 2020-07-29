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
import { setUserName, resetState, setUserData, setRepoData, setUserActivity, setCommitHistory } from "redux/actions/app";
import { useDocumentTitle } from "CustomHooks";

const Stats = ({ match, history, theme, userName, name, userData, repoData, userActivity, commitHistory, week_dict, dispatch }) => {
	let username = match.params.username;
	useDocumentTitle(name ? `${name} | GitStats` : `GitStats - An open-source contribution analyzer`);
	const [aggregateData, setAggregateData] = useState(null);
	console.log("---: Stats -> aggregateData", aggregateData);
	const [languageData, setLanguageData] = useState(null);
	const [repoAnalysisData, setRepoAnalysisData] = useState(null);
	const [languageGraphDataSize, setLanguageGraphDataSize] = useState(null);
	const [languageGraphDataCount, setLanguageGraphDataCount] = useState(null);
	const [repoGraphDataCommitWise, setRepoGraphDataCommitWise] = useState(null);
	const [repoGraphDataPopularityWise, setRepoGraphDataPopularityWise] = useState(null);
	const [commitHistoryGraphData, setCommitHistoryGraphData] = useState(null);
	const [initialPageLoad, setInitialPageLoad] = useState(null);
	const [top2days, setTop2days] = useState(null);
	const [profileAnalysisError, setProfileAnalysisError] = useState(null);
	const reset = () => {
		setLanguageData(null);
		setRepoAnalysisData(null);
		setLanguageGraphDataSize(null);
		setLanguageGraphDataCount(null);
		setRepoGraphDataCommitWise(null);
		setRepoGraphDataPopularityWise(null);
		setCommitHistoryGraphData(null);
		setInitialPageLoad(null);
		setTop2days(null);
	};
	useEffect(() => {
		console.log("username Changed");
		reset();
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
		const analysis = async () => {
			const result = await DataProvider.commitGraphDataDayWise(commitHistory);
			setTop2days(result.top2days);
			setCommitHistoryGraphData(result.week_graph_data);
			setAggregateData((s) => ({
				...s,
				totalCommit: result.total_commit_all_years,
			}));
		};
		commitHistory && analysis();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [commitHistory]);

	// on change of repo data perform some calculation
	useEffect(() => {
		const repoAnalysis = async () => {
			setProfileAnalysisError(null);
			const result = await DataProvider.profileAnalysis(repoData);
			result.error && setProfileAnalysisError(result.error);
			setAggregateData((s) => ({ ...s, ...result.basic_calculations }));
			setLanguageData(result.language_calculations);
			setRepoAnalysisData(result.repo_calculations);
		};
		repoData && repoAnalysis();
	}, [repoData]);

	// when repo analysis changes perform graph calcualtion
	useEffect(() => {
		const graphCalculation = async () => {
			const graphData = await DataProvider.repoBarGraphCalculation(repoAnalysisData);
			setRepoGraphDataCommitWise(graphData.data_commit_wise);
			setRepoGraphDataPopularityWise(graphData.data_popularity_wise);
		};
		repoAnalysisData && graphCalculation();
	}, [repoAnalysisData]);

	useEffect(() => {
		const analysis = async () => {
			const result = await DataProvider.languageGraphCaclulations(languageData, repoAnalysisData);
			setLanguageGraphDataSize(result.data_size_wise);
			setLanguageGraphDataCount(result.data_count_wise);
		};
		repoAnalysisData && languageData && analysis();
	}, [repoAnalysisData, languageData]);

	if (!userData) {
		return (
			<Fragment>
				<Header />
				{Loader.section_loading}
			</Fragment>
		);
	}

	console.log("---: Stats -> commitHistoryGraphData", commitHistoryGraphData);
	console.log("---: Stats -> top2days", top2days);

	return (
		<Fragment>
			<Header />
			{userData && <Share data={userData} />}
			<Layout>
				{userData ? (
					<div>
						{/* CONDITIONAL REDERING OF BASIC INFO */}
						{userData && aggregateData ? <BasicInformation basicInfo={userData} aggregateData={aggregateData} /> : Loader.section_loading}

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

								<div className='col-sm-6 mt-3'>
									<h3 className='font-size-15 w-100'>Commit analysis</h3>
									<div className='card p-3 rounded' style={{ height: "calc( 100% - 20px )" }}>
										{/* CONDITIONAL REDERING OF COMMIT ANALYSYS(repo wise) INFO */}
										{repoGraphDataCommitWise ? (
											<Fragment>
												<PieChart data={repoGraphDataCommitWise} height={250} max_slices={10} error={profileAnalysisError} />
												{/* Extra info about pie chart */}
												<div>
													<h6 className='text-center mt-3'>
														{repoGraphDataCommitWise[0] && (
															<Fragment>
																{" "}
																Most Commits are done in{" "}
																<span
																	style={{
																		color: repoGraphDataCommitWise[0].color,
																	}}>
																	{" "}
																	{repoGraphDataCommitWise[0].id}{" "}
																</span>
															</Fragment>
														)}
													</h6>
												</div>
											</Fragment>
										) : (
											Loader.section_loading
										)}
									</div>
								</div>
							</div>
						</section>

						{/* LANGUAGE SECTION */}
						<section className='pt-5 '>
							<div className='row'>
								<div className='col-sm-6 mt-3'>
									<h3 className='font-size-15 w-100'>Language analysis Size wise</h3>
									{/* height:"calc( 100% - 20px ) because h3 above take 20px but i wanted card to be equal to the col-height */}
									<div className='card p-3 rounded' style={{ height: "calc( 100% - 20px )" }}>
										{/* CONDITIONAL REDERING OF LANGUAGE ANALYSYS(BY SIZE) INFO */}
										{languageGraphDataSize ? (
											<Fragment>
												<PieChart data={languageGraphDataSize} height={250} max_slices={6} accumulate_remaining={true} error={profileAnalysisError} />
												{/* Extra info about pie chart */}
												<div>
													<h6 className='text-center mt-3'>
														{languageGraphDataSize[0] && (
															<Fragment>
																{" "}
																Most written language is{" "}
																<span
																	style={{
																		color: languageGraphDataSize[0].color,
																	}}>
																	{" "}
																	{languageGraphDataSize[0].id}{" "}
																</span>
															</Fragment>
														)}
														{languageGraphDataSize[1] && (
															<Fragment>
																{" "}
																followed by{" "}
																<span
																	style={{
																		color: languageGraphDataSize[1].color,
																	}}>
																	{" "}
																	{languageGraphDataSize[1].id}{" "}
																</span>
															</Fragment>
														)}
														{languageGraphDataSize[2] && (
															<Fragment>
																{" "}
																&{" "}
																<span
																	style={{
																		color: languageGraphDataSize[2].color,
																	}}>
																	{" "}
																	{languageGraphDataSize[2].id}{" "}
																</span>
															</Fragment>
														)}
													</h6>
												</div>
											</Fragment>
										) : (
											Loader.section_loading
										)}
										{/* {languageData ? <Language languageData={languageData} type="size" /> : Loader.section_loading} */}
									</div>
								</div>
								<div className='col-sm-6 mt-3'>
									<h3 className='font-size-15 w-100'>Language analysis Repo wise</h3>
									<div className='card p-3 rounded' style={{ height: "calc( 100% - 20px )" }}>
										{/* CONDITIONAL REDERING OF LANGUAGE ANALYSYS(BY COUNT) INFO */}
										{languageGraphDataCount ? (
											<Fragment>
												<PieChart data={languageGraphDataCount} height={250} max_slices={6} error={profileAnalysisError} />
												{/* Extra info about pie chart */}
												<div>
													<h6 className='text-center mt-3'>
														{languageGraphDataCount[0] && (
															<Fragment>
																{" "}
																Most Used language is{" "}
																<span
																	style={{
																		color: languageGraphDataCount[0].color,
																	}}>
																	{" "}
																	{languageGraphDataCount[0].id}{" "}
																</span>
															</Fragment>
														)}
														{languageGraphDataCount[1] && (
															<Fragment>
																{" "}
																followed by{" "}
																<span
																	style={{
																		color: languageGraphDataCount[1].color,
																	}}>
																	{" "}
																	{languageGraphDataCount[1].id}{" "}
																</span>
															</Fragment>
														)}
														{languageGraphDataCount[2] && (
															<Fragment>
																{" "}
																&{" "}
																<span
																	style={{
																		color: languageGraphDataCount[2].color,
																	}}>
																	{" "}
																	{languageGraphDataCount[2].id}{" "}
																</span>
															</Fragment>
														)}
													</h6>
												</div>
											</Fragment>
										) : (
											Loader.section_loading
										)}
										{/* {languageData ? <Language languageData={languageData} type="count" /> : Loader.section_loading} */}
									</div>
								</div>
							</div>
						</section>

						{/* PINNED SECTION */}
						<section className='pt-5 '>
							<div className='row'>
								<div className='col-12'>
									<h1 className='font-size-20 w-100'>My Awesome projects</h1>
								</div>
								{/* CONDITIONAL REDERING OF PINNED REPO INFO */}
								{userData ? <Pinned pinnedRepos={userData} /> : Loader.section_loading}
							</div>
						</section>

						{/* POPUPLAR SECTION */}
						<section className='pt-5'>
							<div className='row'>
								<div className='col-sm-12 mt-3'>
									<h3 className='font-size-15 w-100'>My Popuplar Projects</h3>
									<div className='card p-3 rounded' style={{ height: "calc( 100% - 20px )" }}>
										{/* CONDITIONAL REDERING OF COMMIT ANALYSYS(repo wise) INFO */}
										{repoGraphDataPopularityWise ? (
											<Fragment>
												<BarChart data={repoGraphDataPopularityWise} height={250} max_bars={5} error={profileAnalysisError} />
												{/* Extra info about pie chart */}
												<div>
													<h6 className='text-center mt-3'>
														{repoGraphDataPopularityWise[0] && (
															<Fragment>
																{" "}
																Most Commits are done in{" "}
																<span
																	style={{
																		color: repoGraphDataPopularityWise[0].color,
																	}}>
																	{" "}
																	{repoGraphDataPopularityWise[0].id}{" "}
																</span>
															</Fragment>
														)}
													</h6>
												</div>
											</Fragment>
										) : (
											Loader.section_loading
										)}
									</div>
								</div>
							</div>
						</section>

						{/* PRODUCTIVITY SECTION */}
						<section className='pt-5'>
							<div className='row'>
								<div className='col-sm-12 mt-3'>
									<h3 className='font-size-15 w-100'>When am I most productive?</h3>
									<div className='card p-3 rounded' style={{ height: "calc( 100% - 20px )" }}>
										{/* CONDITIONAL REDERING OF WEEK DAY ACTIVITY */}
										{commitHistoryGraphData ? (
											<Fragment>
												{commitHistoryGraphData ? <BarChart data={commitHistoryGraphData} height={250} max_bars={7} keys={["commit"]} indexBy={"day"} error={profileAnalysisError} /> : Loader.section_loading}
												{/* Extra info about Week days chart */}
												<div>
													<h6 className='text-center mt-3'>
														{commitHistoryGraphData[0] && (
															<Fragment>
																{" "}
																I am most productive on{" "}
																<span
																	style={{
																		color: commitHistoryGraphData[top2days[0]].commitColor,
																	}}>
																	{" "}
																	{week_dict[top2days[0]]}{" "}
																</span>{" "}
																and{" "}
																<span
																	style={{
																		color: commitHistoryGraphData[top2days[1]].commitColor,
																	}}>
																	{" "}
																	{week_dict[top2days[1]]}{" "}
																</span>{" "}
															</Fragment>
														)}
													</h6>
												</div>
											</Fragment>
										) : (
											Loader.section_loading
										)}
									</div>
								</div>
							</div>
						</section>
					</div>
				) : (
					initialPageLoad
				)}
			</Layout>
			<Footer />
		</Fragment>
	);
};

const mapStateToProps = (state) => {
	const { theme, userName, name, userData, repoData, userActivity, commitHistory, week_dict } = state.app;
	return { theme, userName, name, userData, repoData, userActivity, commitHistory, week_dict };
};

export default connect(mapStateToProps, null)(Stats);
