import { useEffect, useState } from "react";
import olivia from "assets/olivia.png";
import active_dot from "assets/_Dot.png";
import offline_dot from "assets/_red-Dot.png";
import settingIcon from "assets/three-dots.png";
import deleteIcon from "assets/trash-01 - Orange.png";
import UseGetHook from "Hooks/UseGetHook";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";
import moment from "moment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import UseUpdateHook from "Hooks/UseUpdateHook";
import { useNavigate } from "react-router-dom";
import DeleteModal from "Modals/DeleteModal/DeleteModal";
const ChatBody = ({ archive, text }) => {
  // States start
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [textMessage, settextMessage] = useState("");
  const [read, setread] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const route = useNavigate()
  // States end
  const { id } = UseUrlParamsHook();

  const socket = useSelector((state) => {
    return state.Chat.socket;
  });
  const allConversation = useSelector((state) => {
    return state.Chat.conversation;
  });
  const online = useSelector((state) => {
    return state.Chat.online;
  });
  console.log(online, "online")
  const {
    FetchLandlordMessage,
    FetchTenantMessage,
    FetchCoversationTenant,
    FetchCoversationLandlord,
    messages,
    setmessage,
    setconvo,
  } = UseGetHook("messages", id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (socket && id) {
      socket.emit("lastReadMessage", { id: id });
    }
    if (localStorage.getItem("role") === "landlord") {
      FetchLandlordMessage();
      FetchCoversationLandlord();
    } else {
      FetchTenantMessage();
      FetchCoversationTenant();
    }
  }, [id]);

  useEffect(() => {
    if (socket) {
      socket.emit("join", { id: id });
      socket.on("chatMessage", (data) => {
        data._id = data.id;
        // delete data.id;
        setmessage((prevMessage) => [...prevMessage, data]);
        socket.emit("readMessage", {
          send_by_landlord: data.send_by_landlord,
          messageId: data.id,
          id: id,
        });
      });
      socket.on("readMessage", (data) => {
        let mm = [...messages];
        mm.filter((e) => e._id === data.id)[0].unread = false;
        setmessage(mm);
      });
    }
    return () => {
      socket?.off("chatMessage");
      socket?.off("readMessage");
    };
  }, [messages, read]);
  const handleIconClickCustom = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const SendMessage = () => {
    socket.emit("chatMessage", {
      content: textMessage,
      conversation: id,
      role: localStorage.getItem("role"),
    });
    settextMessage("");
  };
  let tenant = allConversation.filter((e) => e.id === id)[0];
  let seen = messages.map((e) => e._id).slice(-1)[0];
  const onClose = () => {
    if (!archive) {
      route('/archive-user')
    } else {
      route('/user-chat')
    }
  }
  //  Chat CRUD OP
  const archiveChat = () => {
    UseUpdateHook("conversation/archive", id, "", onClose, "landlord")
  }
  const deleteChat = () => {
    setOpenModal(state => !state)
  }
  //  Chat CRUD OP End
  return (
    <>
      {
        openModal && (
          <DeleteModal
            onClose={deleteChat}
            component="landlord/conversation"
            route={!archive ? "user-chat" : "archive-user"}
            deleteBtnText="Delete Chat"
            delId={id}
          />
        )
      }
      <div className="chat-body-header d-flex justify-content-between align-items-center border-bottom flex-grow-1">
        <div className="chat-body-header-left d-flex align-items-center justify-content-center gap-3">
          <div className="chat-body-header-img">
            <img
              className="property-table-image mw_40 mh_40 me-2 rounded-5"
              src={`${tenant?.tenant?.profileImage}`}
              alt=""
            />
            {text}
          </div>
          <div className="chat-body-header-text">
            <p className="mb-0 text-dark fw-medium">
              {tenant?.tenant?.firstName}
            </p>
            {tenant?.tenant ? (
              <p
                id={id}
                className={
                  archive
                    ? "d-none"
                    : `mb-0 ${tenant?.tenant?.id === online?.id &&
                      online?.status === true
                      ? "online-text"
                      : "offline-text"
                    }`
                }
              >
                {" "}
                <img
                  src={
                    tenant?.tenant.id === online?.id && online?.status === true
                      ? active_dot
                      : offline_dot
                  }
                  alt=""
                />{" "}
                {tenant?.tenant?.id === online?.id && online?.status === true
                  ? "Online"
                  : "Offline"}
              </p>
            ) : (
              <p
                id={id}
                className={
                  archive
                    ? "d-none"
                    : `mb-0 ${tenant?.landlord?.id === online?.id &&
                      online?.status === true
                      ? "online-text"
                      : "offline-text"
                    }`
                }
              >
                {" "}
                <img
                  src={
                    tenant?.landlord.id === online?.id &&
                      online?.status === true
                      ? active_dot
                      : offline_dot
                  }
                  alt=""
                />{" "}
                {tenant?.landlord?.id === online?.id && online?.status === true
                  ? "Online"
                  : "Offline"}
              </p>
            )}
          </div>
        </div>
        <div className="chat-body-header-right">
          {/* <button className={archive ? "d-none" : "move-to-archive-btn"}>
                        Move to Archieve
                    </button> */}
          <div className="setting-icon me-4">
            <img
              onClick={handleIconClickCustom}
              src={settingIcon}
              alt=""
              className="cursor"
            />
            {isDropdownOpen && (
              <div className="task-table-setting-dropdown-prospect bg-white box-shadow text-start">
                <ul className="p-0 d-flex flex-column gap-3">
                  <li
                    onClick={archiveChat}
                    className="list-style-none cursor lease-details-dropdown-icons">
                    <span className="me-2">
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
                    </span>
                    {!archive ? "Archive" : "Restore"}
                  </li>
                  <li
                    onClick={deleteChat}
                    className="list-style-none cursor lease-details-dropdown-icons">
                    {" "}
                    <img src={deleteIcon} className="me-2" alt="" /> Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="chat-body-container">
        <div className="chat-body mt-5">
          {messages && messages.length > 0
            ? messages.map((data) => {
              return localStorage.getItem("role") === "landlord" ? (
                <div key={data.id}>
                  {data.send_by_landlord === true ? (
                    <>
                      {/* Landlord */}
                      <div className="chat-message-body-outgoing d-flex justify-content-end align-items-center gap-3 mt-3">
                        <div className="position-relative">
                          <div className="message-incoming mt-3">
                            {data.text}
                            <div className="message-time normal-grey-text fw-medium">
                              {moment(data.timestamp)
                                .format("h:mm a")
                                .toUpperCase()}
                            </div>
                          </div>
                          {data._id === seen && data.unread === false && (
                            <div className="seen-img position-absolute end-0">
                              <span className="normal-grey-text seen-text">
                                Seen
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Tenant */}
                      <div className="chat-message-body-incoming d-flex justify-content-start align-items-center gap-3 mt-3">
                        <div className="message-img">
                          <img src={olivia} alt="" />
                        </div>
                        <div className="position-relative">
                          <div className="message-incoming">
                            {data.text}
                            <div className="message-time normal-grey-text fw-medium">
                              {moment(data.timestamp)
                                .format("h:mm a")
                                .toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div key={data.id}>
                  {data.send_by_landlord === false ? (
                    <>
                      {/* Tenant */}
                      <div className="chat-message-body-outgoing d-flex justify-content-end align-items-center gap-3">
                        <div className="position-relative">
                          <div className="message-incoming mt-3">
                            {data.text}
                            <div className="message-time normal-grey-text fw-medium">
                              {moment(data.timestamp)
                                .format("h:mm a")
                                .toUpperCase()}
                            </div>
                          </div>
                          {data._id === seen && data.unread === false && (
                            <div className="seen-img position-absolute end-0">
                              <span className="normal-grey-text seen-text">
                                Seen
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Landlord */}
                      <div className="chat-message-body-incoming d-flex justify-content-start align-items-center gap-3">
                        <div className="message-img">
                          <img src={olivia} alt="" />
                        </div>
                        <div className="position-relative">
                          <div className="message-incoming">
                            {data.text}
                            <div className="message-time normal-grey-text fw-medium">
                              {moment(data.timestamp)
                                .format("h:mm a")
                                .toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })
            : ""}
        </div>
      </div>
      {
        !archive ?
          <div className="chat-text-area border-top pt-4">
            <textarea
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  SendMessage();
                }
              }}
              onChange={(e) => settextMessage(e.target.value)}
              value={textMessage}
              placeholder="Type your message.... "
              name=""
              id=""
              cols="30"
              rows="10"
              className="send-message-text-area"
            ></textarea>
            <button
              onClick={SendMessage}
              className="save-btn-outline fw-bold primary-orange-text"
            >
              Send
            </button>
          </div>
          :
          ""
      }
    </>
  );
};

export default ChatBody;
