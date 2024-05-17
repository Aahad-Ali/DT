import React from 'react'
import { Select } from 'antd';
const SettingPortfolio = () => {
    return (
        <>
            <p className="heading">
                PORTFOLIOS
            </p>
            <p className='mb-0'>Link your properties with portfolios</p>
            <p className='normal-grey-text'>Lorem ipsum dolor sit amet consectet.</p>
            <div className="row mt-3">
                <div className="col-md-12">
                    <span>Name<span className="sign-up-imp-star">*</span></span>
                    <Select
                        placeholder="Select Name"
                        style={{
                            width: '100%',
                            height: 50
                        }}
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'Yiminghe',
                                label: 'yiminghe',
                            },
                            {
                                value: 'disabled',
                                label: 'Disabled',
                                disabled: true,
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <span>Properties<span className="sign-up-imp-star">*</span></span>
                    <Select
                        placeholder="Select Property"
                        style={{
                            width: '100%',
                            height: 50
                        }}
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'Yiminghe',
                                label: 'yiminghe',
                            },
                            {
                                value: 'disabled',
                                label: 'Disabled',
                                disabled: true,
                            },
                        ]}
                    />
                </div>
            </div>
            <div className="row my-4">
                <div className="setting-btn my-4 d-flex align-items-center gap-4">
                    <button className="cancel-btn">Cancel</button>
                    <button className="save-btn">Save</button>
                </div>
            </div>
        </>
    )
}

export default SettingPortfolio
