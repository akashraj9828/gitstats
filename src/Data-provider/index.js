import axios from "axios";
import TimeAgo from 'javascript-time-ago'
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'
import config from '../config/index'
import {
  toReadableBytes,
  sortObject,
  insertAtIndex
} from "./utils"

Object.keys(config).forEach(key => {
  window[key] = config[key];
});

TimeAgo.addLocale(en)
 
// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')

//common variables
const API_BASE_URL = window.API_BASE_URL

//Network call for Basic User Details and pinned repos
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
async function getSearchUsers(username) {
  if (username && username.length) {
    let response = await axios.get(`https://api.github.com/search/users?q=${username}`);
    return response.data.items
  }
}


//Network CALL For History of commits 
async function getCommitHistory(username) {
  let response = await axios.get(`${API_BASE_URL}history/${username}`);
  const commit_data = response.data;
  return commit_data
};


//Network CALL For User activity  
async function getUserActivity(username) {
  let response = await axios.get(`${API_BASE_URL}rss/${username}`);
  const user_activity = response.data;
  let dom = await new window.DOMParser().parseFromString(user_activity, "text/xml")
  let entries = dom.getElementsByTagName("entry")

  let parsed_data=[
  ]

  for (var i = 0; i < entries.length; i++) {
    let entry=entries[i]
    let title=entry.getElementsByTagName("title")[0].textContent
    let image=entry.getElementsByTagName("media:thumbnail")[0].getAttribute("url")
    let time=entry.getElementsByTagName("published")[0].textContent
    // for relative time
    time=timeAgo.format(new Date(time))

    let one_event={
      id:i,
      title,
      image,
      time
    }
    parsed_data.push(one_event)
  }
  return parsed_data
};





