import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Radio, Tabs } from "antd";
import { useState } from "react";

function ListingPartsPage() {
  const [size, setSize] = useState("small");
  const onChange = (e) => {
    setSize(e.target.value);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/summary");
  };
  const carPartsInfo = [
    { id: 1, name: "Headlamp" },
    { id: 2, name: "Rear Bumper" },
    { id: 3, name: "Door" },
    { id: 4, name: "Hood" },
    { id: 5, name: "Front Bumper" },
  ];

  console.log(carPartsInfo[0].name);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen ">
        <div className=" backdrop-blur-sm bg-black/50 p-12 rounded-xl ">
          <div className="flex items-center justify-center">
            <div>
              <Tabs
                defaultActiveKey="1"
                type="card"
                size={size}
                items={new Array(5).fill(null).map((_, i) => {
                  const id = String(i + 1);
                  return {
                    label: `Card Tab ${id}`,
                    key: id,
                    children: `Content of card tab ${id}`,
                  };
                })}
              />
            </div>
            <button
              className="w-24 border h-8 rounded-full mt-20 bg-cyan-100 "
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
