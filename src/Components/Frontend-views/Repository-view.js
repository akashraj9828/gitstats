import React, { useEffect, useState } from 'react'
import axios from "axios";

const Repository = () => {
const [repoDdata, setRepoData] = useState([]);

const getRepoUrl = window.API_BASE_URL+"repos/akashraj9828/MDQ6VXNlcjI5Nzk2Nzg1"
  const getUserInfo = async () => {
    let response = await axios.get(getRepoUrl);
    const repository_data = response.data;
    setRepoData(repository_data.data.user.repositories);
  };


  useEffect(() => {
    getUserInfo();
      //total count
  }, []);

return(
<div>
    <h3>Repository Details</h3>
</div>

)


}

export default Repository