import { Avatar, Card } from "antd";

const { Meta } = Card;
function ListingDetails({ name, price, laborCost, carName, partName }) {
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
      actions={[<p> 📍 KM </p>, <p> 🏷️ {price} </p>, <p> 👨🏻‍🏭{laborCost} </p>]}
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
