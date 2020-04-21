import axios from "axios";
import config from '../config/index'

Object.keys(config).forEach(key => {
  window[key] = config[key];
});

let username = ""

//get Name
function setUsername(value) {
  // username = value != '/' ? value.substr(1) : "akashraj9828"
  username = value ? value : "akashraj9828"
}

let userInfo=null;
let repoInfo=null;
let pinnedInfo=null;
//common variables
const API_BASE_URL = window.API_BASE_URL

//Network call for Basic User Details View
const getUserInfo = async () => {
  let response = await axios.get(API_BASE_URL + username);
  const userData = response.data;
  getRepositoryInfo(userData.data.user.id)
  userInfo=userData
  return userData;
};



//Network CALL For Repository Data View
const getRepositoryInfo = async (id) => {
  let userId = id === undefined ? "MDQ6VXNlcjI5Nzk2Nzg1" : id
  let response = await axios.get(`${API_BASE_URL}repos/${username}/${userId}`);
  const repository_data = response.data;
  repoInfo=repository_data
  return repository_data
};

//Network CALL For Pinned Repository
const getPinnedRepo = async () => {
  let response = await axios.get(`${API_BASE_URL}pinned/${username}`);
  const pinned_data = response.data;
  pinnedInfo=pinned_data
  return pinned_data
};


let total_calculated = false
let calculatedData = {}
//Total Basic Calculation View
const totalBasicCalculation = async (id) => {
  console.log("before cacl",calculatedData);
  
  if(total_calculated){
    console.log(total_calculated,calculatedData);
    
    console.log("returning cache");
    return calculatedData
  }
  let repoInfo = await getRepositoryInfo(id);
  let repoNodes = await repoInfo.data.user['repositories'].nodes;
  //Total commit
  let totalcommit = repoNodes.reduce((sum, commit) => sum += commit.contributions.target.userCommits.totalCount, 0);
  //Get total Stargazers
  let totalstargazer = repoNodes.reduce((sum, stargazers) => sum + stargazers["stargazers"].totalCount, 0);
  //Get total fork
  let totalFork = repoNodes.filter(fork => fork.isFork == true);
  calculatedData = {
    totalcommit: totalcommit,
    stargazer: totalstargazer,
    totalFork: totalFork,
    totalrepo: repoNodes.length
  }
  total_calculated=true
  console.log("not from cache");
  console.log(calculatedData);
  
  return calculatedData
}




export default {
  getUserInfo,
  getRepositoryInfo,
  totalBasicCalculation,
  getPinnedRepo,
  setUsername,
  calculatedData
}