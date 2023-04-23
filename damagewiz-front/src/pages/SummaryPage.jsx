import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

function SummaryPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/myOrders");
  };

  let parts = JSON.parse(localStorage.listingPageSelectedParts);
  let totalPrice = 0;
  let keys = Object.keys(parts);
  for (let k of keys) {
    totalPrice += parseInt(parts[k].price) + parseInt(parts[k].laborCost);
  }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen ">
        <div className=" backdrop-blur-sm bg-black/50 p-12 rounded-xl ">
          <h1 className="text-white text-2xl">Summary</h1>
          <ul>
            <li>
              {Object.keys(parts).map((k) => {
                return (
                  <div className="flex gap-2 mt-10">
                    <Icon
                      icon="material-symbols:circle"
                      color="white"
                      className="mt-2"
                      height="0.5rem"
                    />
                    <ul className="text-white">
                      <li>
                        {parts[k].carName + " "}
                        {parts[k].partName}
                      </li>
                      <li>
                        {parseInt(parts[k].price) +
                          parseInt(parts[k].laborCost)}
                        $ - Mechanic {parts[k].name}
                      </li>
                    </ul>
                  </div>
                );
              })}
            </li>
          </ul>
          <div className="flex mt-12 items-center justify-between ">
            <p className="text-white">Total: {totalPrice}$</p>
            <button
              className=" w-20 border rounded-full bg-cyan-100 text-xl"
              onClick={handleClick}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SummaryPage;
