import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function SummaryPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/myOrders");
  };

  let parts = JSON.parse(localStorage.listingPageSelectedParts);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen ">
        <div className=" backdrop-blur-sm bg-black/50 p-12 rounded-xl h-80">
          <h1 className="text-white text-2xl">Summary</h1>
          <ul>
            <li>
              {Object.keys(parts).map((k) => {
                return (
                  <div>
                    <ul className="text-white mt-10">
                      <li>
                        {parts[k].carName}
                        {parts[k].partName}
                      </li>
                      <li>
                        {parseInt(parts[k].price) +
                          parseInt(parts[k].laborCost)}
                        {parts[k].name}
                      </li>
                    </ul>
                  </div>
                );
              })}
            </li>
          </ul>
          <button
            className="justify-center self-center w-32 border h-12 rounded-full bg-cyan-100 text-3xl mt-10"
            onClick={handleClick}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SummaryPage;
