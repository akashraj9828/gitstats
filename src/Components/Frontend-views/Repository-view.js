import React, { useEffect, useState } from 'react'
import axios from "axios";

const Repository = () => {
const [repoDdata, setRepoData] = useState([]);
const getRepoUrl = window.API_BASE_URL+"repos/akashraj9828/MDQ6VXNlcjI5Nzk2Nzg1"

//Network Request For Repository Data
  const getUserInfo = async () => {
    let response = await axios.get(getRepoUrl);
    const repository_data = response.data;
    setRepoData(repository_data.data.user.repositories['nodes']);
  
  };

  //Get total Commit
  let totalCommit = repoDdata.reduce((sum, commit) => {
    return sum + commit.contributions.target.userCommits.totalCount;
  }, 0);

  //Get total Stargazers
  let totalStargazers = repoDdata.reduce((sum, stargazers) => {
    return sum + stargazers["stargazers"].totalCount;
  }, 0);

 //Get total Fork
 let totalFork = repoDdata.filter(fork => fork.isFork == true)

  useEffect(() => {
    getUserInfo();
      //total count
  }, []);

return(
<div>
    <p>total commit : {totalCommit? totalCommit: "Loading..."}</p>
   <p>total repo : {repoDdata? repoDdata.length: "Loading..."}</p>
   <p>total star : {totalStargazers ? totalStargazers : "Loading..."}</p>
<p>total fork {totalFork? totalFork.length : "Loading..."}</p>
</div>

)


}

export default Repository