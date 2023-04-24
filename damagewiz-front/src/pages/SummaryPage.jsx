import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

function SummaryPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/myOrders");

    const selectedPart = Object.keys(
      JSON.parse(localStorage.listingPageSelectedParts)
    ).map((k) => parseInt(k));

    console.log(selectedPart);

    var raw = JSON.stringify({
      username: localStorage.email,
      carPartIds: selectedPart,
    });

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.token,
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/my_order/add_order", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
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
              className=" w-36 border rounded-full bg-cyan-100 text-md"
              onClick={handleClick}
            >
              Submit Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SummaryPage;
