import tenantImg from "assets/fi_11608240.png";
import prospectImg from "assets/prospects.png";
import vendorImg from "assets/fi_12371498.png";
import serviceProfessionalImg from "assets/service-professional.png";
import { Link } from "react-router-dom";
import UserPermission from "libs/UserPermission";
import { useEffect } from "react";

const Contacts = () => {
  const { FetchUserRole, role, ROLE } = UserPermission()
  useEffect(() => {
    FetchUserRole()
  }, [])
  return (
    <>
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-md-12 text-center">
            <p className="contact-page-title my-4">Please Select Contacts</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4 m-3">
            {
              localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.prospects.view ?
                <>
                  <div className="card contact-page-card-main">
                    <Link to="/all-prospect">
                      <div className="card-body p-4">
                        <img
                          src={prospectImg}
                          alt=""
                          className="d-block mx-auto mb-3 contact-page-card-img"
                        />
                        <p className="text-center contact-page-sub-title">
                          Prospects
                        </p>
                        <p className="contact-page-sub-text text-center mb-0">
                          The point of using Lorem Ipsum is that it has a more
                        </p>
                      </div>
                    </Link>
                  </div>
                </>
                :
                localStorage.getItem("role") === "landlord" ?

                  <>
                    <div className="card contact-page-card-main">
                      <Link to="/all-prospect">
                        <div className="card-body p-4">
                          <img
                            src={prospectImg}
                            alt=""
                            className="d-block mx-auto mb-3 contact-page-card-img"
                          />
                          <p className="text-center contact-page-sub-title">
                            Prospects
                          </p>
                          <p className="contact-page-sub-text text-center mb-0">
                            The point of using Lorem Ipsum is that it has a more
                          </p>
                        </div>
                      </Link>
                    </div>
                  </>
                  : ""
            }

          </div>
          <div className="col-md-4 m-3">
            {
              localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.tenants.view ?
                <>
                  <div className="card contact-page-card-main">
                    <Link to="/all-tenants">
                      <div className="card-body p-4">
                        <img
                          src={tenantImg}
                          alt=""
                          className="d-block mx-auto mb-3 contact-page-card-img"
                        />
                        <p className="text-center contact-page-sub-title">Tenants</p>
                        <p className="contact-page-sub-text text-center mb-0">
                          The point of using Lorem Ipsum is that it has a more
                        </p>
                      </div>
                    </Link>
                  </div>
                </>
                :
                localStorage.getItem("role") === "landlord" ?
                  <>
                    <div className="card contact-page-card-main">
                      <Link to="/all-tenants">
                        <div className="card-body p-4">
                          <img
                            src={tenantImg}
                            alt=""
                            className="d-block mx-auto mb-3 contact-page-card-img"
                          />
                          <p className="text-center contact-page-sub-title">Tenants</p>
                          <p className="contact-page-sub-text text-center mb-0">
                            The point of using Lorem Ipsum is that it has a more
                          </p>
                        </div>
                      </Link>
                    </div>
                  </>
                  : ""
            }

          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4 m-3">
            {
              localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.vendors?.view ?
                <>
                  <div className="card contact-page-card-main">
                    <Link to="/all-vendor">
                      <div className="card-body p-4">
                        <img
                          src={vendorImg}
                          alt=""
                          className="d-block mx-auto mb-3 contact-page-card-img"
                        />
                        <p className="text-center contact-page-sub-title">Vendors</p>
                        <p className="contact-page-sub-text text-center mb-0">
                          The point of using Lorem Ipsum is that it has a more
                        </p>
                      </div>
                    </Link>
                  </div>
                </>
                :
                localStorage.getItem("role") === "landlord" ?
                  <>
                    <div className="card contact-page-card-main">
                      <Link to="/all-vendor">
                        <div className="card-body p-4">
                          <img
                            src={vendorImg}
                            alt=""
                            className="d-block mx-auto mb-3 contact-page-card-img"
                          />
                          <p className="text-center contact-page-sub-title">Vendors</p>
                          <p className="contact-page-sub-text text-center mb-0">
                            The point of using Lorem Ipsum is that it has a more
                          </p>
                        </div>
                      </Link>
                    </div>
                  </>
                  : ""
            }

          </div>
          <div className="col-md-4 m-3">
            {
              localStorage.getItem("role") !== "landlord" && localStorage.getItem("role") === "user" && ROLE[0]?.service_professional?.view ?
                <>
                  <div className="card contact-page-card-main">
                    <Link to="/all-service-professional">
                      <div className="card-body p-4">
                        <img
                          src={serviceProfessionalImg}
                          alt=""
                          className="d-block mx-auto mb-3 contact-page-card-img"
                        />
                        <p className="text-center contact-page-sub-title">
                          Service Professional
                        </p>
                        <p className="contact-page-sub-text text-center mb-0">
                          The point of using Lorem Ipsum is that it has a more
                        </p>
                      </div>
                    </Link>
                  </div>
                </>
                :
                localStorage.getItem("role") === "landlord" ?
                  <>
                    <div className="card contact-page-card-main">
                      <Link to="/all-service-professional">
                        <div className="card-body p-4">
                          <img
                            src={serviceProfessionalImg}
                            alt=""
                            className="d-block mx-auto mb-3 contact-page-card-img"
                          />
                          <p className="text-center contact-page-sub-title">
                            Service Professional
                          </p>
                          <p className="contact-page-sub-text text-center mb-0">
                            The point of using Lorem Ipsum is that it has a more
                          </p>
                        </div>
                      </Link>
                    </div>
                  </>
                  : ""

            }

          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
