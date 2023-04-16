import React, { useState } from "react";

function App({ handleLogin }) {
  const [input, setInput] = useState({
    email: "",
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [error, setError] = useState({
    email: "",
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "email":
          if (!value) {
            stateObj[name] = "Please enter E-mail.";
          }
          break;

        case "name":
          if (!value) {
            stateObj[name] = "Please enter Name.";
          }
          break;

        case "surname":
          if (!value) {
            stateObj[name] = "Please enter Name.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        case "surname":
          if (!value) {
            stateObj[name] = "Please enter Name.";
          }
          break;
        default:
          break;
      }

      return stateObj;
    });
  };

  return (
    <div className="app">
      <form className="xs:w-96 ml-auto xs:mr-16 mt-12 bg-black/30 flex-column p-6 rounded-xl backdrop-blur">
        <h2 className="text-white text-center text-2xl">Register</h2>
        <p className="text-white mt-4"> E-Mail </p>

        <input
          type="text"
          name="email"
          placeholder="Enter E-mail"
          value={input.email}
          onChange={onInputChange}
          onBlur={validateInput}
          className="w-full h-8 rounded-md mt-2 bg-cyan-100 border"
        ></input>
        {error.email && <span className="text-red-400">{error.email}</span>}
        <p className="text-white mt-4"> Name </p>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={input.name}
          onChange={onInputChange}
          onBlur={validateInput}
          className="w-full h-8 rounded-md mt-2 bg-cyan-100 border"
        ></input>
        {error.name && <span className="text-red-400">{error.name}</span>}
        <p className="text-white mt-4"> Surname </p>
        <input
          type="text"
          name="surname"
          placeholder="Enter Your Name" //
          value={input.surname}
          onChange={onInputChange}
          onBlur={validateInput}
          className="w-full h-8 rounded-md mt-2 bg-cyan-100 border"
        ></input>
        {error.surname && <span className="text-red-400">{error.surname}</span>}
        <p className="text-white mt-4"> Password </p>

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={input.password}
          onChange={onInputChange}
          onBlur={validateInput}
          className="w-full h-8 rounded-md mt-2 bg-cyan-100 border"
        ></input>
        {error.password && (
          <span className="text-red-400">{error.password}</span>
        )}
        <p className="text-white mt-4"> Re-Enter Password </p>

        <input
          type="password"
          name="confirmPassword"
          placeholder="Enter Confirm Password"
          value={input.confirmPassword}
          onChange={onInputChange}
          onBlur={validateInput}
          className="w-full h-8 rounded-md mt-2 bg-cyan-100 border"
        ></input>
        {error.confirmPassword && (
          <p className="text-red-400">{error.confirmPassword}</p>
        )}
        <p className="text-white mt-4"> Phone Number </p>
        <input
          type="phone"
          name="phoneNumber"
          placeholder="Enter Phone Number"
          value={input.phoneNumber}
          onChange={onInputChange}
          onBlur={validateInput}
          className="w-full h-8 rounded-md mt-2 bg-cyan-100 border"
        ></input>
        {error.phoneNumber && (
          <p className="text-red-400">{error.phoneNumber}</p>
        )}

        <button className="w-24 border h-8 rounded-full ml-32 mt-6 bg-cyan-100">
          {" "}
          Register
        </button>

        <div className="flex gap-4 mt-8 justify-around">
          <p className="text-white">Already have an account? </p>
          <a className="italic underline text-white " onClick={handleLogin}>
            Log in
          </a>
        </div>
      </form>
    </div>
  );
}

export default App;
