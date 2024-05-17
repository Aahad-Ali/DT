import React, { useState, useEffect } from "react";
import { Button, message, Steps, theme, ConfigProvider } from "antd";

// FIXME Steps needs to be responsive on mobile-device
const TestStepper = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: "First",
      content: "First-content",
    },
    {
      title: "Second",
      content: "Second-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      {/* <Steps current={1} labelPlacement="vertical" items={items} /> */}
      <div className="container-fluid bg-white p-3">
        <div className="test-stepper-main"></div>
      </div>
    </>
  );
};

export default TestStepper;
