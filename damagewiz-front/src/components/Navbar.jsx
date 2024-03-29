import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const handleDamageWiz = () => {
    navigate("/start");
  };

  const handleClick = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleOrder = () => {
    if (localStorage.email != "admin") {
      navigate("/myOrders");
    }
  };

  const getUser = () => {
    var requestOptions = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.token,
      },
      redirect: "follow",
    };
    fetch("http://127.0.0.1:8080/user/" + localStorage.email, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setFirstName(result.firstName);
        setLastName(result.lastName);
        localStorage.userId = result.id;
      })
      .catch((error) => console.log("error", error));
  };
  getUser();

  return (
    <div>
      <div className="flex bg-[#F5F5F58C] h-10 items-center ">
        <div className="left-0 flex ml-5">
          <button className="text-white md:text-xl" onClick={handleDamageWiz}>
            DamageWiz
          </button>
          <p className="text-white md:text-xl ml-5 hidden xs:block">
            {" "}
            Welcome, {firstName} {lastName}
          </p>
        </div>
        <div className="ml-auto flex ">
          <button
            className="text-white md:text-xl mr-5 hidden sm:block"
            onClick={handleOrder}
          >
            My Orders
          </button>
          <button
            className="text-white md:text-xl mr-5 hidden sm:block"
            onClick={handleClick}
          >
            Log Out
          </button>
        </div>
        <Icon
          icon="system-uicons:menu-hamburger"
          color="white"
          height="2rem"
          width="2rem"
          className="sm:hidden mr-3"
          onClick={toggle}
        />
      </div>
      {isOpen && (
        <div className="flex  bg-black/30 backdrop-blur ">
          <div className="ml-auto bg-[#f5f5f5b0] w-32 h-24">
            <ul className="mt-5">
              <li
                className="text-black md:text-xl text-center"
                onClick={handleOrder}
              >
                My Orders
              </li>
              <li
                className="text-black md:text-xl text-center mt-2 "
                onClick={handleClick}
              >
                Log Out
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
