import { Icon } from "@iconify/react";
import { useState } from "react";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <div className="flex bg-[#F5F5F58C] h-10 items-center ">
        <div className="left-0 flex ml-5">
          <p className="text-white md:text-xl">DamageWiz</p>
          <p className="text-white md:text-xl ml-5 hidden xs:block">
            {" "}
            Welcome, Username
          </p>
        </div>
        <div className="ml-auto flex ">
          <p className="text-white md:text-xl mr-5 hidden sm:block">
            My Orders
          </p>
          <p className="text-white md:text-xl mr-5 hidden sm:block">Log Out</p>
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
              <li className="text-black md:text-xl text-center">My Orders</li>
              <li className="text-black md:text-xl text-center mt-2 ">
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

{
  /* <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10">
  <div className="flex flex-col items-center justify-center h-full">
    <div className="flex flex-col items-center justify-center bg-white w-3/4 h-3/4">
      <p className="text-black md:text-xl">My Orders</p>
      <p className="text-black md:text-xl">Log Out</p>
      <Icon
        icon="system-uicons:close"
        color="black"
        height="2rem"
        width="2rem"
        className="sm:hidden mr-3"
        onClick={toggle}
      />
    </div>
  </div>
</div> */
}
