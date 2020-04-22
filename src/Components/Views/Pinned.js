import React from 'react'

const Pinned = (props) => {


    const repoData = props.pinnedRepos.data.user.pinnedRepositories.nodes
    //HTML VIEW JSX DATA BIND
    let pinned_view = repoData.map((repo) =>
        <div key={repo.name} className="col-md-4 my-3">
            <div className="card h-100 rounded">
                <div className="card-block py-3 px-4">
                    <h6 className="card-title text-center"> {repo.nameWithOwner}</h6>
                    <div className="row text-center mt-3">
                        <div className="col-md-4">
                            {repo.defaultBranchRef.target.history.totalCount}
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
                    <h6 className="text-center mt-3">The main language is <span style={{ color: repo.languages.nodes[0].color}}>{repo.languages.nodes[0].name}</span></h6>
                </div>
            </div>
        </div>
    )
    return (
        <div className="row">
            {repoData.length>0 ? pinned_view : <h3 className="text-center p-5"> No pinned repos :/ </h3>}
        </div>
    )
}

export default Pinned