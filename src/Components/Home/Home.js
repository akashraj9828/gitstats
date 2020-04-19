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
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
