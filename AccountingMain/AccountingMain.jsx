import React, { useEffect } from "react";
import accountingImg from "assets/fi_2830543.png";
import mileageImg from "assets/Group 1000004221.png";
import paymentsImg from "assets/fi_2845647.png";
import { Link } from "react-router-dom";
import UserPermission from "libs/UserPermission";

const AccountingMain = () => {
  const { FetchUserRole, role, ROLE } = UserPermission()
  useEffect(() => {
    FetchUserRole()
  }, [])
  return (
    <>
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="contact-page-title my-4">Please Select Accounting</p>
          </div>
        </div>
        <div className="row justify-content-center p-4">
          {
            localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.accounting.view ?
              <div className="col-md-4">
                <div className="card contact-page-card-main h-100">
                  <Link to="/all-accounts">
                    <div className="card-body p-4">
                      <img
                        src={accountingImg}
                        alt=""
                        className="d-block mx-auto mb-3 contact-page-card-img"
                      />
                      <p className="text-center contact-page-sub-title">
                        Accounting
                      </p>
                      <p className="contact-page-sub-text text-center mb-0">
                        The point of using Lorem Ipsum is that it has a more
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
              :
              localStorage.getItem("role") === "landlord" ?
                <div className="col-md-4">
                  <div className="card contact-page-card-main h-100">
                    <Link to="/all-accounts">
                      <div className="card-body p-4">
                        <img
                          src={accountingImg}
                          alt=""
                          className="d-block mx-auto mb-3 contact-page-card-img"
                        />
                        <p className="text-center contact-page-sub-title">
                          Accounting
                        </p>
                        <p className="contact-page-sub-text text-center mb-0">
                          The point of using Lorem Ipsum is that it has a more
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                : ""
          }
          {
            localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.mileage.view ?
              <div className="col-md-4">
                <div className="card contact-page-card-main h-100">
                  <Link to="/mileage">
                    <div className="card-body p-4">
                      <img
                        src={mileageImg}
                        alt=""
                        className="d-block mx-auto mb-3 contact-page-card-img"
                      />
                      <p className="text-center contact-page-sub-title">Mileage</p>
                      <p className="contact-page-sub-text text-center mb-0">
                        The point of using Lorem Ipsum is that it has a more
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
              :
              localStorage.getItem("role") === "landlord" ?
                <div className="col-md-4">
                  <div className="card contact-page-card-main h-100">
                    <Link to="/mileage">
                      <div className="card-body p-4">
                        <img
                          src={mileageImg}
                          alt=""
                          className="d-block mx-auto mb-3 contact-page-card-img"
                        />
                        <p className="text-center contact-page-sub-title">Mileage</p>
                        <p className="contact-page-sub-text text-center mb-0">
                          The point of using Lorem Ipsum is that it has a more
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
                : ""
          }


        </div>
        <div className="row justify-content-center p-4">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="card contact-page-card-main h-100">
              <Link to="/payment">
                <div className="card-body p-4">
                  <img
                    src={paymentsImg}
                    alt=""
                    className="d-block mx-auto mb-3 contact-page-card-img"
                  />
                  <p className="text-center contact-page-sub-title">Payments</p>
                  <p className="contact-page-sub-text text-center mb-0">
                    The point of using Lorem Ipsum is that it has a more
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default AccountingMain;
