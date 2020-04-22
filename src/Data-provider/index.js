import axios from "axios";
import config from '../config/index'

Object.keys(config).forEach(key => {
  window[key] = config[key];
});

//common variables
const API_BASE_URL = window.API_BASE_URL

//Network call for Basic User Details View
async function getUserInfo(username) {
  let response = await axios.get(API_BASE_URL + username);
  const userData = response.data;
  return userData;
};



//Network CALL For Repository Data View
async function getRepositoryInfo(username, id) {
  let userId = id
  let response = await axios.get(`${API_BASE_URL}repos/${username}/${userId}`);
  const repository_data = response.data;
  return repository_data
};

//Network CALL For Pinned Repository
async function getPinnedRepo(username) {
  let response = await axios.get(`${API_BASE_URL}pinned/${username}`);
  const pinned_data = response.data;
  return pinned_data
};


//Total Basic Calculations  totalCommit, totalStar, totalFork, totalRepo
async function totalBasicCalculation(repoInfo) {

  let repoNodes = repoInfo.data.user.repositories.nodes;
  let totalCommit = 0
  let totalStar = 0
  let totalFork = 0
  // forEach is faster because instead of 3 loops all calculations done in one loop
  repoNodes.forEach(repo => {
    totalCommit += repo.contributions ? repo.contributions.target.userCommits.totalCount : 0
    totalStar += repo.stargazers ? repo.stargazers.totalCount : 0
    totalFork += repo.forks ? repo.forks.totalCount : 0
  });
  let totalRepo = repoNodes.length
  let calculatedData = {
    totalCommit,
    totalStar,
    totalFork,
    totalRepo
  }
  return calculatedData
}


// helper function to sort object by value
function sortObject(obj) {
  var arr = [];
  var prop;
  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      arr.push({
        'key': prop,
        'value': obj[prop]
      });
    }
  }
  arr.sort(function (a, b) {
    return b.value - a.value;
  });
  return arr; // returns array [[key:val],[key:val]]
}

// returns an array of key value paired sorted array of languages used
// value denotes how many bytes has been written in that language
async function languageAnalysis(repoInfo) {
  let repoNodes = repoInfo.data.user.repositories.nodes;
  // counts total size of code written in particular language
  let language_size_data = {}

  // counts in how repos language was used
  let language_count_data = {}
  
  // Color associated with each language
  let language_color_data = {}
  repoNodes.forEach(repo => {
    const {
      languages
    } = repo;
    const {
      edges
    } = languages
    edges.forEach(language => {
      // if language seen already update size and add +1 for repo
      if (language_size_data.hasOwnProperty(language.node.name)) {
        language_size_data[language.node.name] += language.size;
        language_count_data[language.node.name] += 1;
      } else {
        // if language seen first time set size and repo count=0 and save color
        language_size_data[language.node.name] = 0;
        language_count_data[language.node.name] = 0;
        language_color_data[language.node.name] = language.node.color;
      }
    })
  });
  return {
    "language_size_data": sortObject(language_size_data),
    "language_count_data": sortObject(language_count_data),
    "language_color_data": language_color_data
  }


}
export default {
  getUserInfo,
  getRepositoryInfo,
  totalBasicCalculation,
  getPinnedRepo,
  languageAnalysis,
}