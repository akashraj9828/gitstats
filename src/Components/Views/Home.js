import React, { Fragment } from "react";
import Layout from "../Layout";
import BasicInformation from "./BasicInfo";
import Pinned from "./Pinned";
import DataProvider from "../../Data-provider";
import PieChart from "../Charts/PieChart";
import BarChart from "../Charts/BarChart";
import Loader from "../Extras/Loader";
import Footer from "../Footer";
import Share from './Share'
import Header from '../Header'

class Home extends React.Component {
  constructor(props) {
    super(props);
    let username = "akashraj9828";
    try {
      username = props.match.params.username
        ? props.match.params.username
        : "akashraj9828";
    } catch (error) { }

    // state of entire page is managed here
    this.state = {
      username: username,
      user_id: "", //userid
      basicInfo: {}, //basic info // name // email // followers //following ,etc
      pinnedInfo: {}, //pinned repos
      repoInfo: {}, // all repos upto 100
      aggregateData: {}, // total commits// total stars// total forks
      languageData: {}, // lanuage size wise data// language count wise data/ language color data
      repoAnalysisData: {}, // [{repo_name:y,commits:x,forks:x,stars:x}] array of repos simplified
      basicLoaded: false,
      repoLoaded: false,
      pinnedLoaded: false,
      aggregateDataLoaded: false,
      repoAnalysisDataLoaded: false,
      languageDataLoaded: false,
      languageGraphDataSize: [], //language data size wise for pie chart
      languageGraphDataSizeLoaded: false,
      languageGraphDataCount: [], //language data repo count wise for pie chart
      languageGraphDataCountLoaded: false,
      repoGraphDataCommitWise: [], //repo data commit wise for pie chart
      repoGraphDataCommitWiseLoaded: false,
      repoGraphDataPopularityWise: [], //language data populatiry wise for bar graph chart
      repoGraphDataPopularityWiseLoaded: false,
      commitHistoryData: [], //commit data for all years day wise
      commitHistoryDataLoaded: false,
      commitHistoryGraphData: [], //commit data accumulated for each day of week [monday,tuesday,...sunday] from all times
      commitHistoryGraphDataLoaded: false,
      initialPageLoad: Loader.section_loading, //For loading application at first time
    };
  }

  componentDidMount() {
    // API CALL TO GET BASIC USER INFO
    // PINNED REPOS merged into this api as well.
    // Reduces api call from 3 to 2

    DataProvider.getUserInfo(this.state.username).then((userData) => {
      if (userData.errors) {
        this.setState({
          initialPageLoad: Loader.user_not_found,
        });
        return;
      }
      document.title = userData.data.user.name + " | GitStats"
      this.setState({
        basicInfo: userData,
        user_id: userData.data.user.id,
        basicLoaded: true,
        pinnedInfo: userData, //  few extra data is stored here but no worries
        pinnedLoaded: true
      });
      

      // API CALL TO GET ALL REPO INFO // NESTED BECAUSE USER_ID HAS DEPENDENCY ON FIRST API CALL (getUserInfo)
      DataProvider.getRepositoryInfo(
        this.state.username,
        this.state.user_id
      ).then((repoData) => {
        this.setState({
          repoInfo: repoData,
          repoLoaded: true,
        });

        // PERFORM BASIC CALCULATIONS and LANGUAGE ANALYSIS  and REPO CALCULATIONS
        // Basic calculations: COMMIT COUNT // STARS COUNT // FORK COUNT // TOTAL REPO COUNT //
        // Language calculations: size data // repo count by language data // language color data // 
        // Repo calculations: // COMMITS PER REPO // STARS and FORKS PER REPO

        DataProvider.profileAnalysis(this.state.repoInfo).then((data) => {
          this.setState({
            aggregateData:data.basic_calculations,
            aggregateDataLoaded: true,
            languageData: data.language_calculations,
            languageDataLoaded: true,
            repoAnalysisData: data.repo_calculations,
            repoAnalysisDataLoaded: true,
          }, () => {
            // API CALL TO GET COMMIT HISTORY OF ALL TIMES
            DataProvider.getCommitHistory(this.state.username).then((commitData) => {
              this.setState({ commitHistoryData: commitData, commitHistoryDataLoaded: true });
              DataProvider.commitGraphDataDayWise(commitData).then((data) => {
                this.setState({
                  commitHistoryGraphData: data.week_graph_data,
                  commitHistoryGraphDataLoaded: true,
                  aggregateData:{...this.state.aggregateData,totalCommit:data.total_commit_all_years},
                  top2days:data.top2days

                })
              })
            });

          });

          // Language Graph Calculations
          DataProvider.languageGraphCaclulations(this.state.languageData, this.state.repoAnalysisData).then(
            (data) => {
              this.setState({
                languageGraphDataSize: data.data_size_wise,
                languageGraphDataSizeLoaded: true,
                languageGraphDataCount: data.data_count_wise,
                languageGraphDataCountLoaded: true,
              });
            });

          // Repo graph Calculations
          // PERFORM Advanced REPO ANALYSIS // COMMITED PER REPO // STARS and FORKS PER REPO
          // Repo info: 
          DataProvider.repoBarGraphCalculation(
            this.state.repoAnalysisData
          ).then((data) => {
            this.setState({
              repoGraphDataCommitWise: data.data_commit_wise,
              repoGraphDataCommitWiseLoaded: true,
              repoGraphDataPopularityWise: data.data_popularity_wise,
              repoGraphDataPopularityWiseLoaded: true,
            });
          });
        });
      });


    });
  }

