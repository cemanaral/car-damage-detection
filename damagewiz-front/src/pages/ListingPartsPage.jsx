import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import { useState, useEffect } from "react";
import ListingDetails from "../components/ListingDetails";
import { Input, Radio, Space } from "antd";

function ListingPartsPage() {
  const [fetchResults, setFetchResults] = useState({});

  const [fetchResults_1, setFetchResults_1] = useState([]);
  const [fetchResults_2, setFetchResults_2] = useState([]);
  const [fetchResults_3, setFetchResults_3] = useState([]);
  const [fetchResults_4, setFetchResults_4] = useState([]);
  const [fetchResults_5, setFetchResults_5] = useState([]);

  const [sortByRadioButton, setSortByRadioButton] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setSortByRadioButton(e.target.value);
  };
  function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
    console.log(
      "Latitude: " +
        position.coords.latitude +
        " Longitude: " +
        position.coords.longitude
    );
    localStorage.latitude = position.coords.latitude;
    localStorage.longitude = position.coords.longitude;
  }
  getLocation();

  function haversineDistance(lon1, lat1, lon2, lat2) {
    function toRad(x) {
      return (x * Math.PI) / 180;
    }
    var R = 6371; // km

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  const sortByPrice = (a, b) =>
    parseInt(a.price) + parseInt(a.laborCost) >
    parseInt(b.price) + parseInt(b.laborCost)
      ? 1
      : -1;

  const sortByDistance = (a, b) => (a.distance < b.distance ? 1 : -1);

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

  const checkRadio = (a, b) => {
    if (sortByRadioButton === 1) {
      return sortByPrice(a, b);
    } else {
      return sortByDistance(a, b);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center h-screen gap-2">
        <div className="backdrop-blur-sm w-6/12 bg-black/50 p-12 rounded-xl h-5/6 mt-10">
          <div className="items-center justify-center">
            <div className="flex">
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
                        {eval("fetchResults_" + id)
                          .map((result) => {
                            return {
                              ...result,
                              distance: haversineDistance(
                                parseFloat(localStorage.longitude),
                                parseFloat(localStorage.latitude),
                                result.mechanic.longitude,
                                result.mechanic.latitude
                              ),
                            };
                          })
                          .sort(checkRadio)
                          .map((result) => {
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
                                distance={result.distance}
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
              className="w-48 border h-8 rounded-full mt-8 bg-cyan-100 ml-12 "
              onClick={handleClick}
            >
              Give an Order
            </button>
          </div>
        </div>
        <Radio.Group
          onChange={onChange}
          value={sortByRadioButton}
          className="backdrop-blur-sm bg-black/50 p-4 rounded-xl h-20 mt-10"
        >
          <Space direction="vertical">
            <Radio value={1} className="text-white">
              Order By Price
            </Radio>
            <Radio value={2} className="text-white">
              Order By Distance
            </Radio>
          </Space>
        </Radio.Group>
      </div>
      <Footer />
    </div>
  );
}

export default ListingPartsPage;
