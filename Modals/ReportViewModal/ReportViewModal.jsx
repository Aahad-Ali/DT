import React, { useState } from "react";
import cancelIcon from "assets/x-circle.png";
import { ConfigProvider, Select, message } from "antd";
import chevronIcon from "assets/chevron-down.png";
import config from 'Helpers/config.json'
import axios from "axios";
import PdfComponent from "Components/PdfComponent/PdfComponent";
import { PDFViewer } from "@react-pdf/renderer";
import Loader from "Helpers/Loader";

const ReportViewModal = ({ onClose, email }) => {
  // States
  const [viewType, setViewType] = useState("")
  const [data, setdata] = useState(null)
  const [loader, setloader] = useState(false)
  // States End
  let dropdownIcon;
  dropdownIcon = (
    <>
      <img src={chevronIcon} alt="" />
    </>
  );
  const reportDropdown = [
    {
      name: "Credit",
      value: "Credit"
    },
    {
      name: "Criminal",
      value: "Criminal"
    },
    {
      name: "Eviction",
      value: "Eviction"
    },
  ];
  const viewReport = async () => {
    setloader(true)
    try {
      let Config = {
        method: "post",
        url: `${config.baseUrl}/api/landlord/transunion/viewFinalReport`,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: JSON.stringify({
          prospectEmail: email,
          requestedProduct: viewType,
        }),
        responseType: 'arraybuffer'
      };

      const response = await axios.request(Config);
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      setdata(pdfBlob);
      setloader(false)
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };
  return (
    <>
      <div className="payment-modal-container">
        <div className="payment-method-modal  p-3 position-relative" style={{ overflow: "unset" }}>

          {
            loader ?
              <Loader />
              :
              data ?
                <PdfComponent pdf={data} />

                :
                <>
                  <div className="">
                    <span>

                      View report type<span className="sign-up-imp-star">*</span>
                    </span>
                    <ConfigProvider
                      theme={{
                        components: {
                          Select: {
                            zIndexPopupBase: 99999,
                            colorPrimaryHover: "#EF6B3E",
                            optionSelectedBg: "rgba(239, 107, 62, 0.16)",
                            borderRadius: 4,
                            colorTextPlaceholder: "#667085",
                            fontFamily: "montserrat",
                          },
                        },
                      }}
                    >
                      <Select
                        placeholder="Select property"
                        suffixIcon={dropdownIcon}
                        style={{
                          width: "100%",
                          height: 50,
                        }}
                        onChange={(e) => setViewType(e)}
                        options={reportDropdown.map((e) => {
                          return { value: e.value, label: e.name };
                        })}
                      />
                    </ConfigProvider>

                    <button
                      onClick={viewReport}
                      className="modal-save-btn w-100 next-btn mt-3"
                    >
                      Next
                    </button>
                  </div>
                </>

          }
          <div
            style={{
              top: "-15px",
              right: "-10px"
            }}
            onClick={() => {
              onClose();
            }}
            className="cancel-modal-icon-account cursor"
          >
            <img src={cancelIcon} alt="" />
          </div>

        </div>
      </div >
    </>
  );
};

export default ReportViewModal;
