import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminAddCarParts() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-black/30 backdrop-blur">
        <h1>Add Car Parts</h1>
      </div>
      <Footer />
    </div>
  );
}

export default AdminAddCarParts;
