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
  distance,
}) {
  const [buttonName, setButtonName] = useState("Add");
  const handleClick = () => {
    handeChange();
  };

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
        <p> 📍 {distance.toFixed(1)} km</p>,
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
