import React from "react";
import Layout from "../Layout/Layout";
import BasicInformation from './BasicInfo-view'
import Repository from './Repository-view'

const Home = (props) => {
  return (
    <Layout>
      <BasicInformation username={props.match.params.username}/>
      <section className="pt-5 pb-5">
        <div className="row">
            <div className="col-sm-4">
              <h3 className="font-size-15">Most Active</h3>
              <div className="card p-3">
              <Repository/>
              </div>
            </div>

            <div className="col-sm-4">
            <h3 className="font-size-15">Technologies</h3>
              <div className="card p-3">
              <img src="https://next3-assets.s3.amazonaws.com/activities/1321/backgrounds-1495419125-graphs_a4_72dpi.gif" alt=""/>

              </div>
            </div>

            <div className="col-sm-4">
            <h3 className="font-size-15">Most Used Lanauage</h3>
              <div className="card p-3">
              <img src="https://next3-assets.s3.amazonaws.com/activities/1321/backgrounds-1495419125-graphs_a4_72dpi.gif" alt=""/>
              </div>
            </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
