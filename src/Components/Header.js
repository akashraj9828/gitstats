import React, { useState, useEffect } from "react";
import { ReactComponent as GitStatsLogo } from "../Images/logo.svg";
import DataProvider from "../Data-provider/index";
import Loader from "../Components/Extras/Loader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleTheme } from "redux/actions/app";
import { useDebounce } from "CustomHooks";

const Header = ({ theme, dispatch }) => {
	let [imageUrl, setImageUrl] = useState("img/sun.png");
	const [searchInput, setSearchInput] = useState("");
	let [searchUsers, setSearchUsers] = useState();
	const debouncedSearch = useDebounce(searchInput, 500);

	useEffect(() => {
		if (theme === "light") setImageUrl("img/moon.png");
		else setImageUrl("img/sun.png");
	}, [theme]);

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
		<header>
			<div className='container'>
				<nav className='navbar navbar-expand-lg'>
					<Link className='navbar-brand text-white logo' to='/'>
						<GitStatsLogo height={30} />
						{/* <img src={process.env.PUBLIC_URL + "/cat-logo.png"} alt="" /> */}
					</Link>
					<div className='navbar-collapse' id='navbarNavDropdown'>
						<ul className='navbar-nav ml-auto'>
							<li className='nav-item active  position-relative search-wrapper'>
								<span className='search-icon'>{Loader.search_icon}</span>
								<span className='nav-link text-light-gray'>
									<input
										className='search'
										placeholder='Search...'
										onChange={(e) => setSearchInput(e.target.value)}
										value={searchInput}
										id='search_bar'
										onFocus={(e) => setSearchUsers([])}
										onBlur={() =>
											setTimeout(() => {
												setSearchUsers(null);
											}, 500)
										}
									/>
								</span>
								{searchUsers && (
									<div className='Search-result'>
										<ul className='search-result'>
											{/*No Need to scroll to bottom  */}
											{/* best match is always at top */}
											{!searchInput ? Loader.search_for_user : searchUsers.length > 0 ? searchUsers : Loader.user_not_found}
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
