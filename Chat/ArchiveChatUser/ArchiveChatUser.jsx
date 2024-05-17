import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "assets/search.png";
import oval from "assets/Oval.png";
import UseGetHook from "Hooks/UseGetHook";
import moment from "moment";
const ArchiveChatUser = () => {
  const { FetchLandlordArchive, messages } = UseGetHook("conversations")
  useEffect(() => {
    FetchLandlordArchive()
  }, [])
  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid bg-white p-3">
        <div className="row">
          <div className="col-md-12">
            <div className="chat-search-bar  position-relative ">
              <input
                type="text"
                placeholder="Search"
                className="form-control search-form-control-task"
              />
              <div className="search-icon-task">
                <img src={searchIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            {messages.map((item) => {
              return (
                <>
                  <div
                    onClick={() => {
                      navigate(`/archive-chat?id=${item.id}`);
                    }}
                    className="archive-chat-user-list mt-3 d-flex align-items-center gap-3 position-relative"
                  >
                    <div className="archive-chat-user-img">
                      <img src={oval} alt="" />
                    </div>
                    <div className="archive-chat-user-text">
                      <p className="mb-0 text-dark fw-medium">{item.tenant.firstName}</p>
                      <p className="mb-0 normal-grey-text">{item.text}</p>
                    </div>
                    <div className="archive-chat-user-time position-absolute ">
                      <p className="mb-0 normal-grey-text"> {
                        moment(item.timestamp)
                          .format("h:mm a")
                          .toUpperCase()}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchiveChatUser;
