import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadDamagedPartsPhotos() {
  const [files, setFiles] = useState();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFiles(e.target.files);
  };
  async function handleUpload() {
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("model_image", files[0]);
    }

    var requestOptions = {
      method: "POST",
      body: data,
      redirect: "follow",
    };

    await fetch("http://35.208.145.26:8081/part", requestOptions)
      .then((response) => response.text())
      .then((result) => (localStorage.detectedParts = result))
      .catch((error) => console.log("error", error));
    navigate("/partApproval");
  }
  return (
    <>
      <div className="flex items-center justify-center">
        <input
          type="file"
          multiple
          onChange={handleChange}
          className="w-80 border h-8 rounded mt-8 bg-cyan-100"
        />
      </div>
      <div className="flex items-center justify-center">
        {" "}
        <button
          onClick={handleUpload}
          className="w-24 border h-8 rounded-full mt-8 bg-cyan-100 "
        >
          Upload
        </button>
      </div>
    </>
  );
}

export default UploadDamagedPartsPhotos;
