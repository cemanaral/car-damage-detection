import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UploadDamagedPartsPhotos from "../components/UploadDamagedPartsPhotos";

function PartDetectionPage() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen ">
        <div className=" backdrop-blur-sm bg-black/50 p-12 rounded-xl h-80">
          <h1 className="text-white text-2xl">
            Select Photos For Damaged Part Detection
          </h1>
          <UploadDamagedPartsPhotos />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PartDetectionPage;