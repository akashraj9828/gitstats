import React, { useState } from "react";
import {ReactComponent as GitStatsLogo} from '../Images/logo.svg';
import DataProvider from "../Data-provider/index"
import ScrollToBottom from 'react-scroll-to-bottom';
import Loader from '../Components/Extras/Loader'
import {DebounceInput} from 'react-debounce-input';

function Header() {
    let [dayStatus, setTheme] = useState(true);
    let [imageUrl, setImageUrl] = useState("img/sun.png");
    let [searchUsers, setSearchUsers] = useState();
    const [searchString, setSearchString] = useState()
    let body = document.querySelector("body");

    function changeTheme() {
        if (dayStatus) {
            body.classList = "";
            setImageUrl("/img/moon.png");
        } else {
            body.classList = "night-mode";
            setImageUrl("/img/sun.png");
        }
        setTheme(!dayStatus);
    };

    function openSearch(){
      let search =  document.querySelector('.search-wrapper');
      if(search.classList.contains('open')){
        search.classList.remove('open')
      }
      else{
        search.classList.add('open')
      }

    }

   async function search(event){
    setSearchString(event.target.value)
    let result = await DataProvider.getSearchUsers(event.target.value);
    let users = result && result.map(user => 
            <li><a href={`/${user.login}`}><img src={user.avatar_url}/> {user.login}</a></li>
    );
     setSearchUsers(users);
    }

    return (
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand text-white logo" href="#">
              <GitStatsLogo height={30} />
              {/* <img src={process.env.PUBLIC_URL + "/cat-logo.png"} alt="" /> */}
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className=" navbar-collapse" id="navbarNavDropdown">
            <button onClick={openSearch} className="search_icon">{Loader.search_icon}</button>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active active nav-item position-relative search-wrapper">
                  <a className="nav-link text-light-gray">
                    <DebounceInput
                      minLength={2}
                      debounceTimeout={500}
                      className="search"
                      placeholder="Search..."
                      onChange={search}
                    />
                  </a>
                  {searchUsers && (
                    <div className="Search-result">
                      <ul className="search-result">
                        <ScrollToBottom>
                          {searchUsers.length > 0
                            ? searchUsers
                            : Loader.user_not_found}
                        </ScrollToBottom>
                      </ul>
                    </div>
                  )}
                </li>
                <li className="mobile-theme">
                  <div className="change-theme mt-2 font-size-13">
                    <button onClick={changeTheme}>
                      <img
                        className="mr-1"
                        src={process.env.PUBLIC_URL + imageUrl}
                        alt=""
                      />
                      <span className="d-none d-lg-inline-block d-sm-inline-block">{dayStatus ? "Night Mode" : "Day Mode"}</span>
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

export default Header;
