import React from "react";
import Layout from "../Layout/Layout";

const Home = () => {
  return (
    <Layout>
      <section className="pt-5">
        <div className="card p-4">
          <div className="row">
            <div className="left-image-avtar">
              <div className="member-image">
                <img src={process.env.PUBLIC_URL + "/img/member.png"} />
              </div>
            </div>
            <div className="col-sm-5">
              <div className="user-details pl-2">
                <h2 className="font-size-21 mb-3 ">Amir Sohel</h2>
                <p className="font-size-13 mb-1">
                  Talk is cheap ! Show me the code
                </p>
                <p className="font-size-13 mb-1">
                  <i class="fa fa-envelope-o email" aria-hidden="true"></i>
                  Amirsohel27@gmail.com
                </p>
                <p className="font-size-13">
                  <i class="fa fa-github git-icon" aria-hidden="true"></i>
                  amirSohel.007
                </p>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="d-flex follow-details justify-content-end text-right">
                <div>
                  <button type="button" className="btn btn-primary">
                    Fllowers
                    <img src={process.env.PUBLIC_URL + "/img/octocat.png"} />
                  </button>
                  <p className="font-size-12 mb-0 mt-1">1,429</p>
                </div>
                <div className="ml-5">
                  <button type="button" className="btn btn-primary outline">
                    <span>Fllowing</span>
                    <img src={process.env.PUBLIC_URL + "/img/octocat.png"} />
                  </button>
                  <p className="font-size-12 mb-0 mt-1">3,323,90</p>
                </div>
              </div>
              <ul className="p-0 m-0 list-unstyled d-flex justify-content-end font-size-12 mt-4">
                <li className="mr-3"> <i style={{color: "#40b14e"}} class="fa fa-bookmark" aria-hidden="true"></i> Total Repo : <span className="font-weight-bold">233</span></li>
                <li className="mr-3"><i style={{color: "#FF9800"}} class="fa fa-comment" aria-hidden="true"></i> Total Commit : <span className="font-weight-bold">973</span></li>
                <li><i style={{color: "#00BCD4"}} class="fa fa-star" aria-hidden="true"></i> Total Star : <span className="font-weight-bold">23</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-5 pb-5">
        <div className="row">
            <div className="col-sm-4">
              <h3 className="font-size-15">Most Active</h3>
              <div className="card p-3">
              <img src="https://next3-assets.s3.amazonaws.com/activities/1321/backgrounds-1495419125-graphs_a4_72dpi.gif"/>
              </div>
            </div>

            <div className="col-sm-4">
            <h3 className="font-size-15">Technologies</h3>
              <div className="card p-3">
              <img src="https://next3-assets.s3.amazonaws.com/activities/1321/backgrounds-1495419125-graphs_a4_72dpi.gif"/>

              </div>
            </div>

            <div className="col-sm-4">
            <h3 className="font-size-15">Most Used Lanauage</h3>
              <div className="card p-3">
              <img src="https://next3-assets.s3.amazonaws.com/activities/1321/backgrounds-1495419125-graphs_a4_72dpi.gif"/>
              </div>
            </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
