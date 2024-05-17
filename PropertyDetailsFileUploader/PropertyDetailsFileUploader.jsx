import React, { useEffect, useState } from "react";
import fileUpload from "assets/upload-cloud-02.png";
const PropertyDetailsFileUploader = ({
  handleChange,
  handleClick,
  name,
  types,
  addNote,
}) => {
  // States start
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState(false);
  // States end

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 2000);
  }, [error]);
  const maxWidth = 800;
  const maxHeight = 400;

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateImage = (image) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(image);
      img.onload = () => {
        const valid = img.width <= maxWidth && img.height <= maxHeight;
        resolve(valid);
      };
    });
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);

    if (files.length > 0) {
      const validImages = [];

      for (const image of files) {
        const isValid = await validateImage(image);
        if (isValid) {
          validImages.push(image);
        } else {
          setError(true);
          return; // Exit early on validation failure
        }
      }

      const imageUrls = validImages.map((image) => URL.createObjectURL(image));
      setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
      if (handleChange) {
        handleChange(validImages);
      }
    }
  };

  const handleFileInputChange = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      const validImages = [];

      for (const image of files) {
        const isValid = await validateImage(image);
        if (isValid) {
          validImages.push(image);
        } else {
          setError(true);
          return; // Exit early on validation failure
        }
      }

      const imageUrls = validImages.map((image) => URL.createObjectURL(image));
      setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
      if (handleChange) {
        handleChange(validImages);
      }
    }
  };

  return (
    <>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={` ${
          addNote
            ? "file-uploader-notes"
            : "property-details-file-uploader mt-3"
        } ${isDragging ? "dragging" : ""}`}
      >
        <img src={fileUpload} alt="" />
        <input
          id="name"
          type="file"
          name={name}
          accept={types}
          onChange={handleFileInputChange}
          style={{ display: "none" }}
        />
        {isDragging ? (
          <p className="file-label mb-0">
            <span className="upload-text-grey ">Drop Here </span>
          </p>
        ) : (
          <>
            <p className="file-label mb-0">
              <span className="upload-text-grey ">Click to upload </span> or
              drag and drop
            </p>
            <p className="file-label">SVG,PNG,JPG or GIF (max. 800x400px)</p>
          </>
        )}
      </div>
      <div className="selected-images-container">
        <div className="row">
          {selectedImages.map((imageUrl, index) => (
            <div className="col-md-12 mt-3">
              <img
                key={index}
                src={imageUrl}
                alt={`Selected ${index}`}
                className="image-preview"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className={
          error === true ? "error-message-show box-shadow" : "error-message"
        }
      >
        <span className="me-3">
          <svg
            width={21}
            height={21}
            fill="#fff"
            stroke="red"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
        </span>
        {`Image dimensions must be at most ${maxWidth}x${maxHeight} pixels.`}
      </div>
    </>
  );
};

export default PropertyDetailsFileUploader;
