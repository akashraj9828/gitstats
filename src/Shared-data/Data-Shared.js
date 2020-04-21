import React from "react";
import axios from "axios";
import config from '../config/index'

Object.keys(config).forEach(key => {
  window[key] = config[key];
});

//common variables
const API_BASE_URL = window.API_BASE_URL
// const username = props.username ? props.username : "akashraj9828"
const API_FULL_URL = API_BASE_URL + "akashraj9828";

//Network call for Basic User Details View
const getUserInfo = async () => {
  let response = await axios.get(API_FULL_URL);
  const userData = response.data;
  return userData;
};

//Network CALL For Repository Data View
const getRepositoryInfo = async () => {
  let response = await axios.get(API_BASE_URL + "repos/akashraj9828/MDQ6VXNlcjE0OTU5");
   const repository_data = response.data;
  return repository_data
};

//Network CALL For Pinned Repository
const getPinnedRepo = async () => {
  let response = await axios.get(API_BASE_URL+"pinned/akashraj9828");
  const pinned_data = response.data;
  return pinned_data 
};

//Total Basic Calculation View
  const totalBasicCalculation = async () => {
    let repoInfo = await getRepositoryInfo();
    let repoNodes = await repoInfo.data.user['repositories'].nodes;
    //Total commit
    let totalcommit = repoNodes.reduce((sum, commit) => sum += commit.contributions.target.userCommits.totalCount,0);
      //Get total Stargazers
    let totalstargazer = repoNodes.reduce((sum, stargazers) => sum + stargazers["stargazers"].totalCount, 0);
      //Get total fork
    let totalFork = repoNodes.filter(fork => fork.isFork == true);
   return {
    totalcommit : totalcommit,
    stargazer : totalstargazer, 
    totalFork: totalFork,
    totalrepo : repoNodes.length}
  }


  export default {
    getUserInfo,
    getRepositoryInfo,
    totalBasicCalculation,
    getPinnedRepo
  }



 