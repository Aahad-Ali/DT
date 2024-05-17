import { message } from "antd";
import React from "react";

const SearchButton = ({ btnTitle, searchClickHandler, disabled, warning }) => {
  return (
    <>
      {disabled ? (
        <button
          onClick={() => {
            message.error(warning);
          }}
          className="add-new-task-btn w-100 cursor-not-allowed opacity-50"
        >
          <span>
            <svg
              width={21}
              height={21}
              fill="#fff"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </span>
          {btnTitle}
        </button>
      ) : (
        <button
          onClick={() => {
            searchClickHandler();
          }}
          className="add-new-task-btn"
        >
          <span>
            <svg
              width={21}
              height={21}
              fill="#fff"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </span>
          {btnTitle}
        </button>
      )}
    </>
  );
};

export default SearchButton;
