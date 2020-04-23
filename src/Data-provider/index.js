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

//Search 
async function getSearchUsers(username){
  if(username && username.length){
    let response = await axios.get(`https://api.github.com/search/users?q=${username}`);
    return response.data.items
  }
}

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
    "language_color_data": language_color_data,
    "language_size_data_unsorted": language_size_data,
    "language_count_data_unsorted": language_count_data,
  }
}

// helper function to convert bytes to human readable format
function toReadableBytes(num) {
  var neg = num < 0;
  var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (neg) {
    num = -num;
  }
  if (num < 1) {
    return (neg ? '-' : '') + num + ' B';
  }
  var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
  num = Number((num / Math.pow(1000, exponent)).toFixed(2));
  var unit = units[exponent];
  return (neg ? '-' : '') + num + ' ' + unit;
}


// Generate array for bar/pie graph for language data 
async function languageGraphCaclulations(language_data) {
  var data_size_wise = []
  var data_count_wise = []
  var toggle=false;
  const {
    language_size_data,
    language_count_data,
    language_color_data
  } = language_data
  for (let i = 0; i < language_size_data.length; i++) {
    let language = language_size_data[i]
    toggle = !toggle;
    data_size_wise.push({
      "id": language.key + ` (${toReadableBytes(language.value)})`,
      "label": language.key,
      "value": language.value,
      "parsed": toReadableBytes(language.value), //this is human readable format // the data we'll see when hovered on chart
      "color": language_color_data[language.key],
      "style": toggle ? "lines" : "dots"
    })

    language = language_count_data[i]
    data_count_wise.push({
      "id": language.key + ` (${language.value} repos)`,
      "label": language.key,
      "value": language.value,
      "parsed": language.value + " repos", //this is human readable format // the data we'll see when hovered on chart
      "color": language_color_data[language.key],
      "style": toggle ? "lines" : "dots"
    })

  }
  var out = {
    data_size_wise,
    data_count_wise
  }
  return out;
}


// Return a simple array of objects having {repo_name:y,commits:x,forks:x,stars:x}
async function advancedRepoAnalysis(repoInfo) {
  // basic structure
  // [{repo_name:y,commits:x,forks:x,stars:x}]
  let simplified_repo_data = []
  let repoNodes = repoInfo.data.user.repositories.nodes;

  repoNodes.forEach(repo => {
    simplified_repo_data.push({
      name: repo.name,
      commits: repo.contributions ? repo.contributions.target.userCommits.totalCount : 0,
      forks: repo.forks.totalCount,
      stars: repo.stargazers.totalCount
    })
  });

  // sorted_by_commits is sorted by commits 🤷‍♂️
  let sorted_by_commits = [...simplified_repo_data] //creating a deep copy
  sorted_by_commits = sorted_by_commits.sort((a, b) => b.commits - a.commits);

  // sorted_by_popularity is sorted by popularity 🤷‍♂️
  // popularity = stars+forks
  let sorted_by_popularity = [...simplified_repo_data] //creating a deep copy
  sorted_by_popularity = sorted_by_popularity.sort((a, b) => (b.forks + b.stars) - (a.forks + a.stars));

  return {
    simplified_repo_data,
    sorted_by_commits,
    sorted_by_popularity
  }
}

// Generate array for bar/pie graph for repo related data 
async function repoBarGraphCalculation(repoInfo) {
  var data_commit_wise = []
  var data_popularity_wise = []
  var toggle=false;
  const {
    sorted_by_commits,
    sorted_by_popularity
  } = repoInfo
  for (let i = 0; i < sorted_by_commits.length; i++) {
    let repo = sorted_by_commits[i]
    toggle = !toggle;
    data_commit_wise.push({
      "id": repo.name,
      "label": repo.name,
      "commits": repo.commits,
      "parsed": repo.name +` (${repo.commits} commits)`, // the data we'll see when hovered on chart
      // color user chart default
      "style": toggle ? "lines" : "dots"
    })
    
    repo = sorted_by_popularity[i]
    data_popularity_wise.push({
      "id": repo.name,
      "label": repo.name,
      "repo": repo.name,
      "stars": repo.stars,
      "starsColor": "yellow",
      "forks": repo.forks,
      "forksColor": "purple",
      "parsed":`${repo.stars} Stars , ${repo.forks} Forks`, // the data we'll see when hovered on chart
      "style": toggle ? "lines" : "dots"
    })


  }


  var out = {
    data_commit_wise,
    data_popularity_wise
  }
  return out;


}


export default {
  getUserInfo,
  getRepositoryInfo,
  totalBasicCalculation,
  getPinnedRepo,
  languageAnalysis,
  languageGraphCaclulations,
  toReadableBytes,
  advancedRepoAnalysis,
  repoBarGraphCalculation,
  getSearchUsers
}