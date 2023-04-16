import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadDamagedPartsPhotos() {
  const [files, setFiles] = useState();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFiles(e.target.files);
  };
  const handleUpload = () => {
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append(`images[${i}]`, files[0]);
    }
    // data.append('upload_preset', 'damageWiz')
    // data.append('cloud_name', 'damagewiz')
    fetch("https:", {
      // Unknown endpoint error
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/partApproval");
  };
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
