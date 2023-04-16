import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function BrandApprovalPage() {
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/partDetection");
  };
  const location = useLocation();
  console.log(location.state.brand, location.state.model);
  return (
    <div>
      <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen ">
          <div className=" backdrop-blur-sm bg-black/50 p-12 rounded-xl h-96">
            <h1 className="text-white text-2xl">Brand</h1>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className=" w-96 mt-3 rounded h-8 bg-cyan-100"
            >
              <option value="ford"> Ford </option>
              <option value="hyundai"> Hyundai </option>
              <option value="toyota"> Toyota </option>
              <option value="volkswagen"> Wolkswagen </option>
            </select>
            <h1 className="text-white text-2xl mt-10">Model</h1>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className=" w-96 mt-3 rounded h-8 bg-cyan-100"
            >
              <option value="melisa"> melisa </option>
              <option value="cem"> cem </option>
              <option value="hasan"> hasan </option>
            </select>
            <div className="flex items-center justify-center">
              <button
                onClick={handleClick}
                className="w-24 border h-8 rounded-full mt-20 bg-cyan-100 "
              >
                {" "}
                Next{" "}
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default BrandApprovalPage;
