import { useEffect, useState } from "react";
import searchIcon from "assets/search.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { OnlineOffline } from "Store/Slices/ChatSlice";
import UseGetHook from "Hooks/UseGetHook";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import moment from "moment";
const ChatUserList = ({ archive }) => {
  const socket = useSelector((state) => {
    return state.Chat.socket;
  });
  const [search, setSearch] = useState("")
  const read = useSelector((state) => {
    return state.Chat.read;
  });
  const allConversation = useSelector((state) => {
    return state.Chat.conversation;
  });
  // States
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { FetchCoversationLandlord, FetchCoversationTenant, convo, setconvo } = UseGetHook("conversations", 1, "", search);
  useEffect(() => {
    if (localStorage.getItem("role") === "landlord") {
      FetchCoversationLandlord();
    } else {
      FetchCoversationTenant();
    }
  }, [search]);
  useEffect(() => {
    if (socket) {
      socket.on("chatMessage", (data) => {
        FetchCoversationLandlord();
      });
    }
  }, []);
  return (
    <>
      <div className="row m-0">
        <div className="col-md-12 col-lg-6 border-end p-0">
          <div className="chat-user-list-container p-2 ">
            <div className="chat-search-bar d-md-none d-lg-block d-none border-bottom position-relative pb-3">
              <input
                type="text"
                placeholder="Search"
                className="form-control search-form-control-task"
                onChange={(e) => {
                  setTimeout(() => {
                    setSearch(e.target.value)
                  }, 2000);
                }}
              />
              <div className="search-icon-task">
                <img src={searchIcon} alt="" />
              </div>
            </div>
            <div className="chat-archive-bar d-md-none d-lg-block d-none position-relative mt-3 text-center">
              <button
                onClick={() => {
                  navigate("/archive-user");
                }}
                className={
                  archive
                    ? "d-none archive-chat-button w-100"
                    : "archive-chat-button w-100"
                }
              >
                <span>
                  <svg
                    width={21}
                    height={21}
                    fill="#98A2B3"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 6a3 3 0 0 0-3-3H6a3 3 0 0 0-2 5.22V18a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.22A3 3 0 0 0 21 6ZM6 5h12a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm12 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h12v9Z" />
                    <path d="M14.13 12H9.87a.87.87 0 0 0-.87.87v.26c0 .48.39.87.87.87h4.26c.48 0 .87-.39.87-.87v-.26a.87.87 0 0 0-.87-.87Z" />
                  </svg>
                </span>{" "}
                Archived Chats
              </button>
            </div>
            <div className="responsive-chat-search-bar d-flex align-items-center gap-2 d-lg-none ">
              <div
                className={
                  archive
                    ? "chat-search-bar position-relative flex-grow-1"
                    : "chat-search-bar flex-grow-1 position-relative "
                }
              >
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control search-form-control-task"
                />
                <div className="search-icon-task">
                  <img src={searchIcon} alt="" />
                </div>
              </div>
              <div className="chat-archive-bar position-relative">
                <button
                  onClick={() => {
                    navigate("/archive-user");
                  }}
                  className={
                    archive
                      ? "d-none archive-chat-button w-100"
                      : "archive-chat-button w-100 p-2"
                  }
                >
                  <span>
                    <svg
                      width={21}
                      height={21}
                      fill="#98A2B3"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 6a3 3 0 0 0-3-3H6a3 3 0 0 0-2 5.22V18a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8.22A3 3 0 0 0 21 6ZM6 5h12a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm12 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h12v9Z" />
                      <path d="M14.13 12H9.87a.87.87 0 0 0-.87.87v.26c0 .48.39.87.87.87h4.26c.48 0 .87-.39.87-.87v-.26a.87.87 0 0 0-.87-.87Z" />
                    </svg>
                  </span>{" "}
                  Archived Chat
                </button>
              </div>
            </div>
            {convo.map((item) => {
              return (
                <div key={item.id}>
                  {
                    <Link
                      onClick={() => {
                        localStorage.getItem("role") === "landlord"
                          ? dispatch(OnlineOffline(item.tenant.status))
                          : dispatch(OnlineOffline(item.isTenant));
                        FetchCoversationLandlord();
                      }}
                      className="text-grey"
                      to={
                        window.innerWidth <= 850
                          ? "/mobile-chat"
                          : `chat?id=${item.id}`
                      }
                    >
                      <div className="chat-user-lists gap-3 d-flex  align-items-center border-bottom p-3">
                        <div key={item.id} className="chat-user-img">
                          {localStorage.getItem("role") === "landlord" ? (
                            !item.tenant.profileImage ? (
                              <Avatar
                                style={{
                                  backgroundColor: "#EF6B3E",
                                  verticalAlign: "middle",
                                }}
                                size="large"
                              >
                                {localStorage.getItem("name")[0]}
                              </Avatar>
                            ) : (
                              <img
                                className="property-table-image mw_40 mh_40 me-2 rounded-5"
                                src={`${item.tenant.profileImage}`}
                                alt=""
                              />
                            )
                          ) : !item.landlord.profileImage ? (
                            <Avatar
                              style={{
                                backgroundColor: "#EF6B3E",
                                verticalAlign: "middle",
                              }}
                              size="large"
                            >
                              {localStorage.getItem("name")[0]}
                            </Avatar>
                          ) : (
                            <img
                              className="property-table-image mw_40 mh_40 me-2 rounded-5"
                              src={`${item.landlord.profileImage}`}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="chat-user-info">
                          {localStorage.getItem("role") === "landlord" ? (
                            <p className="mb-0">
                              {item.tenant.firstName} {item.tenant.lastName}
                            </p>
                          ) : (
                            <p className="mb-0">
                              {item.landlord.firstName} {item.landlord.lastName}
                            </p>
                          )}
                          <p className="mb-0 normal-grey-text">{item.text}</p>
                        </div>
                        <div className="chat-user-time">
                          <p className="mb-0 normal-grey-text">
                            {moment(item.timestamp)
                              .startOf("minutes")
                              .fromNow()}
                          </p>
                        </div>
                        {item.unreadCount > 0 && (
                          <div className="chat-user-count">
                            <p className="mb-0 text-white">
                              {item.unreadCount}
                            </p>
                          </div>
                        )}
                      </div>
                    </Link>
                  }
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-9 d-md-none d-lg-block d-none col-lg-6  position-relative ps-0">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ChatUserList;
