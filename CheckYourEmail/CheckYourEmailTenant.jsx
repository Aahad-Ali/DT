import SignUpLeftBanner from "../SignUpLeftBanner/SignUpLeftBanner";
import ChevronLeft from "assets/chevron-left.png";
import PlayStore from "assets/Google Play Badge.png";
import AppStore from "assets/App Store Badge.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CheckYourEmailTenant = () => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const email = new URLSearchParams(search).get("email");
  return (
    <>
      <div className="container-fluid">
        <div className="row" style={{ height: '100vh' }}>
          <div className="height-issue col-xl-7 col-lg-12 col-md-12 p-0" >
            <SignUpLeftBanner />

          </div>
          <div className="col-xl-5 col-lg-12 col-md-8 ps-5 pe-5">
            <div className="check-your-email-heading my-5 pt-5 pb-5">
              <h1>Check your email</h1>
              <p>If you forget your password, no worries</p>
            </div>
            <div className="check-your-email">
              <div className="row">
                <div className="col-md-12">
                  <p className="custom-text-style">
                    We have sent an email with password reset information to
                    your email address {email}
                  </p>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-12">
                  <div className="sign-up-buttons d-flex gap-4">
                    <button
                      onClick={() => navigate("/tenant-professional-sign-in")}
                      className="check-your-email-btn w-100"
                    >
                      Resend Email
                    </button>
                  </div>
                </div>
              </div>
              <div className="already-account-text text-center mt-5">
                <span>
                  <img src={ChevronLeft} alt="" />
                  <Link
                    to="/tenant-sign-in"
                    className="custom-link-text fw-medium"
                  >
                    Back to log in
                  </Link>
                </span>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckYourEmailTenant;
