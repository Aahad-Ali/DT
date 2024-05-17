import React, { useRef, useState } from "react";
import cancelIcon from "assets/x-circle.png";
import user_img from "assets/user-profile-image.png";
import uploadIcon from "assets/upload-icon-white.png";
const ProfileUploader = ({ ProfileImages, setProfileImages }) => {
  // States
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  // States End
  // Functions
  const selectedFile = () => {
    fileInputRef.current.click();
  };
  const onFileSelect = (images) => {
    const files = images;
    setProfileImages(files[0]);
  };
  const onDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };
  const onDragLeave = () => {
    // setIsDragging(false);
    // const files = event.dataTransfer.files;
    // setProfileImages(files[0]);
    setIsDragging(false);
  };
  const onDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setProfileImages(files[0]);
    setIsDragging(false);
  };
  // Functions End
  return (
    <>
      <div className="dragger-card">
        <div
          className="drag-area-profile"
          onClick={selectedFile}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {
            <>
              {ProfileImages && ProfileImages.length !== 0 ? (
                <img
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                  src={
                    ProfileImages instanceof File
                      ? URL.createObjectURL(ProfileImages)
                      : ProfileImages
                  }
                  alt=""
                />
              ) : (
                <>
                  <div className="position-relative d-flex align-items-center justify-content-center">
                    <img
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                      src={user_img}
                      alt=""
                    />
                    <span className="position-absolute text-white d-flex flex-column align-items-center">
                      {isDragging ? (
                        <span>Drop...</span>
                      ) : (
                        <>
                          <img
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "contain",
                            }}
                            src={uploadIcon}
                            alt=""
                          />
                          Upload photo
                        </>
                      )}
                    </span>
                  </div>
                </>
              )}
            </>
          }
          <input
            type="file"
            name=""
            ref={fileInputRef}
            onChange={(e) => onFileSelect(e.target.files)}
            accept=".png,.jpg,.jpeg"
            id=""
          />
        </div>
      </div>
    </>
  );
};

export default ProfileUploader;
