import React from "react";
import Layout from "../Layout";
import BasicInformation from './BasicInfo'
import Repository from './Repository'
import Pinned from "./Pinned"
import DataProvider from "../../Data-provider"
import Language from "./Language";
import BarChart from "../Charts/BarChart";
import Loader from "../Extras/Loader";


class Home extends React.Component {

  constructor(props) {
    super(props)
    let username = "akashraj9828";
    try {
      username = props.match.params.username ? props.match.params.username : "akashraj9828";

    } catch (error) {
    }

    // state of entire page is managed here
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
      languageDataLoaded: false,
      languageSizeGraphData: [],
      languageSizeGraphDataLoaded: false,
      languageCountGraphData: [],
      languageCountGraphDataLoaded: false,
    }
  }

  componentDidMount() {

    // API CALL TO GET BASIC USER INFO
    DataProvider.getUserInfo(this.state.username).then((userData) => {
      this.setState({
        basicInfo: userData,
        user_id: userData.data.user.id,
        basicLoaded: true,
      })

      // API CALL TO GET ALL REPO INFO // NESTED BECAUSE USER_ID HAS DEPENDENCY ON FIRST API CALL (getUserInfo)
      DataProvider.getRepositoryInfo(this.state.username, this.state.user_id).then((repoData) => {
        this.setState({
          repoInfo: repoData,
          repoLoaded: true
        })

        // PERFORM BASIC CALCULATIONS // COMMIT COUNT // STARS COUNT // FORK COUNT // TOTAL REPO COUNT
        DataProvider.totalBasicCalculation(this.state.repoInfo).then((data) => {
          this.setState({
            aggregateData: data,
            aggregateDataLoaded: true
          })
        })

        // PERFORM LANGUAGE ANALYSIS // BY SIZE // BY REPO COUNT
        DataProvider.languageAnalysis(this.state.repoInfo).then((data) => {
          this.setState({
            languageData: data,
            languageDataLoaded: true
          })

          DataProvider.graphCaclulations(this.state.languageData).then((data) => {
            this.setState({
              languageSizeGraphData: data.data_size_wise,
              languageSizeGraphDataLoaded: true,
              languageCountGraphData: data.data_count_wise,
              languageCountGraphDataLoaded: true,
            })
            console.log("---: Home -> componentDidMount -> data", data);

          })
        })
      })
    })

    // API CALL TO GET PINNED REPOS
    DataProvider.getPinnedRepo(this.state.username).then((pinnedData) => {
      this.setState({ pinnedInfo: pinnedData, pinnedLoaded: true })
    }
    )


  }

  render() {
    return (
      <div>
        <Layout>
          {/* CONDITIONAL REDERING OF BASIC INFO */}
          {this.state.basicLoaded ? <BasicInformation basicInfo={this.state.basicInfo} aggregateData={this.state.aggregateData} /> : Loader.section_loading}
          <section className="pt-5 ">
            <div className="row">
              <div className="col-12">
              <h1 className="font-size-20 w-100">My Awesome projects</h1>
              </div>
                {/* CONDITIONAL REDERING OF PINNED REPO INFO */}
                {this.state.pinnedLoaded ? <Pinned pinnedRepos={this.state.pinnedInfo} /> : Loader.section_loading}
            </div>
          </section>
          <section className="pt-5 ">
            <div className="row">
            <div className="col-sm-6 mt-3">
                <h3 className="font-size-15 w-100">Language analysis Size wise</h3>
                {/* height:"calc( 100% - 20px ) because h3 above take 20px but i wanted card to be equal to the col-height */}
                <div className="card p-3 rounded" style={{height:"calc( 100% - 20px )"}}>
                  {/* CONDITIONAL REDERING OF LANGUAGE ANALYSYS(BY SIZE) INFO */}
                  {this.state.languageSizeGraphDataLoaded ? <BarChart data={this.state.languageSizeGraphData} height={350} max_slices={7} /> : Loader.section_loading}
                  {/* {this.state.languageDataLoaded ? <Language languageData={this.state.languageData} type="size" /> : Loader.section_loading} */}
                </div>
              </div>
              <div className="col-sm-6 mt-3">
                <h3 className="font-size-15 w-100">Language analysis Repo wise</h3>
                <div className="card p-3 rounded" style={{height:"calc( 100% - 20px )"}}>
                  {/* CONDITIONAL REDERING OF LANGUAGE ANALYSYS(BY COUNT) INFO */}
                  {this.state.languageCountGraphDataLoaded ? <BarChart data={this.state.languageCountGraphData} height={350} max_slices={7} /> : Loader.section_loading}
                  {/* {this.state.languageDataLoaded ? <Language languageData={this.state.languageData} type="count" /> : Loader.section_loading} */}
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

// REPO VIEW 
// <div className="col-sm-6 mt-3">
// <h3 className="font-size-15">Repository Details</h3>
// <div className="card p-3 rounded" style={{height:"calc( 100% - 20px )"}}>
//   {/* CONDITIONAL REDERING OF REPOSITORY INFO */}
//   {/* {this.state.aggregateDataLoaded ? <Repository repoData={this.state.aggregateData} /> : Loader.section_loading} */}
// </div>
// </div>