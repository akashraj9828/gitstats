import React, { useEffect, useState } from 'react'
import axios from "axios";

const Pinned = (props) => {
    const [repoData, setRepoData] = useState([]);
    const username = props.username ? props.username : "akashraj9828"
    const getRepoUrl = window.API_BASE_URL + "pinned/" + username
    console.log(getRepoUrl);

    const getPinnedRepo = async () => {
        let response = await axios.get(getRepoUrl);
        const pinned_data = response.data;
        console.log(pinned_data);
        setRepoData(pinned_data.data.user.pinnedRepositories.nodes);
    };


    useEffect(() => {
        getPinnedRepo();
    }, []);

    repoData.forEach(repo => {

    });

    let pinned_view = repoData.map((repo) => {
        return (
            <div key={repo.name} className="col-md-4 my-3">

                <div className="card h-100 rounded">
                    <div className="card-block py-3 px-4">
                        <h6 className="card-title text-center"> {repo.nameWithOwner}</h6>
                        <div className="row text-center mt-3">
                            <div className="col-md-4">
                                {"-"}
                                <br />
                                Commits
                            </div>
                            <div className="col-md-4">
                                {repo.forkCount}
                                <br />
                                Forks
                            </div>
                            <div className="col-md-4">
                                {repo.stargazers.totalCount}
                                <br />
                                Stars
                            </div>
                        </div>
                        <h6 className="text-center mt-3">The main langiage is <span style={{ color: repo.languages.nodes[0].color }}>{repo.languages.nodes[0].name}</span></h6>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="row">
            {repoData ? pinned_view : <h3 className="text-center p-5">Loading</h3>}
        </div>
    )


}

export default Pinned