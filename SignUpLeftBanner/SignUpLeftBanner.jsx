import React from "react";
// import signUpImg from "assets/login-new-design-image.png";
const SignUpLeftBanner = () => {
  return (
    <>
      <div className="signUp-left-img pt-5" style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
        <div className="p-5">
          <h1 className="text-white-head" style={{ fontSize: '100px', fontWeight: '600', fontFamily: "Montserrat", }}>Simple, Adaptive <br /> and Modern </h1>
          <p className="text-white-des" style={{
            fontWeight: '500',
            fontSize: '16px',
            color:'#000',
          }}>Elevate Your Property Management Experience Today</p>
        </div>

        <img
          // src={signUpImg}
          className="img-fluid img-md-fluid img-lg-fluid"
          alt=""
        />

        {/* <div className="sign-up-left-img-overlay"></div> */}
      </div >
    </>
  );
};

export default SignUpLeftBanner;
