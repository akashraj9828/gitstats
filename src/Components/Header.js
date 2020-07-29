import React, { useState, useEffect } from "react";
import { ReactComponent as GitStatsLogo } from "../Images/logo.svg";
import DataProvider from "../Data-provider/index";
import Loader from "../Components/Extras/Loader";
import { DebounceInput } from "react-debounce-input";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleTheme } from "redux/actions/app";

const Header = ({ theme, dispatch }) => {
	console.log("---: Header -> theme", theme);

	let [imageUrl, setImageUrl] = useState("img/sun.png");
	let [searchUsers, setSearchUsers] = useState();

	useEffect(() => {
		if (theme === "light") setImageUrl("img/moon.png");
		else setImageUrl("img/sun.png");
	}, [theme]);

	function openSearch() {
		let search = document.querySelector(".search-wrapper");
		if (search.classList.contains("open")) {
			search.classList.remove("open");
		} else {
			search.classList.add("open");
		}
	}

	async function search(event) {
		let result = await DataProvider.getSearchUsers(event.target.value);
		let users =
			result &&
			result
				.filter((user) => user.type === "User")
				.map((user) => (
					// <li key={user.login}><Link to={`/${user.login}`}><img src={user.avatar_url} alt={user.login}/> {user.login}</Link></li>
					//   temporary fix reload page instead of routing
					<li key={user.login}>
						<a href={`/${user.login}`}>
							<img src={user.avatar_url} alt={user.login} /> {user.login}
						</a>
					</li>
				));

		setSearchUsers(users);
	}

	return (
		<header>
			<div className='container'>
				<nav className='navbar navbar-expand-lg'>
					<Link className='navbar-brand text-white logo' to='/'>
						<GitStatsLogo height={30} />
						{/* <img src={process.env.PUBLIC_URL + "/cat-logo.png"} alt="" /> */}
					</Link>
					<div className='navbar-collapse' id='navbarNavDropdown'>
						<button onClick={openSearch} className='search_icon'>
							{Loader.search_icon}
						</button>
						<ul className='navbar-nav ml-auto'>
							<li className='nav-item active active nav-item position-relative search-wrapper'>
								<span className='nav-link text-light-gray'>
									<DebounceInput
										minLength={2}
										debounceTimeout={500}
										className='search'
										placeholder='Search...'
										onChange={search}
										id='search_bar'
										onBlur={() =>
											setTimeout(() => {
												setSearchUsers(null);
											}, 1000)
										}
									/>
								</span>
								{searchUsers && (
									<div className='Search-result'>
										<ul className='search-result'>
											{/*No Need to scroll to bottom  */}
											{/* best match is always at top */}
											{searchUsers.length > 0 ? searchUsers : Loader.user_not_found}
										</ul>
									</div>
								)}
							</li>
							<li className='mobile-theme'>
								<div className='change-theme mt-2 font-size-13'>
									<button onClick={() => dispatch(toggleTheme())}>
										<img className='mr-1' src={process.env.PUBLIC_URL + imageUrl} alt='' />
										<span className='d-none d-lg-inline-block d-sm-inline-block'>{window.localStorage.getItem("theme") === "light" ? "Night Mode" : "Day Mode"}</span>
									</button>
								</div>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</header>
	);
};

const mapStateToProps = (state) => {
	return { theme: state.app.theme };
};

export default connect(mapStateToProps, null)(Header);
