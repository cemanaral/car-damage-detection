import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

function PartApprovalPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem(
      "inputCheckedParts",
      JSON.stringify(inputCheckedParts)
    );
    navigate("/listingParts");
  };
  const handlePreviousPage = () => {
    navigate(-1);
  };

  let inputCheckedParts = [];
  const handleChange = (e) => {
    if (e.target.checked) {
      inputCheckedParts.push(parseInt(e.target.id));
      console.log(inputCheckedParts);
    } else {
      inputCheckedParts = inputCheckedParts.filter(function (item) {
        return item !== parseInt(e.target.id);
      });
      console.log(inputCheckedParts);
    }
  };
  const carPartsInfo = [
    { id: 1, name: "Headlamp" },
    { id: 2, name: "Rear Bumper" },
    { id: 3, name: "Door" },
    { id: 4, name: "Hood" },
    { id: 5, name: "Front Bumper" },
  ];
  let carPartsResults = JSON.parse(localStorage.getItem("detectedParts"));
  console.log(carPartsResults);
  let checkedCarPartIds = [];
  for (let i = 0; i < carPartsResults.result.length; i++) {
    checkedCarPartIds.push(carPartsResults.result[i].id);
    inputCheckedParts.push(carPartsResults.result[i].id);
  }

  console.log(checkedCarPartIds);
  return (
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
        <div className=" backdrop-blur-sm bg-black/50 p-12 rounded-xl ">
          <h1 className="text-white text-2xl">Detected Parts</h1>
          {carPartsInfo.map((carPart) => {
            return (
              <div key={carPart.id} className="flex items-center mt-5 mb-5">
                <input
                  defaultChecked={checkedCarPartIds.includes(carPart.id)}
                  onChange={handleChange}
                  id={carPart.id}
                  type="checkbox"
                  value=""
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for={carPart.id}
                  className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                >
                  {carPart.name}
                </label>
              </div>
            );
          })}
          <div className="flex items-center justify-center">
            <button
              className="w-24 border h-8 rounded-full mt-10 bg-cyan-100 "
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

export default PartApprovalPage;
