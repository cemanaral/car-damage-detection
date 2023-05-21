import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card } from "antd";
import { useState, useEffect } from "react";
import "../index.css";

function MyOrders() {
  const [myOrderResponse, setOrders] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      redirect: "follow",
    };

    fetch(
      "http://localhost:8080/my_order/" + localStorage.userId,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setOrders(result);
        // console.log(orders);
      })
      .catch((error) => console.log("error", error));
  }, []);

  let orders = {};

  if (myOrderResponse.length === 0) {
    return "loading";
  } else {
    for (let i = 0; i < myOrderResponse.length; i++) {
      if (orders[myOrderResponse[i].orderId]) {
        orders[myOrderResponse[i].orderId].push(myOrderResponse[i]);
      } else {
        orders[myOrderResponse[i].orderId] = [myOrderResponse[i]];
      }
    }
  }

  console.log(myOrderResponse);
  console.log(orders);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center max-h-full h-screen ">
        <div className="grid gap-5 mt-10 ">
          {Object.keys(orders).map((orderId, idx) => {
            let order = orders[orderId];

            return (
              <Card
                key={idx}
                title={<span className="text-white">Order No: {idx + 1}</span>}
                className=" bg-black/30 backdrop-blur "
              >
                <div className="flex gap-3">
                  {order.map((o, i) => {
                    return (
                      <Card
                        key={i}
                        type="inner"
                        title={
                          <span className="text-white">
                            {o.carPart.car.brand +
                              " " +
                              o.carPart.car.model +
                              " " +
                              o.carPart.partName.name}
                          </span>
                        }
                        className=" bg-black/50 text-white"
                      >
                        <p>Mechanic: {o.carPart.mechanic.name}</p>

                        <p>Price: {o.carPart.price}$</p>
                        <p>Labor Cost: {o.carPart.laborCost}$ </p>
                        <p className="underline">
                          Total Cost:{" "}
                          {parseInt(o.carPart.price) +
                            parseInt(o.carPart.laborCost)}
                          $
                        </p>
                      </Card>
                    );
                  })}
                </div>
              </Card>
            );
          })}
          ;
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default MyOrders;
