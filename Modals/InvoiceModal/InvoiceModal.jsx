import React from 'react'
import DigitalTenantLogo from 'assets/Copy of DigitalTenant_Logo.png'
import cancelIcon from 'assets/x-circle.png'
const InvoiceModal = ({ onClose, to_name, from_name, invoice_date, due_date, invoice_no }) => {
    return (
        <>
            <div className="payment-modal-container">
                <div className="invoice-success-modal position-relative">
                    <div className="invoice-modal-top d-flex justify-content-between border-bottom align-items-center" >
                        <div className="invoice-modal-top-img">
                            <img src={DigitalTenantLogo} alt="" />
                        </div>
                        <div className="invoice-modal-top-info d-flex gap-3">
                            <div>
                                <p className='normal-grey-text'>INVOICE NO</p>
                                <p className='text-dark fw-medium'>{invoice_no}</p>
                            </div>
                            <div>
                                <p className='normal-grey-text'>DATE</p>
                                <p className='text-dark fw-medium'>{invoice_date}</p>
                            </div>
                        </div>
                    </div>
                    <div className="email-container mt-2">
                        <p><span className="text-dark fw-bold">Email:</span>  Johnadmas@outlook.com</p>
                        <p> <span className="text-dark fw-bold">Subject:</span>  {invoice_no} 1 from {from_name} (IT Company)</p>
                        <p className='dark-grey-text fw-bold mb-0'> <span className="text-dark "> Dear</span> {to_name},</p>
                        <p>
                            Please find attached your rent invoice with number {invoice_no}.
                            and Due Date: <span className="fw-bold">{due_date}</span> If you have any questions, please
                            let us know.
                        </p>
                        <p>
                            Have a great day and thank you for your business!
                        </p>
                        <p className="mt-5 mb-0">
                            Sincerely
                        </p>
                        <p className='fw-bold text-dark'>
                            {from_name}
                        </p>
                    </div>
                    <div className="button-container text-end">
                        <button className="save-btn w-auto">Save</button>
                    </div>
                    <div onClick={onClose} className="cancel-modal-icon cursor">
                        <img src={cancelIcon} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvoiceModal
