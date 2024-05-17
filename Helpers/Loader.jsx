// import loaderImage from 'src/assets/loader-img.png'
const Loader = () => {
  return (
    <>
      <div className="loader_container d-flex justify-content-center mt-5 pt-5">
        {/* <div className="spinner"></div> */}
        {/* <img src={loaderImage} alt="" /> */}
        <div className="progress"></div>
      </div>
    </>
  );
};

export default Loader;
