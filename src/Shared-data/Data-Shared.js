import axios from "axios";
import config from '../config/index'

Object.keys(config).forEach(key => {
  window[key] = config[key];
});

let username = ""

//get Name
 function getUsername (value){
  username = value != '/' ? value.substr(1) : "akashraj9828"
}

//common variables
const API_BASE_URL = window.API_BASE_URL

//Network call for Basic User Details View
const getUserInfo = async () => {
  let response = await axios.get(API_BASE_URL+username);
  const userData = response.data;
  if(userData){
   getRepositoryInfo(userData.data.user.id)
  }
   return userData;
};



//Network CALL For Repository Data View
const getRepositoryInfo = async (id) => {
  let userId = id==undefined ? "MDQ6VXNlcjkxMTQ5OTA=" : id
  let response = await axios.get(`${API_BASE_URL}repos/${username}/${userId}`);

  if(response){
  totalBasicCalculation(response.data.data.user);
   const repository_data = response.data;
   return repository_data
  }
};

//Network CALL For Pinned Repository
const getPinnedRepo = async () => {
    try {
    let response = await axios.get(`${API_BASE_URL}pinned/${username}`);
    const pinned_data = await response.data;
    return pinned_data 
    } catch (error) {
      console.log(error)
    }
};

//Total Basic Calculation View
  const totalBasicCalculation = async (data) => {
 
    let repoNodes = data && data.repositories.nodes;
    //Total commit
    let totalcommit = data && repoNodes.reduce((sum, commit) => sum += commit.contributions.target.userCommits.totalCount,0);
      //Get total Stargazers
    let totalstargazer = data && repoNodes.reduce((sum, stargazers) => sum + stargazers["stargazers"].totalCount, 0);
      //Get total fork
    let totalFork = await data && repoNodes.filter(fork => fork.isFork == true);
    
   return  {
    totalcommit : totalcommit,
    stargazer : totalstargazer, 
    totalFork: totalFork,
    totalrepo : data &&repoNodes.length
  }

  }

  export default {
    getUserInfo,
    getRepositoryInfo,
    totalBasicCalculation,
    getPinnedRepo,
    getUsername,
  }



 