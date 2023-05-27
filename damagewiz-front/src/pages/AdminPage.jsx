import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  const ListMechanicButton = () => {
    navigate("/listMechanic");
  };
  const ListCarPartsButton = () => {
    navigate("/listCarPart");
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-black/30 backdrop-blur gap-80">
        <div className="bg-black/60 p-8 rounded-lg">
          <p className="text-white text-3xl self-center">
            For Mechanics Operations{" "}
          </p>
          <button
            className="justify-center self-center w-20 border h-8 rounded-full bg-cyan-100 text-lg mt-5 ml-32 "
            onClick={ListMechanicButton}
          >
            Click
          </button>
        </div>
        <div className="bg-black/60 p-8 rounded-lg">
          <p className="text-white text-3xl">For Car Parts Operations</p>
          <button
            className="justify-center self-center w-20 border h-8 rounded-full bg-cyan-100 text-lg mt-5 ml-32"
            onClick={ListCarPartsButton}
          >
            Click
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPage;
