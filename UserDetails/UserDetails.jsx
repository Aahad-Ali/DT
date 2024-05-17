import React, { useEffect, useState } from "react";
import infoIcon from "assets/info.png";
import userImg from "assets/over-user-img.png";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import propertyDummyImage from "assets/user-profile-image.png";

const UserDetails = () => {
  const [Data, setData] = useState([]);

  const { id } = UseUrlParamsHook();
  const config = require("Helpers/config.json");
  useEffect(() => {
    fetch(`${config["baseUrl"]}/api/user/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.apiCallStatus === "success") {
          let temp = [];
          temp = res.message;
          setData([temp]);
          console.log(Data, "success user");
        } else {
          console.log(res, "error");
        }
      });
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-10">
            <div className="task-info-heading">
              <h4>User Info</h4>
            </div>
            <div className="task-info-lists mt-5">
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-2">
                      First Name:
                    </span>{" "}
                    {Data[0]?.firstName}
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-2">
                      Middle Name:
                    </span>{" "}
                    {Data[0]?.middleName}
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-2">Last Name:</span>{" "}
                    {Data[0]?.lastName}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-2">Email:</span>{" "}
                    {Data[0]?.email}
                  </p>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <p>
                    <span className="task-info-list-span me-2">Phone No:</span>{" "}
                    {Data[0]?.phone}
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <p>
                    <span className="task-info-list-span me-2">
                      Current Address:
                    </span>{" "}
                    {Data[0]?.address.address_line_1} {Data[0]?.address.city}
                    {", "}
                    {Data[0]?.address.state}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p>
                    <span className="task-info-list-span me-2">User Role:</span>{" "}
                    {Data[0]?.role?.role}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p>
                    <span className="task-info-list-span me-2">
                      <img src={infoIcon} />
                    </span>{" "}
                    In full access, you have access to all features, which also
                    includes the ability to edit and delete
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="task-info-lists mt-5">
              <img src={Data[0]?.profileImage ? Data[0]?.image : propertyDummyImage} style={{ height: "150px", width: "150px" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
