import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function StartPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/brandDetection");
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-black/30 backdrop-blur">
        <button
          className="justify-center self-center w-32 border h-12 rounded-full bg-cyan-100 text-3xl "
          onClick={handleClick}
        >
          {" "}
          Start{" "}
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default StartPage;
