import React, { useState } from "react";
import alertIcon from "assets/alert-circle.png";
import cancelIcon from "assets/x-circle.png";
import UseDeleteHook from "Hooks/UseDeleteHook";
import ArchiveHook from "Hooks/ArchiveHook";
import { ModalLayout1 } from "Components/GeneralComponents";

const DeleteModal = ({
  onClose,
  route,
  deleteBtnText,
  delId,
  component,
  fetchFun,
  setUpdate,
  url,
  isArchived
}) => {
  const [loader, setLoader] = useState(false)
  const { deleteData } = UseDeleteHook(`${component}`, delId, route, setUpdate);
  const DeleteProperty = () => {
    if (component === "property" && !isArchived) {
      ArchiveHook(url, setUpdate, setLoader)
    }
    else {
      deleteData();
      if (fetchFun) fetchFun();
    }
    onClose();
  };
  return (
    <>
      <div className="payment-modal-container ">
        <div className="payment-success-modal delete-modal position-relative">
          <div className="row">
            <div className="col-md-12 text-center">
              <img src={alertIcon} alt="" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="mb-0 fw-bold mt-2 mb-4">
                {
                  component === 'landlord/conversation' ?
                    <>
                      Delete Chat
                    </>
                    :
                    <>
                      Delete {component}
                    </>

                }

              </p>
              {component === "property" && (
                <p className="mb-2">
                  Once the property is deleted, it will move to the <br />{" "}
                  archive, and after 60 days, it will be deleted <br /> from the
                  archive.
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <button
                onClick={() => {
                  DeleteProperty();
                  setLoader(true)
                  // redirectPages()
                }}
                className="delete-modal-delete-btn w-100"
              >
                {deleteBtnText}{loader && <ModalLayout1 />}
              </button>
            </div>
          </div>
          <div onClick={() => onClose()} className="cancel-modal-icon cursor">
            <img src={cancelIcon} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