//Total Basic Calculations  totalCommit, totalStar, totalFork, totalRepo
// returns an array of key value paired sorted array of languages used
// value denotes how many bytes has been written in that language
// Profile analysis
// language analysis
// repo analysis
async function profileAnalysis(repoInfo) {

  // repoNodes = list of repository objects
  let repoNodes = repoInfo.data.user.repositories.nodes;
  // let totalCommit = 0
  let totalStar = 0
  let totalFork = 0

  // counts total size of code written in particular language
  let language_size_data = {}

  // counts in how repos language was used
  let language_count_data = {}

  // Color associated with each language
  let language_color_data = {}

  // basic structure
  // [{repo_name:y,commits:x,forks:x,stars:x}]
  let simplified_repo_data = []

  repoNodes.forEach(repo => {
    // perform basic calculation here
    // totalCommit += repo.contributions ? repo.contributions.target.userCommits.totalCount : 0;
    totalStar += repo.stargazers ? repo.stargazers.totalCount : 0;
    totalFork += repo.forks ? repo.forks.totalCount : 0;

    // Simplify repo data here
    simplified_repo_data.push({
      name: repo.name,
      commits: repo.contributions ? repo.contributions.target.userCommits.totalCount : 0,
      forks: repo.forks.totalCount,
      stars: repo.stargazers.totalCount
    })


    // language analysis here
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


  let totalRepo = repoNodes.length

  // sorted_by_commits is sorted by commits 🤷‍♂️
  let sorted_by_commits = [...simplified_repo_data] //creating a deep copy
  sorted_by_commits = sorted_by_commits.sort((a, b) => b.commits - a.commits);

  // sorted_by_popularity is sorted by popularity 🤷‍♂️
  // popularity = stars+forks
  let sorted_by_popularity = [...simplified_repo_data] //creating a deep copy
  sorted_by_popularity = sorted_by_popularity.sort((a, b) => (b.forks + b.stars) - (a.forks + a.stars));


  let calculatedData = {
    basic_calculations: {
      // total commit is calculated from history api by adding all the years data
      // added to state there too
      // totalCommit, // inaccurate // only data of last one year
      totalStar,
      totalFork,
      totalRepo
    },
    language_calculations: {
      "language_size_data": sortObject(language_size_data),
      "language_count_data": sortObject(language_count_data),
      "language_color_data": language_color_data,
      "language_size_data_unsorted": language_size_data,
      "language_count_data_unsorted": language_count_data,
    },
    repo_calculations: {
      simplified_repo_data,
      sorted_by_commits,
      sorted_by_popularity
    }
  }
  return calculatedData
}

// Generate array for bar/pie graph for language data 
async function languageGraphCaclulations(language_data) {
  var data_size_wise = []
  var data_count_wise = []
  var toggle = false;
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
  var toggle = false;
  let color_pallet = [
    "#f47560",
    "#e8c1a0",
    "#f1e15b",
    "#e8a838",
    "#61cdbb",
    "#97e3d5",
  ]
  const {
    sorted_by_commits,
    sorted_by_popularity
  } = repoInfo
  for (let i = 0; i < sorted_by_commits.length; i++) {
    let repo = sorted_by_commits[i]
    toggle = !toggle;
    data_commit_wise.push({
      "id": repo.name + ` (${repo.commits} commits)`,
      "label": repo.name,
      "commits": repo.commits,
      "value": repo.commits,
      "parsed": `${repo.commits} commits`, // the data we'll see when hovered on chart
      // color user chart default
      "color": color_pallet[i % color_pallet.length],
      "style": toggle ? "lines" : "dots"
    })

    repo = sorted_by_popularity[i]
    data_popularity_wise.push({
      "id": repo.name + ` (${repo.stars} Stars , ${repo.forks} Forks)`,
      "label": repo.name,
      "repo": repo.name,
      "stars": repo.stars,
      "color": color_pallet[i % color_pallet.length],
      "starsColor": "yellow",
      "forks": repo.forks,
      "forksColor": "purple",
      "parsed": `${repo.stars} Stars , ${repo.forks} Forks`, // the data we'll see when hovered on chart
      "style": toggle ? "lines" : "dots"
    })


  }


  var out = {
    data_commit_wise,
    data_popularity_wise
  }
  return out;


}


async function commitGraphDataDayWise(commitHistoryData) {
  // 0-6 represents monday-sunday
  // 6-sat 0-sunday
  let week_dict_full = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let week_dict_short = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"]
  // commits throughout the week_day
  let week_commit_activity = [0, 0, 0, 0, 0, 0, 0]
  // intensity throughout the week_day
  let week_intensity_activity = [0, 0, 0, 0, 0, 0, 0]

  let contributions = commitHistoryData.contributions

  contributions.forEach(element => {
    let day = new Date(element.date).getDay()
    week_commit_activity[day] += element.count
    week_intensity_activity[day] += element.intensity
  });


  let week_graph_data = []
  // to calculate color based on max val
  let max_count = Math.max(...week_commit_activity)

  let top2 = [...week_commit_activity].sort((a, b) => parseInt(b) - parseInt(a)).slice(0, 2)
  let top2days = []
  for (let i = 0; i < 7; i++) {
    const week_day = i
    if (top2.includes(week_commit_activity[week_day])) {
      const index = top2.indexOf(week_commit_activity[week_day]);
      if (index > -1) {
        top2.splice(index, 1);
        top2days=insertAtIndex(top2days,index,i)
      }
    }
    week_graph_data.push({
      "day": week_dict_short[week_day],
      "label": week_dict_short[week_day],


      "commit": week_commit_activity[week_day],
      // rgba r=30 g= calculated by (commit/max_commit*256) b=30
      "commitColor": `rgb(30,${parseInt(week_commit_activity[week_day]*.7/max_count*256)},30)`,

      "parsed": week_commit_activity[week_day] + ` (${week_commit_activity[week_day]} commits)`,
      "intensity": week_intensity_activity[week_day],
      "style": 'dots',
    })
  }

  let total_commit_all_years = commitHistoryData.years.reduce((total, element) => total + element.total, 0)


  return {
    week_dict_full,
    week_commit_activity,
    week_intensity_activity,
    week_graph_data, // this 
    total_commit_all_years, // and this is only needed ,
    top2days
  }

}


export default {
  getUserInfo,
  getRepositoryInfo,
  profileAnalysis,
  languageGraphCaclulations,
  toReadableBytes,
  advancedRepoAnalysis,
  repoBarGraphCalculation,
  getSearchUsers,
  getCommitHistory,
  commitGraphDataDayWise,
  getUserActivity
}