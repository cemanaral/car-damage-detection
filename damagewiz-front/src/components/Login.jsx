import { useState } from "react";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
function Login() {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();
  const handleLogin = () => {
    login ? setLogin(false) : setLogin(true);
  };
  const handleClick = () => {
    if (input.email && input.password) {
      alert("Login Successful");
    } else {
      alert("Please enter all the fields");
    }
    navigate("/start");
  };
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
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

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          }
          break;
      }

      return stateObj;
    });
  };
  if (login) {
    return (
      <form className="xs:w-96 ml-auto mb-auto xs:mr-16 mt-20 bg-black/30 flex-column p-6 rounded-xl backdrop-blur">
        <h2 className="text-white text-center text-2xl">
          Welcome To DamageWiz
        </h2>
        <p className="text-white mt-12 text-center">
          DamageWiz is an app that detects damages of your car and helps you
          find mechanic shops near you.
        </p>
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
        <button
          className="w-24 border h-8 rounded-full mt-8 ml-32 bg-cyan-100"
          onClick={handleClick}
        >
          {" "}
          Log In
        </button>
        <div className="flex gap-4 mt-8 justify-around">
          <p className="text-white">Don't have an account? </p>
          <p className="italic underline text-white " onClick={handleLogin}>
            Register
          </p>
        </div>
      </form>
    );
  } else {
    return <Register handleLogin={handleLogin} />;
  }
}

export default Login;
