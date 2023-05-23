import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Contact from "./pages/Contact";
import StartPage from "./pages/StartPage";
import BrandDetectionPage from "./pages/BrandDetectionPage";
import BrandApprovalPage from "./pages/BrandApprovalPage";
import PartDetectionPage from "./pages/PartDetectionPage";
import PartApprovalPage from "./pages/PartApprovalPage";
import ListingPartsPage from "./pages/ListingPartsPage";
import SummaryPage from "./pages/SummaryPage";
import MyOrders from "./pages/MyOrders";
import AdminPage from "./pages/AdminPage";
import AdminListMechanics from "./pages/AdminListMechanics";
import AdminListCarParts from "./pages/AdminListCarParts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/start" element={<StartPage />} />
      <Route path="/brandDetection" element={<BrandDetectionPage />} />
      <Route path="/brandApproval" element={<BrandApprovalPage />} />
      <Route path="/partDetection" element={<PartDetectionPage />} />
      <Route path="/partApproval" element={<PartApprovalPage />} />
      <Route path="/listingParts" element={<ListingPartsPage />} />
      <Route path="/summary" element={<SummaryPage />} />
      <Route path="/myOrders" element={<MyOrders />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/listMechanic" element={<AdminListMechanics />} />
      <Route path="/listCarPart" element={<AdminListCarParts />} />
    </Routes>
  </Router>
);
