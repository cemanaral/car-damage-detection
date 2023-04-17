import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function ListingPartsPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/summary");
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen ">
        <div className=" backdrop-blur-sm bg-black/50 p-12 rounded-xl ">
          <div className="flex items-center justify-center">
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
