import React, {useState} from 'react'
import DataProvider from '../../Data-provider/index'
import { DebounceInput } from 'react-debounce-input';

const LendingPage = () => {
    let [searchUsers, setSearchUsers] = useState();


    async function search(event) {
        let result = await DataProvider.getSearchUsers(event.target.value);
        let users = result && result.map(user =>
            <li key={user.login}><a href={`/${user.login}`}><img src={user.avatar_url} alt={user.login}/> {user.login}</a></li>
        );
        setSearchUsers(users);
    }

    return (
        <div className="lending-page">
               <div className="content-area">
                  <div className="m-auto p-5">
                  <h1 className="font-weight-bold mb-3" >Analysis Any Git profile</h1>
                    <p className="font-size-14">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable</p>
                   <div className="search-inner position-relative">
                   <DebounceInput
                                        minLength={2}
                                        debounceTimeout={500}
                                        placeholder="Find people..."
                                        onChange={search}
                                        
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
        </div>
    )
}

export default LendingPage