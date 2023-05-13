import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminAddMechanics() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-black/30 backdrop-blur">
        <h1>Add Mechanics</h1>
      </div>
      <Footer />
    </div>
  );
}

export default AdminAddMechanics;
