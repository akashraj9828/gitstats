import React, { useEffect, useState } from 'react'
import sharedData from '../../Shared-data/Data-Shared'

const Repository = () => {
const [repoDdata, setRepoData] = useState([]);

useEffect(() => {
  const getRepoInfoMethod = async () => {
    let responce = await sharedData.totalBasicCalculation();
    setRepoData(responce)
  }
  getRepoInfoMethod();
}, []);


return  (
  <div>
    <p>total commit : {repoDdata && repoDdata.totalcommit}</p>
    <p>total Stargazer {repoDdata && repoDdata.stargazer}</p>
    {/* <p>total fork {repoDdata['totalFork'] && repoDdata['totalFork'].length}</p> */}
    <p>total repo : {repoDdata && repoDdata.totalrepo}</p>
  </div>
)
}

export default Repository