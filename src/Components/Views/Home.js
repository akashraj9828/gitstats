import React from "react";
import Layout from "../Layout";
import BasicInformation from './BasicInfo'
import Repository from './Repository'
import Pinned from "./Pinned"
import DataProvider from "../../Data-provider"
import Language from "./Language";


class Home extends React.Component {

  constructor(props) {
    super(props)
    let username = "akashraj9828";
    try {
      username = props.match.params.username

    } catch (error) {
    }

    this.state = {
      username: username,
      user_id: "",
      basicInfo: {},
      pinnedInfo: {},
      repoInfo: {},
      aggregateData: {},
      languageData: {},
      basicLoaded: false,
      repoLoaded: false,
      pinnedLoaded: false,
      aggregateDataLoaded: false,
      languageDataLoaded: false
    }
  }

  // functions passed in this dont block the main thread
  // use it for calculation and stuff
  async doThisAsync(fun) {
    if (typeof (fun) === "function") {
      fun()
    } else {

    }
  }
  componentDidMount() {
    DataProvider.getUserInfo(this.state.username).then((userData) => {
      this.setState({
        basicInfo: userData,
        user_id: userData.data.user.id,
        basicLoaded: true,
      })

      DataProvider.getRepositoryInfo(this.state.username, this.state.user_id).then((repoData) => {
        this.setState({
          repoInfo: repoData,
          repoLoaded: true
        })

        DataProvider.totalBasicCalculation(this.state.repoInfo).then((data) => {
          this.setState({
            aggregateData: data,
            aggregateDataLoaded: true
          })
        })

        DataProvider.languageAnalysis(this.state.repoInfo).then((data) => {

          this.setState({
            languageData: data,
            languageDataLoaded: true
          })
        })


      })


    })

    DataProvider.getPinnedRepo(this.state.username).then((pinnedData) => {
      this.setState({ pinnedInfo: pinnedData, pinnedLoaded: true })
    }
    )


  }

  render() {
    return (
      <div>
        <Layout>

          {this.state.basicLoaded ? <BasicInformation basicInfo={this.state.basicInfo} aggregateData={this.state.aggregateData} /> : "loading..."}
          <section className="pt-5 pb-5">
            <div className="">
              <h1 className="font-size-20">My Awesome projects</h1>
              <div className="">
                {this.state.pinnedLoaded ? <Pinned pinnedRepos={this.state.pinnedInfo} /> : "loading..."}

              </div>
            </div>
          </section>
          <section className="pt-5 pb-5">
            <div className="row">
              <div className="col-sm-4">
                <h3 className="font-size-15">Repository Details</h3>
                <div className="card p-3">
                  {this.state.aggregateDataLoaded ? <Repository repoData={this.state.aggregateData} /> : "loading..."}
                </div>
              </div>
              <div className="col-sm-4">
                <h3 className="font-size-15">Language analysis Repo wise</h3>
                <div className="card p-3">
                  {this.state.languageDataLoaded ? <Language languageData={this.state.languageData} type="count" /> : "loading..."}
                </div>
              </div>
              <div className="col-sm-4">
                <h3 className="font-size-15">Language analysis Size wise</h3>
                <div className="card p-3">
                  {this.state.languageDataLoaded ? <Language languageData={this.state.languageData} type="size" /> : "loading..."}
                </div>
              </div>
            </div>
          </section>
        </Layout>

      </div>
    );
  }
}

export default Home;


