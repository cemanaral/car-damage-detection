import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyOrders() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen ">
        <div className=" backdrop-blur-sm bg-black/50 p-12 rounded-xl h-80">
          <h1 className="text-white text-2xl">Myorders</h1>

          <button className="justify-center self-center w-32 border h-12 rounded-full bg-cyan-100 text-3xl mt-10">
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyOrders;
