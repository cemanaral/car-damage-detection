import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BrandApprovalPage() {
  const location = useLocation();
  const [brand, setBrand] = useState(location.state.brand);
  const [model, setModel] = useState(location.state.model);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/partDetection");
  };
  const Ford = ["Fiesta", "Mustang"];
  const Hyundai = ["Accent", "Elantra"];
  const Volkswagen = ["Beetle", "Golf"];
  const Toyota = ["Corolla", "Yaris"];
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

{
  /* <select
  value={model}
  onChange={(e) => setModel(e.target.value)}
  className=" w-96 mt-3 rounded h-8 bg-cyan-100"
>
  <option value="melisa"> melisa </option>
  <option value="cem"> cem </option>
  <option value="hasan"> hasan </option>
</select> */
}
