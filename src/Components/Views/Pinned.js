import React, { Fragment } from 'react'

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
                    <h6 className="text-center mt-3">The main language is <span style={{ color: repo.languages.nodes[0].color }}>{repo.languages.nodes[0].name}</span></h6>
                </div>
            </div>
        </div>
    )

    let no_repo_msg= <div className="col-sm-12">
    <div className="" style={{
        flexDirection: "row",
        textAlign: "center",
        alignItems: "center"
    }}>

        <h6 className="mt-3 w-100 text-left">
            <span style={{ color: "gray" }}>No pinned repos to analyze ☹️☹️  </span>
        </h6>
    </div>
    </div>

    return (
        <Fragment>
            {repoData.length > 0 ? pinned_view : no_repo_msg}
        </Fragment>
    )
}

export default Pinned