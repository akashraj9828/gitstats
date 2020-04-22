import React from "react";
import Loader from "../Extras/Loader"
function BasicInformation(props) {

  if (Object.keys(props.basicInfo).length === 0) {
    return Loader.section_loading
  }

  let userInfo = props.basicInfo.data.user
  let calculateData = props.aggregateData

  return (
    <section className="pt-5 text-center">
      <div className="card p-4 rounded">
        <div className="row">
          <div className="left-image-avtar">
            <div className="member-image">
              <img src={userInfo.avatarUrl} alt={userInfo.login} />
            </div>
          </div>
          <div className="col-sm-5 text-left">
            <div className="user-details pl-2">
              <h2 className="font-size-21 mb-0">{userInfo.name} </h2>
              {userInfo.isDeveloperProgramMember ? <img style={{ width: 20 }} alt="DeveloperProgramMember" src={process.env.PUBLIC_URL + "/img/dev.png"} /> : ""}
              {userInfo.isCampusExpert ? <img style={{ width: 20 }} alt="CampusExpert" src={process.env.PUBLIC_URL + "/img/campus_expert.png"} /> : ""}
              <p className="font-size-13 mb-1 mt-3">{userInfo.bio}</p>
              <p className="font-size-13 mb-1">
                <i className="fa fa-envelope-o email" aria-hidden="true"></i>
                {userInfo.email ? userInfo.email : "No email added"}
              </p>
              <p className="font-size-13 mb-1">
                <i className="fa fa-github git-icon" aria-hidden="true"></i>
                <a className="text-dark" target="_blank" rel="noopener noreferrer" href={userInfo.url}>
                  {userInfo.login}
                </a>
              </p>
              <p className="font-size-13 mb-1">
                <i className="fa fa-map-marker git-icon" aria-hidden="true"></i>
                {userInfo.location}
              </p>
            </div>
          </div>
          <div className="col-sm-5">

            <div className="row">
              <div className="col">
                <p className="text-center m-0">
                  {userInfo.followers.totalCount}
                </p>
                Followers
              </div>
              <div className="col">
                <p className="text-center m-0">
                  {userInfo.following.totalCount}
                </p>
                <span>Following</span>
              </div>

              <div className="col">
                <p className="text-center m-0">
                  {userInfo.repositories.totalCount}
                </p>
                <span>Repository</span>
              </div>
            </div>

            <div className="row pt-3">
              <div className="col">
                <p className="text-center m-0">
                  {calculateData.totalCommit!==undefined ? calculateData.totalCommit : Loader.text_loading}
                </p>
                Commits
              </div>
              <div className="col">
                <p className="text-center m-0">
                  {calculateData.totalStar!==undefined ? calculateData.totalStar : Loader.text_loading}
                </p>
                <span>Stars</span>
              </div>

              <div className="col">
                <p className="text-center m-0">
                  {calculateData.totalFork!==undefined ? calculateData.totalFork : Loader.text_loading}
                </p>
                <span>Forks</span>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicInformation;