import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  const ListMechanicButton = () => {
    navigate("/listMechanic");
  };
  const AddMechanicButton = () => {
    navigate("/addMechanic");
  };
  const EditMechanicButton = () => {
    navigate("/editMechanic");
  };
  const DeleteMechanicButton = () => {
    navigate("/deleteMechanic");
  };
  const ListCarPartsButton = () => {
    navigate("/listCarPart");
  };
  const AddCarPartsButton = () => {
    navigate("/addCarPart");
  };
  const EditCarPartsButton = () => {
    navigate("/editCarPart");
  };
  const DeleteCarPartsButton = () => {
    navigate("/deleteCarPart");
  };

  return (
    <div>
      <Navbar />
      <div className="items-center justify-center h-screen bg-black/30 backdrop-blur">
        <div>
          <h1 className="text-white">For Mechanics </h1>
          <button
            className="justify-center self-center w-32 border h-12 rounded-full bg-cyan-100 text-3xl "
            onClick={ListMechanicButton}
          >
            List
          </button>
          <button
            className="justify-center self-center w-32 border h-12 rounded-full bg-cyan-100 text-3xl "
            onClick={AddMechanicButton}
          >
            Add
          </button>
          <button
            className="justify-center self-center w-32 border h-12 rounded-full bg-cyan-100 text-3xl "
            onClick={EditMechanicButton}
          >
            Edit
          </button>
          <button
            className="justify-center self-center w-32 border h-12 rounded-full bg-cyan-100 text-3xl "
            onClick={DeleteMechanicButton}
          >
            Delete
          </button>
        </div>
        <div>
          <h1 className="text-white">For Car Parts</h1>
          <button
            className="justify-center self-center w-32 border h-12 rounded-full bg-cyan-100 text-3xl "
            onClick={ListCarPartsButton}
          >
            List
          </button>
          <button
            className="justify-center self-center w-32 border h-12 rounded-full bg-cyan-100 text-3xl "
            onClick={AddCarPartsButton}
          >
            Add
          </button>
          <button
            className="justify-center self-center w-32 border h-12 rounded-full bg-cyan-100 text-3xl "
            onClick={EditCarPartsButton}
          >
            Edit
          </button>
          <button
            className="justify-center self-center w-32 border h-12 rounded-full bg-cyan-100 text-3xl "
            onClick={DeleteCarPartsButton}
          >
            Delete
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminPage;
