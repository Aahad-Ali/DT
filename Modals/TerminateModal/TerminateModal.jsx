import { Radio, ConfigProvider } from 'antd'
import React from 'react'

const TerminateModal = ({ onClose }) => {
    return (
        <>
            <div className="payment-modal-container">
                <div className="payment-method-modal task-modal">
                    <div className="modal-heading border-bottom  d-flex justify-content-between align-items-center p-41 pt-20">
                        <h1 className='mb-0'>Select reason for termination</h1>
                        <button
                            onClick={onClose}
                            className='modal-cancel-btn mb-2'>
                            <svg width={18} height={18} fill="#667085" stroke="#667085" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="row mt-4 p-41">
                        <div className="col-md-12">
                            <p className="fw-semibold">Why do you want to terminate this service?</p>
                            <div className="mb-4 d-flex flex-column gap-3">
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Radio: {
                                                colorText: '#667085',
                                                colorPrimary: '#EF6B3E',
                                                fontFamily: 'Montserrat',
                                                fontSize: 16,
                                            }
                                        }
                                    }}
                                >
                                    <Radio>Illegal</Radio>
                                    <Radio>Repetitive</Radio>
                                    <Radio>Repetitive</Radio>
                                    <Radio>Other</Radio>
                                </ConfigProvider>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 p-41">
                        <div className="col-md-12">
                            <textarea placeholder='Type the reason..' name="" className='form-control' id="" cols="30" rows="10"></textarea>
                        </div>
                    </div>

                    <div className=" mt-5 p-41 pb-20">
                        <div className=" d-flex justify-content-end">
                            <button className="modal-submit-btn next-btn-main">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TerminateModal