  render() {
    return (


      <div>
        <Header />
        <Layout>
          {this.state.basicLoaded && this.state.basicInfo ? <div>
            <Share data={this.state.basicInfo}/>
            {/* CONDITIONAL REDERING OF BASIC INFO */}
            {this.state.basicLoaded ? <BasicInformation basicInfo={this.state.basicInfo} aggregateData={this.state.aggregateData} /> : Loader.section_loading}

            {/* LANGUAGE SECTION */}
            <section className="pt-5 ">
              <div className="row">
                <div className="col-sm-6 mt-3">
                  <h3 className="font-size-15 w-100">Language analysis Size wise</h3>
                  {/* height:"calc( 100% - 20px ) because h3 above take 20px but i wanted card to be equal to the col-height */}
                  <div className="card p-3 rounded" style={{ height: "calc( 100% - 20px )" }}>
                    {/* CONDITIONAL REDERING OF LANGUAGE ANALYSYS(BY SIZE) INFO */}
                    {this.state.languageGraphDataSizeLoaded ?
                      <Fragment>
                        <PieChart data={this.state.languageGraphDataSize} height={250} max_slices={6} accumulate_remaining={true} />
                        {/* Extra info about pie chart */}
                        <div>
                          <h6 className="text-center mt-3">
                            {this.state.languageGraphDataSize[0] && <Fragment> Most written language is <span style={{ color: this.state.languageGraphDataSize[0].color }}> {this.state.languageGraphDataSize[0].id} </span></Fragment>}
                            {this.state.languageGraphDataSize[1] && <Fragment> followed by <span style={{ color: this.state.languageGraphDataSize[1].color }}> {this.state.languageGraphDataSize[1].id} </span></Fragment>}
                            {this.state.languageGraphDataSize[2] && <Fragment> & <span style={{ color: this.state.languageGraphDataSize[2].color }}> {this.state.languageGraphDataSize[2].id} </span></Fragment>}
                          </h6>
                        </div>
                      </Fragment>
                      : Loader.section_loading}
                    {/* {this.state.languageDataLoaded ? <Language languageData={this.state.languageData} type="size" /> : Loader.section_loading} */}
                  </div>
                </div>
                <div className="col-sm-6 mt-3">
                  <h3 className="font-size-15 w-100">Language analysis Repo wise</h3>
                  <div className="card p-3 rounded" style={{ height: "calc( 100% - 20px )" }}>
                    {/* CONDITIONAL REDERING OF LANGUAGE ANALYSYS(BY COUNT) INFO */}
                    {this.state.languageGraphDataCountLoaded ?
                      <Fragment>
                        <PieChart data={this.state.languageGraphDataCount} height={250} max_slices={6} />
                        {/* Extra info about pie chart */}
                        <div>
                          <h6 className="text-center mt-3">
                            {this.state.languageGraphDataCount[0] && <Fragment> Most Used language is <span style={{ color: this.state.languageGraphDataCount[0].color }}> {this.state.languageGraphDataCount[0].id} </span></Fragment>}
                            {this.state.languageGraphDataCount[1] && <Fragment> followed by <span style={{ color: this.state.languageGraphDataCount[1].color }}> {this.state.languageGraphDataCount[1].id} </span></Fragment>}
                            {this.state.languageGraphDataCount[2] && <Fragment> & <span style={{ color: this.state.languageGraphDataCount[2].color }}> {this.state.languageGraphDataCount[2].id} </span></Fragment>}
                          </h6>
                        </div>
                      </Fragment>
                      : Loader.section_loading}
                    {/* {this.state.languageDataLoaded ? <Language languageData={this.state.languageData} type="count" /> : Loader.section_loading} */}
                  </div>
                </div>
              </div>
            </section>

            {/* PINNED SECTION */}
            <section className="pt-5 ">
              <div className="row">
                <div className="col-12">
                  <h1 className="font-size-20 w-100">My Awesome projects</h1>
                </div>
                {/* CONDITIONAL REDERING OF PINNED REPO INFO */}
                {this.state.pinnedLoaded ? <Pinned pinnedRepos={this.state.pinnedInfo} /> : Loader.section_loading}
              </div>
            </section>


            {/* REPO SECTION */}
            <section className="pt-5 ">
              <div className="row">
                <div className="col-sm-6 mt-3">
                  <h3 className="font-size-15 w-100">Commit analysis</h3>
                  <div className="card p-3 rounded" style={{ height: "calc( 100% - 20px )" }}>
                    {/* CONDITIONAL REDERING OF COMMIT ANALYSYS(repo wise) INFO */}
                    {this.state.repoGraphDataCommitWiseLoaded ?
                      <Fragment>
                        <PieChart data={this.state.repoGraphDataCommitWise} height={250} max_slices={10} />
                        {/* Extra info about pie chart */}
                        <div>
                          <h6 className="text-center mt-3">
                            {this.state.repoGraphDataCommitWise[0] && <Fragment> Most Commits are done in <span style={{ color: this.state.repoGraphDataCommitWise[0].color }}> {this.state.repoGraphDataCommitWise[0].id} </span></Fragment>}
                          </h6>
                        </div>
                      </Fragment>
                      : Loader.section_loading}
                  </div>
                </div>
                <div className="col-sm-6 mt-3">
                  <h3 className="font-size-15 w-100">My Recent activity</h3>
                  <div className="card p-3 rounded" style={{ height: "calc( 100% - 20px )" }} >
                    {/*Will show 30 recent activity by user */}
                    {Loader.section_loading}

                  </div>
                </div>


              </div>
            </section>

            <section className="pt-5">
              <div className="row">
                <div className="col-sm-12 mt-3">
                  <h3 className="font-size-15 w-100">When am I most productive?</h3>
                  <div className="card p-3 rounded" style={{ height: "calc( 100% - 20px )" }} >
                    {/* CONDITIONAL REDERING OF WEEK DAY ACTIVITY */}
                    {this.state.commitHistoryDataLoaded ?
                      <Fragment>
                        {this.state.commitHistoryDataLoaded ? <BarChart data={this.state.commitHistoryGraphData} height={250} max_bars={7} keys={["commit"]} indexBy={"day"} /> : Loader.section_loading}
                        {/* Extra info about Week days chart */}
                        <div>
                          <h6 className="text-center mt-3">
                            {this.state.commitHistoryGraphData[0] && <Fragment> I am most productive on <span style={{ color: this.state.commitHistoryGraphData[this.state.top2days[0]].commitColor }}> {this.state.commitHistoryGraphData[this.state.top2days[0]].day} </span> and <span style={{ color: this.state.commitHistoryGraphData[this.state.top2days[1]].commitColor }}> {this.state.commitHistoryGraphData[this.state.top2days[1]].day} </span> </Fragment>}
                          </h6>
                        </div>
                      </Fragment>
                      : Loader.section_loading}

                  </div>
                </div>

              </div>
            </section>
          </div> : this.state.initialPageLoad}
        </Layout>
        <Footer />

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
