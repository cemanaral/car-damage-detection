import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import { useState, useEffect } from "react";
import ListingDetails from "../components/ListingDetails";

function ListingPartsPage() {
  const [fetchResults, setFetchResults] = useState({});

  const [fetchResults_1, setFetchResults_1] = useState([]);
  const [fetchResults_2, setFetchResults_2] = useState([]);
  const [fetchResults_3, setFetchResults_3] = useState([]);
  const [fetchResults_4, setFetchResults_4] = useState([]);
  const [fetchResults_5, setFetchResults_5] = useState([]);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/summary");
  };
  const carPartsInfo = {
    1: "Headlamp",
    2: "Rear Bumper",
    3: "Door",
    4: "Hood",
    5: "Front Bumper",
  };
  localStorage.listingPageSelectedParts = JSON.stringify({});

  const selectedPartIds = JSON.parse(localStorage.inputCheckedParts);
  selectedPartIds.sort();
  console.log(selectedPartIds);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen ">
        <div className=" backdrop-blur-sm bg-black/50 p-12 rounded-xl">
          <div className="items-center justify-center">
            <div>
              <Tabs
                className="text-white"
                type="card"
                // destroyInactiveTabPane={true}
                items={selectedPartIds.map((i) => {
                  const id = String(i);
                  var requestOptions = {
                    method: "GET",
                    headers: { Authorization: "Bearer " + localStorage.token },
                    redirect: "follow",
                  };
                  function fetchCarParts() {
                    fetch(
                      "http://localhost:9090/car_part/" +
                        localStorage.carId +
                        "/" +
                        id,
                      requestOptions
                    )
                      .then((response) => response.json())
                      .then((result) => {
                        eval(
                          "setFetchResults_" +
                            id +
                            "(" +
                            JSON.stringify(result) +
                            ")"
                        );
                      })
                      .catch((error) => console.log("error", error));
                  }
                  useEffect(() => {
                    fetchCarParts();
                  }, []);
                  console.log(fetchResults_1, fetchResults_2, fetchResults_3);

                  return {
                    label: carPartsInfo[id],
                    key: id,
                    children: (
                      <div className="flex gap-3">
                        {eval("fetchResults_" + id).map((result) => {
                          return (
                            <ListingDetails
                              key={result.id}
                              partId={result.id}
                              name={result.mechanic.name}
                              price={result.price}
                              laborCost={result.laborCost}
                              carName={
                                result.car.brand + " " + result.car.model
                              }
                              partName={result.partName.name}
                            />
                          );
                        })}
                      </div>
                    ),
                  };
                })}
              />
            </div>
            <button
              className="w-48 border h-8 rounded-full mt-20 bg-cyan-100 ml-12 "
              onClick={handleClick}
            >
              Give an Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ListingPartsPage;
