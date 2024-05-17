import React, { useEffect, useMemo, useState } from "react";

import { ConfigProvider, Select } from "antd";
import chevronIcon from "assets/chevron-down.png";
import UseGetHook from "Hooks/UseGetHook";
import { Link, useNavigate } from "react-router-dom";
import cancelIcon from "assets/x-circle.png";

const PurchaseUnit = ({ onClose, setUnitValue, value, callBack }) => {

    let dropdownIcon;
    dropdownIcon = (
        <>
            <img src={chevronIcon} alt="" />
        </>
    );
    return (
        <>

            <div className="payment-modal-container">
                <div className="payment-method-modal property-details-view-task-modal p-5"  style={{position:'relative',top:'0px',right:'0px'}}>
                    <div className="container-fluid">
                        <div className="row">
                            <span>
                                You're out of units
                            </span>
                            <span>
                                Enter units you want to purchase<span className="sign-up-imp-star">*</span>
                            </span>
                            <div className="mt-3 d-flex gap-2">
                                <button className="add-new-task-btn w-25" onClick={() => setUnitValue(state => state - 1)}>-</button>

                                <div className="stepper-content">

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="0"
                                        value={value}
                                        onChange={(e) => setUnitValue(e.target.value)}
                                    />

                                </div>
                                <button className="add-new-task-btn w-25" onClick={() => setUnitValue(state => state + 1)}>+</button>

                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="stepper-btn d-flex justify-content-between mt-5 gap-1 pb-3">
                                <button onClick={callBack} className="next-btn-same-class w-100 mt-3">Save</button>
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            onClose();
                            // navigate(`/`)
                        }}
                        className="cancel-modal-icon-account cursor"
                    >
                        <img src={cancelIcon} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PurchaseUnit;
