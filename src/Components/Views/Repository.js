import React from 'react'

const Repository = (props) => {
  const repoData=props.repoData 
  return (
    <div>
      <p>total commit : {repoData && repoData.totalCommit}</p>
      <p>total Stargazer {repoData && repoData.totalStar}</p>
      <p>total fork {repoData.totalFork}</p>
      <p>total repo : {repoData.totalRepo}</p>
    </div>
  )
}

export default Repository