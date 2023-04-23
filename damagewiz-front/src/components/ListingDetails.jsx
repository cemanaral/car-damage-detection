import { Avatar, Button, Card } from "antd";
import { useState } from "react";

const { Meta } = Card;
function ListingDetails({
  partId,
  name,
  price,
  laborCost,
  carName,
  partName,
  mechanicLatitude,
  mechanicLongitude,
}) {
  const [buttonName, setButtonName] = useState("Add");
  const handleClick = () => {
    handeChange();
  };
  function getLocation() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
    console.log(
      "Latitude: " +
        position.coords.latitude +
        " Longitude: " +
        position.coords.longitude
    );
    localStorage.latitude = position.coords.latitude;
    localStorage.longitude = position.coords.longitude;
  }
  getLocation();

  function haversineDistance(lon1, lat1, lon2, lat2) {
    function toRad(x) {
      return (x * Math.PI) / 180;
    }
    var R = 6371; // km

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }
  const handeChange = () => {
    if (buttonName === "Add") {
      let parts = JSON.parse(localStorage.listingPageSelectedParts);
      parts[partId] = { name, price, laborCost, carName, partName };
      localStorage.listingPageSelectedParts = JSON.stringify(parts);
      setButtonName("Remove");
    } else {
      let parts = JSON.parse(localStorage.listingPageSelectedParts);
      delete parts[partId];
      localStorage.listingPageSelectedParts = JSON.stringify(parts);
      setButtonName("Add");
    }
  };
  return (
    <Card
      style={{
        width: 300,
      }}
      cover={
        <img
          alt="example"
          src="https://media.istockphoto.com/id/1034249292/photo/set-of-car-parts-isolated-on-white-background-3d.jpg?s=612x612&w=0&k=20&c=BwXl3LzQau4v40nl9INYToE0mC1SYDA4gBkylspbYis="
        />
      }
      actions={[
        <p>
          {" "}
          📍{" "}
          {haversineDistance(
            parseFloat(localStorage.longitude),
            parseFloat(localStorage.latitude),
            mechanicLongitude,
            mechanicLatitude
          ).toFixed(1)}{" "}
          km
        </p>,
        <p> 🏷️ {price} </p>,
        <p> 👨🏻‍🏭{laborCost} </p>,
        <button onClick={handleClick}> {buttonName} </button>,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
        }
        title={name}
        description={carName + " " + partName}
      />
    </Card>
  );
}

export default ListingDetails;
