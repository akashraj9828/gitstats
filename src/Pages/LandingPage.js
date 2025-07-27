import React, { useState, useEffect } from "react";
import DataProvider from "../Data-provider/index";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import GithubLink from "../Components/Views/Components/GithubLink";
import axios from "axios";
import { useDebounce } from "CustomHooks";

const API_BASE_URL = window.API_BASE_URL;

const LandingPage = () => {
	const [searchInput, setSearchInput] = useState("");
	const [searchUsers, setSearchUsers] = useState();
	// ping api to wake up server
	useEffect(() => {
		axios.get(API_BASE_URL);
	}, []);

	const debouncedSearch = useDebounce(searchInput, 500);

	useEffect(() => {
		const search = async () => {
			let result = await DataProvider.getSearchUsers(debouncedSearch);
			let users =
				result &&
				result
					.filter((user) => user.type === "User")
					.map((user) => (
						<li key={user.login}>
							<Link to={`/${user.login}`}>
								<img src={user.avatar_url} alt={user.login} /> {user.login}
							</Link>
						</li>
					));
			setSearchUsers(users);
		};
		search();
	}, [debouncedSearch]);
	return (
		<div className='landing-page d-flex justify-content-center '>
			<GithubLink color={"#caa981"} />
			<div className='git-wrapper'>
				<a className='github-button' href='https://github.com/akashraj9828/gitstats' data-icon='octicon-star' data-show-count='true' aria-label='Star akashraj9828/gitstats on GitHub'>
					Star
				</a>
				<a className='github-button' href='https://github.com/akashraj9828/gitstats/fork' data-icon='octicon-repo-forked' data-show-count='true' aria-label='Fork akashraj9828/gitstats on GitHub'>
					Fork
				</a>
				<a className='github-button' href='https://github.com/akashraj9828/gitstats/subscription' data-icon='octicon-eye' data-show-count='true' aria-label='Watch akashraj9828/gitstats on GitHub'>
					Watch
				</a>
			</div>
			<div className='content-area'>
				<div className='m-auto p-5'>
					<h1 className='font-weight-bold mb-3'>Git-Stats</h1>
					<p className='font-size-14'>An open-source GitHub contribution analyzer </p>
					<div className='search-inner position-relative'>
						<input
							placeholder='Find github users...'
							onChange={(e) => setSearchInput(e.target.value)}
							value={searchInput}
							id='landing_page_input'
							onFocus={(e) => setSearchUsers([])}
							onBlur={() =>
								setTimeout(() => {
									setSearchUsers(null);
								}, 500)
							}
						/>

						{searchUsers && (
							<div className='Search-result'>
								<ul className='search-result'>{searchUsers.length > 0 ? searchUsers : ""}</ul>
							</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default LandingPage;
