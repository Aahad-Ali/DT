import React from 'react';
import ChatUserList from '../ChatUserList/ChatUserList';
import ChatBody from '../ChatBody/ChatBody';

const ArchiveChats = () => {
    return (
        <>
            <div className="container-fluid bg-white p-3">
                <div className="row m-0">
                    <div className="col-md-12 col-lg-12 d-md-none d-lg-block d-none position-relative p-0 m-0">
                        <ChatBody archive={true} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArchiveChats
