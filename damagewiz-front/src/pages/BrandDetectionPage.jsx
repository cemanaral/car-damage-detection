import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UploadPhotos from "../components/UploadPhotos";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

function BrandDetectionPage() {
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);
  return (
    <div>
      <Navbar />
      <Icon
        icon="material-symbols:arrow-back-ios-new-rounded"
        color="white"
        width="2rem"
        height="2rem"
        className="absolute top-14 left-8 bg-black/30 rounded-full w-12 h-12 p-2"
        onClick={handleClick}
      />
      <div className="flex items-center justify-center h-screen ">
        <div className=" backdrop-blur-sm bg-black/50 p-12 rounded-xl h-80">
          <h1 className="text-white text-2xl">
            Select Photos For Brand/Model Detection
          </h1>
          <UploadPhotos />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BrandDetectionPage;
