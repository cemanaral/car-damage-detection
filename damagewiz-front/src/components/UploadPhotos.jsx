import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadPhotos() {
  const [files, setFiles] = useState();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFiles(e.target.files);
  };
  async function handleUpload() {
    const brandData = new FormData();
    for (let i = 0; i < files.length; i++) {
      brandData.append("model_image", files[0]);
    }
    const modelData = new FormData();
    for (let i = 0; i < files.length; i++) {
      modelData.append("model_image", files[0]);
    }
    let detectedBrand;
    let detectedModel;
    // data.append('upload_preset', 'damageWiz')
    // data.append('cloud_name', 'damagewiz')
    await fetch("http://35.208.145.26:8080/brand/", {
      // Unknown endpoint error
      method: "post",
      body: brandData,
    })
      .then((res) => res.json())
      .then((data) => {
        detectedBrand = data;
      })
      .catch((err) => {
        console.log(err);
      });

    await fetch(
      "http://35.208.145.26:8080/model/" + detectedBrand.result.toLowerCase(),
      {
        // Unknown endpoint error
        method: "post",
        body: modelData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        detectedModel = data;
        localStorage.percentage = detectedModel.percentage;
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/brandApproval", {
      replace: true,
      state: { brand: detectedBrand.result, model: detectedModel.result },
    });
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

export default UploadPhotos;
