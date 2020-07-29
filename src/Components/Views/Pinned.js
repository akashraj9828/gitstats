import React, { Fragment } from "react";
import { GoRepoForked as ForkIcon, GoGitCommit as CommitIcon, GoStar as StarIcon } from "react-icons/go";
const Pinned = (props) => {
	// deprecated api
	// const repoData = props.pinnedRepos.data.user.pinnedRepositories.nodes

	let repoData = props.pinnedRepos.data.user.itemShowcase.items.nodes;
	// filter all empty repos // empty repos are returned when pinned item is a gist
	repoData = repoData.filter((obj) => Object.keys(obj).length !== 0 && obj.constructor);
	//HTML VIEW JSX DATA BIND
	let pinned_view = repoData.map((repo) => (
		<div key={repo.name} className='col-12 col-sm-6 col-md-4 my-3'>
			<div className='card h-100 rounded'>
				<div className='card-block py-3 px-4'>
					<h6 className='card-title text-center'>
						<a className='pinned-repo-links' href={"http://github.com/" + repo.nameWithOwner} target='_blank' rel='noopener noreferrer'>
							{repo.nameWithOwner || "---"}
						</a>
					</h6>
					<div className='row text-center mt-3'>
						<div className='col-md-4 col-4'>
							<span className='mob-font-size-13 pinned-meta'>{(repo.defaultBranchRef && repo.defaultBranchRef.target.history.totalCount) || 0}</span>
							<br />
							<a className='mob-font-size-13 pinned-meta' href={"http://github.com/" + repo.nameWithOwner + "/commits"} target='_blank' rel='noopener noreferrer'>
								{" "}
								<CommitIcon className='mr-1' /> Commits{" "}
							</a>
						</div>
						<div className='col-md-4 col-4'>
							<span className='mob-font-size-13 pinned-meta'>{repo.forkCount || 0}</span>
							<br />
							<a className='mob-font-size-13 pinned-meta' href={"http://github.com/" + repo.nameWithOwner + "/network/members"} target='_blank' rel='noopener noreferrer'>
								{" "}
								<ForkIcon className='mr-1' /> Forks{" "}
							</a>
						</div>
						<div className='col-md-4 col-4'>
							<span className='mob-font-size-13 pinned-meta'>{(repo.stargazers && repo.stargazers.totalCount) || 0}</span>
							<br />
							<a className='mob-font-size-13 pinned-meta' href={"http://github.com/" + repo.nameWithOwner + "/stargazers"} target='_blank' rel='noopener noreferrer'>
								{" "}
								<StarIcon className='mr-1' /> Stars
							</a>
						</div>
					</div>
					<h6 className='text-center mt-3'>
						{repo.languages && repo.languages.nodes.length > 0 ? (
							<Fragment>
								The main language is <span style={{ color: repo.languages.nodes[0].color || "grey" }}>{repo.languages.nodes[0].name || "---"}</span>
							</Fragment>
						) : (
							<Fragment>No main language found </Fragment>
						)}
					</h6>
				</div>
			</div>
		</div>
	));

	let no_repo_msg = (
		<div className='col-sm-12'>
			<div
				className=''
				style={{
					flexDirection: "row",
					textAlign: "center",
					alignItems: "center",
				}}>
				<h6 className='mt-3 w-100 text-left'>
					<span style={{ color: "gray" }}>
						No pinned repos to analyze{" "}
						<span role='img' aria-label='sad-face'>
							☹️☹️
						</span>
					</span>
				</h6>
			</div>
		</div>
	);

	return <Fragment>{repoData.length > 0 ? pinned_view : no_repo_msg}</Fragment>;
};

export default Pinned;
