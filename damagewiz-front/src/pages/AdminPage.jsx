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
      <div className="flex items-center justify-center h-screen bg-black/30 backdrop-blur">
        <div>
          <div>
            <h1 className="text-white text-3xl">For Mechanics Operations </h1>
            <button
              className="justify-center w-20 border h-8 rounded-full bg-cyan-100 text-lg mt-5 mb-5 ml-32 "
              onClick={ListMechanicButton}
            >
              Click
            </button>
          </div>
          <div>
            <h1 className="text-white text-3xl ml-4">
              For Car Parts Operations
            </h1>
            <button
              className="justify-center self-center w-20 border h-8 rounded-full bg-cyan-100 text-lg mt-5 ml-32"
              onClick={ListCarPartsButton}
            >
              Click
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPage;
