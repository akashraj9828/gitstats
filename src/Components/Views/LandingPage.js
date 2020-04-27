import React, { useState } from 'react'
import DataProvider from '../../Data-provider/index'
import { DebounceInput } from 'react-debounce-input';
import Footer from '../Footer'

import GithubLink from "./Components/GithubLink"
const LandingPage = () => {
    let [searchUsers, setSearchUsers] = useState();


    async function search(event) {
        let result = await DataProvider.getSearchUsers(event.target.value);
        let users = result && result.map(user =>
            <li key={user.login}><a href={`/${user.login}`}><img src={user.avatar_url} alt={user.login} /> {user.login}</a></li>
        );
        setSearchUsers(users);
    }

    return (
        <div className="landing-page d-flex justify-content-center ">
            <GithubLink color={"#caa981"} />
            <div className="git-wrapper">
                <a class="github-button" href="https://github.com/akashraj9828/gitstats" data-icon="octicon-star" data-show-count="true" aria-label="Star akashraj9828/gitstats on GitHub">Star</a>
                <a class="github-button" href="https://github.com/akashraj9828/gitstats/fork" data-icon="octicon-repo-forked" data-show-count="true" aria-label="Fork akashraj9828/gitstats on GitHub">Fork</a>
                <a class="github-button" href="https://github.com/akashraj9828/gitstats/subscription" data-icon="octicon-eye" data-show-count="true" aria-label="Watch akashraj9828/gitstats on GitHub">Watch</a>
            </div>
            <div className="content-area">
                <div className="m-auto p-5">
                    <h1 className="font-weight-bold mb-3" >Git-Stats</h1>
                    <p className="font-size-14">An open-source GitHub contribution analyzer </p>
                    <div className="search-inner position-relative">
                        <DebounceInput
                            minLength={2}
                            debounceTimeout={500}
                            placeholder="Find github users..."
                            onChange={search}
                            style={{
                                maxWidth: 600,
                                width: "100%",
                                minWidth: 400
                            }}

                        />

                        {searchUsers && (
                            <div className="Search-result">
                                <ul className="search-result">
                                    {/*No Need to scroll to bottom  */}
                                    {/* best match is always at top */}
                                    {searchUsers.length > 0
                                        ? searchUsers
                                        : ""}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage