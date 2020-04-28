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
          <div className="col-md-2 text-left">
            {/* <div className="left-image-avtar"> */}
            {/* <div className="member-image"> */}
            <img className="img-fluid img" style={{ minWidth: 130, maxWidth: 150, height: "auto" }} src={userInfo.avatarUrl} alt={userInfo.login} />
            {/* </div> */}
            {/* </div> */}
          </div>
          <div className="col-md-5 text-left">
            <div className="user-details pl-2">
              <h2 className="font-size-21 mb-0 mt-3 mt-lg-0 mt-sm-0">{userInfo.name} </h2>
              {userInfo.isDeveloperProgramMember && <img className="mr-2" style={{ width: 20 }} alt="DeveloperProgramMember" src={process.env.PUBLIC_URL + "/img/dev.png"} />}
              {userInfo.isCampusExpert && <img className="mr-2" style={{ width: 20 }} alt="CampusExpert" src={process.env.PUBLIC_URL + "/img/campus_expert.png"} />}
              {userInfo.bio && <p className="font-size-13 mb-1 mt-3">{userInfo.bio}</p>}
              {userInfo.email && <p className="font-size-13 mb-1">
                <i className="fa fa-envelope-o email" aria-hidden="true"></i>
                <a className="text-dark hover-white" target="_blank" rel="noopener noreferrer" href={`maillto:${userInfo.email}`}>
                  {userInfo.email}
                  {/* {userInfo.login} */}
                </a>
              </p>
              }
              {userInfo.login && <p className="font-size-13 mb-1">
                <i className="fa fa-github git-icon" aria-hidden="true"></i>
                <a className="text-dark hover-white" target="_blank" rel="noopener noreferrer" href={userInfo.url}>
                  {userInfo.login}
                </a>
              </p>
              }
              {userInfo.location && <p className="font-size-13 mb-1">
                <i className="fa fa-map-marker git-icon" aria-hidden="true"></i>
                {userInfo.location}
              </p>
              }
              {userInfo.websiteUrl && <p className="font-size-13 mb-1">
                <i className="fa fa-globe git-icon" aria-hidden="true"></i>
                <a className="text-dark hover-white" href={(userInfo.websiteUrl.indexOf('://') === -1) ? 'http://' + userInfo.websiteUrl  : userInfo.websiteUrl} target="_blank" rel="noopener noreferrer">
                  {userInfo.websiteUrl}
                </a>
              </p>
              }
            </div>
          </div>
          <div className="col-md-5 mt-4 mt-lg-0 mt-sm-0 following-area">

            <div className="row">
              <div className="col-4">
                <p className="text-center m-0">
                  {userInfo.followers.totalCount}
                </p>
                <span>Followers</span>
              </div>
              <div className="col-4">
                <p className="text-center m-0">
                  {userInfo.following.totalCount}
                </p>
                <span>Following</span>
              </div>

              <div className="col-4">
                <p className="text-center m-0">
                  {userInfo.repositories.totalCount}
                </p>
                <span>Repository</span>
              </div>
            </div>

            <div className="row pt-3">
              <div className="col-4">
                <p className="text-center m-0">
                  {calculateData.totalCommit ? calculateData.totalCommit : Loader.text_loading}
                </p>
                <span>Commits</span>
              </div>
              <div className="col-4">
                <p className="text-center m-0">
                  {calculateData.totalStar ? calculateData.totalStar : Loader.text_loading}
                </p>
                <span>Stars</span>
              </div>

              <div className="col-4">
                <p className="text-center m-0">
                  {calculateData.totalFork ? calculateData.totalFork : Loader.text_loading}
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