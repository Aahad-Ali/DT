import React from 'react'

const NoteDetails = () => {
    return (
        <>
            <div className="notes-info-title">Notes Info</div>
            <div className="task-info-lists mt-5">
                <div className="row">
                    <div className="col-md-2">
                        <p>
                            <span className="task-info-list-span me-3">
                                Notes Title:
                            </span>
                        </p>
                    </div>
                    <div className="col-md-8">
                        <p>Plumbing issues</p>
                    </div>
                    <div className="col-md-2"></div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <p>
                            <span className="task-info-list-span me-3">
                                Description:
                            </span>
                        </p>
                    </div>
                    <div className="col-md-8">
                        <p>
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem Ipsum
                            is that it has a more-or-less normal distribution of
                            letters, as opposed to using 'Content here, content
                            here', making it look like readable English.
                        </p>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </>
    )
}

export default NoteDetails
