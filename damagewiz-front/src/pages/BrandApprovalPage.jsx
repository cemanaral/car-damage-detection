import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

function BrandApprovalPage() {
  const location = useLocation();
  const [brand, setBrand] = useState(location.state.brand);
  const [model, setModel] = useState(location.state.model);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/partDetection");
  };
  const handlePreviousPage = () => navigate(-1);
  const Ford = ["Fiesta", "Mustang"];
  const Hyundai = ["Accent", "Elantra"];
  const Volkswagen = ["Beetle", "Golf"];
  const Toyota = ["Corolla", "Yaris"];
  const Audi = ["A3", "TT"];
  const Honda = ["Accord", "Civic"];
  let type = null;
  let options = null;
  if (brand === "Ford") {
    type = Ford;
  } else if (brand === "Hyundai") {
    type = Hyundai;
  } else if (brand === "Volkswagen") {
    type = Volkswagen;
  } else if (brand === "Toyota") {
    type = Toyota;
  } else if (brand === "Audi") {
    type = Audi;
  } else if (brand === "Honda") {
    type = Honda;
  }

  const car_ids = {
    Golf: 1,
    Beetle: 2,
    Fiesta: 3,
    Mustang: 4,
    Corolla: 5,
    Yaris: 6,
    Accent: 7,
    Elantra: 8,
    A3: 9,
    TT: 10,
    Accord: 11,
    Civic: 12,
  };

  console.log(car_ids[model]);
  localStorage.carId = car_ids[model];

  if (type) {
    options = type.map((el) => (
      <option key={el} defaultValue={model}>
        {el}
      </option>
    ));
  }

  return (
    <div>
      <div>
        <Navbar />
        <Icon
          icon="material-symbols:arrow-back-ios-new-rounded"
          color="white"
          width="2rem"
          height="2rem"
          className="absolute top-14 left-8 bg-black/30 rounded-full w-12 h-12 p-2"
          onClick={handlePreviousPage}
        />
        <div className="flex items-center justify-center h-screen ">
          <div className=" backdrop-blur-sm bg-black/50 p-12 rounded-xl">
            <h1 className="text-white text-3xl">Detection Results </h1>
            <h1 className="text-white text-2xl mt-10">Brand</h1>

            <select
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                setModel(eval(e.target.value)[0]);
              }}
              className=" w-96 mt-3 rounded h-8 bg-cyan-100"
              defaultValue={brand}
            >
              <option>Ford</option>
              <option>Hyundai</option>
              <option>Toyota</option>
              <option>Volkswagen</option>
              <option>Audi</option>
              <option>Honda</option>
            </select>
            <h1 className="text-white text-2xl mt-10">Model</h1>

            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className=" w-96 mt-3 rounded h-8 bg-cyan-100"
            >
              {options}
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
