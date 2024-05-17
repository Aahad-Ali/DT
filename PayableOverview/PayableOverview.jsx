import React, { useEffect, useMemo, useState } from "react";
import DigitalTenantLogo from "assets/Copy of DigitalTenant_Logo.png";
import { Table } from "antd";
import { usePDF } from "react-to-pdf";
import UseGetHook from "Hooks/UseGetHook";
import UseUrlParamsHook from "Hooks/UseUrlParamsHook";

const PayableOverview = () => {
  // States
  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" });
  const { id } = UseUrlParamsHook();
  const { FetchInvoiceById, Invoice } = UseGetHook("getInvoiceById", id);
  useEffect(() => {
    FetchInvoiceById();
  }, []);
  const invoiceDate = new Date(Invoice?.invoice_date).toLocaleDateString();
  const dueDate = new Date(Invoice?.due_date).toLocaleDateString();
  // Table Data
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      render: (Number) => (
        <>
          <span className="payments-incoice-table-index-column">{Number}</span>
        </>
      ),
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      render: (text) => (
        <>
          <span className="payments-invoice-table-description-text">
            {text}
          </span>
        </>
      ),
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      render: (text) => (
        <>
          <span className="payments-invoice-table-category-sub-text">
            {text}
          </span>
        </>
      ),
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      render: (text) => (
        <>
          <span className="payments-invoice-table-amount-text">{text}</span>
        </>
      ),
    },
  ];

  const data = Invoice?.invoiceLineItems?.map((e, index) => ({
    key: index + 1,
    id: e.id,
    name: e.invoice_no,
    description: e.description,
    category: e.category.category,
    amount: e.amount.toLocaleString(),
  }));
  return (
    <>
      <div className="container-fluid bg-white p-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="payable-overview-btn d-flex align-items-center gap-4">
                <button
                  onClick={() => toPDF()}
                  className={
                    window.innerWidth <= 768
                      ? "modal-save-btn p-2 w-50"
                      : "modal-save-btn p-2"
                  }
                >
                  <span className="">
                    <svg
                      width={21}
                      height={21}
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <path d="m7 10 5 5 5-5" />
                      <path d="M12 15V3" />
                    </svg>
                  </span>
                  Download
                </button>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      window.print();
                    }, 1000); // Ek second ka wait karke print dialog box ko open karna
                  }}
                  className={
                    window.innerWidth <= 768 ? "print-btn w-50" : "print-btn"
                  }
                >
                  <span>
                    <svg
                      width={21}
                      height={21}
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 9V2h12v7" />
                      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                      <path d="M6 14h12v8H6z" />
                    </svg>
                  </span>
                  Print
                </button>
              </div>
            </div>
          </div>
          <div className="invoice-over-view-container mt-3" ref={targetRef}>
            <div className="invoice-heading d-flex justify-content-between align-items-center">
              <div className="invoice-heading-text">
                <p className="payments-invoice-title">Invoice Overview</p>
              </div>
              <div className="invoice-heading-img text-end">
                <img src={DigitalTenantLogo} alt="" />
                <p className="mb-0  normal-grey-text">Peston Ave</p>
                <p className="mb-0  normal-grey-text">
                  534-1477 Non, Av. Bury St,10846
                </p>
                <p className="mb-0  normal-grey-text">+(926) 317-7235</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <p className="normal-grey-text payments-invoice-grey-title">
                  INVOICE NO
                </p>
                <p className="payments-invoice-para-text">
                  {Invoice?.invoice_no}
                </p>
              </div>
              <div className="col-md-3">
                <p className="normal-grey-text payments-invoice-grey-title">
                  DATE
                </p>
                <p className="payments-invoice-para-text">{invoiceDate}</p>
              </div>
              <div className="col-md-3">
                <p className="normal-grey-text payments-invoice-grey-title">
                  DUE DATE
                </p>
                <p className="payments-invoice-para-text">{dueDate}</p>
              </div>
              <div className="col-md-3"></div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <p className="normal-grey-text payments-invoice-grey-title">
                  BILLING DETAILS
                </p>
                <p className="payments-invoice-para-text">
                  {Invoice?.billing_details?.full_name}
                </p>
                <p className="payments-invoice-para-text">
                  {Invoice?.billing_details?.address}
                </p>
                <p className="payments-invoice-para-text">
                  {Invoice?.billing_details?.phone_no}
                </p>
              </div>
              <div className="col-md-6">
                <p className="normal-grey-text payments-invoice-grey-title">
                  SHIPPING DETAILS
                </p>
                <p className="payments-invoice-para-text">
                  {Invoice?.shipping_details?.full_name}
                </p>
                <p className="payments-invoice-para-text">
                  {Invoice?.shipping_details?.address}
                </p>
                <p className="payments-invoice-para-text">
                  {Invoice?.shipping_details?.phone_no}
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <Table
                  align="center"
                  pagination={false}
                  columns={columns}
                  dataSource={data}
                  size="middle"
                />
                <hr />
                <div className="row">
                  <div className="col-md-12 text-end">
                    <p className="payments-invoice-total-text">
                      {" "}
                      <span className="payments-invoice-total-sub-text">
                        Sub Total:
                      </span>{" "}
                      $381.76
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-12 text-end">
                    <p className="payments-invoice-total-text">
                      {" "}
                      <span className="payments-invoice-total-sub-text">
                        Total Amount:
                      </span>{" "}
                      ${Invoice?.totalAmount?.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 text-start">
                    <p className="primary-orange-text fw-medium">
                      {" "}
                      Thank You For your Business!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayableOverview;
