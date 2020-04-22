import React from "react";
import  Loader  from "../Extras/Loader"
function BasicInformation(props) {

  if (Object.keys(props.basicInfo).length === 0) {
    return Loader.section_loading
  }

  let userInfo = props.basicInfo.data.user
  let calculateData = props.aggregateData
  console.log("---: BasicInformation -> calculateData", calculateData);



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
              <h2 className="font-size-21 mb-3 ">{userInfo.name} {userInfo.isDeveloperProgramMember ? <img style={{ width: 15 }} alt="DeveloperProgramMember" src={process.env.PUBLIC_URL + "/img/official.png"} /> : ""}</h2>
              <p className="font-size-13 mb-1">{userInfo.bio}</p>
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
            <div className="d-flex follow-details justify-content-end text-right">
              <div>
                Followers
                <p className="font-size-12 mb-0 mt-1 total-badge mx-auto">
                  {userInfo.followers.totalCount}
                </p>
              </div>
              <div className="ml-5">
                <span>Following</span>
                <p className="font-size-12 mb-0 mt-1 total-badge mx-auto">
                  {userInfo.following.totalCount}
                </p>
              </div>

              <div className="ml-5">
                <span>Repository</span>
                <p className="font-size-12 mb-0 mt-1 total-badge mx-auto">
                  {userInfo.repositories.totalCount}
                </p>
              </div>
            </div>

            <ul className="p-0 m-0 list-unstyled d-flex justify-content-end font-size-12 mt-4">
              <li className="px-2">
                <span className="font-weight-bold">{calculateData.totalCommit ? calculateData.totalCommit : Loader.text_loading}</span>
                <br />
                 Commits
              </li>
              <li className="px-2">
                <span className="font-weight-bold">{calculateData.totalStar ? calculateData.totalStar : Loader.text_loading}</span>
                <br />
                Stars
              </li>
              <li className="px-2">
                <span className="font-weight-bold">{calculateData.totalFork ? calculateData.totalFork : Loader.text_loading}</span>
                <br />
                Forks
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicInformation;