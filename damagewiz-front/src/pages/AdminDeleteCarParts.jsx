import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminDeleteCarParts() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-black/30 backdrop-blur">
        <h1>Delete Car Parts</h1>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDeleteCarParts;
