import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import { useState, useEffect } from "react";
import ListingDetails from "../components/ListingDetails";

function ListingPartsPage() {
  const [size, setSize] = useState("small");
  const [fetchResults, setFetchResults] = useState([]);
  const onChange = (e) => {
    setSize(e.target.value);
  };
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
                size={size}
                items={selectedPartIds.map((i) => {
                  const id = String(i);
                  var requestOptions = {
                    method: "GET",
                    headers: { Authorization: "Bearer " + localStorage.token },
                    redirect: "follow",
                  };
                  async function fetchCarParts() {
                    useEffect(async () => {
                      await fetch(
                        "http://localhost:9090/car_part/" +
                          localStorage.carId +
                          "/" +
                          id,
                        requestOptions
                      )
                        .then((response) => response.json())
                        .then((result) => {
                          setFetchResults(result);
                        })
                        .catch((error) => console.log("error", error));
                    }, []);
                  }
                  fetchCarParts();
                  return {
                    label: carPartsInfo[id],
                    key: id,
                    children: (
                      <div className="flex gap-3">
                        {fetchResults.map((result) => {
                          return (
                            <ListingDetails
                              key={result.id}
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
              className="w-24 border h-8 rounded-full mt-20 bg-cyan-100  "
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

export default ListingPartsPage;
