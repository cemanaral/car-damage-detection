import { Form, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useState } from "react";
import { Input } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

let originData = [];
let mechanics = [];
let cars = [];
let carParts = [];

async function fetchCarParts() {
  var requestOptions = {
    method: "GET",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    redirect: "follow",
  };
  await fetch("http://127.0.0.1:8080/car_part", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        originData.push({
          key: i,
          id: result[i].id,
          name: result[i].partName.name,
          car: result[i].car.brand + " " + result[i].car.model,
          mechanicName: result[i].mechanic.name,
          price: result[i].price,
          laborCost: result[i].laborCost,
        });
      }
      return result;
    })
    .catch((error) => console.log("error", error));
}
await fetchCarParts();

async function GetMechanics() {
  var requestOptions = {
    method: "GET",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    redirect: "follow",
  };

  await fetch("http://127.0.0.1:8080/mechanic", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        mechanics.push({
          key: i,
          id: result[i].id,
          name: result[i].name,
          latitude: result[i].latitude,
          longitude: result[i].longitude,
          phoneNumber: result[i].phoneNumber,
        });
      }
      return result;
    })
    .catch((error) => console.log("error", error));
}
await GetMechanics();

async function getCars() {
  var requestOptions = {
    method: "GET",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    redirect: "follow",
  };

  await fetch("http://127.0.0.1:8080/car", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        cars.push({
          key: i,
          id: result[i].id,
          brand: result[i].brand,
          model: result[i].model,
        });
      }
      return result;
    })
    .catch((error) => console.log("error", error));
}

await getCars();

async function getCarParts() {
  var requestOptions = {
    method: "GET",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    redirect: "follow",
  };

  await fetch("http://127.0.0.1:8080/car_part_names", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        carParts.push({
          key: i,
          id: result[i].id,
          name: result[i].name,
        });
      }
      return result;
    })
    .catch((error) => console.log("error", error));
}

await getCarParts();

let optionsMechanic = mechanics.map((mechanic) => (
  <option key={mechanic.key} value={mechanic.name}>
    {mechanic.name}
  </option>
));

let optionsCar = cars.map((car) => (
  <option key={car.key} value={car.brand + " " + car.model}>
    {car.brand + " " + car.model}
  </option>
));

let optionsCarPart = carParts.map((carPart) => (
  <option key={carPart.key} value={carPart.name}>
    {carPart.name}
  </option>
));

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const AdminListCarParts = () => {
  const [input, setInput] = useState({
    price: "",
    laborCost: "",
  });
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);
  console.log(mechanics, cars, carParts);

  const [mechanic, setMechanic] = useState(mechanics[0].id);
  const [car, setCar] = useState(cars[0].id);
  const [carPart, setCarPart] = useState(carParts[0].id);

  const [mechanicForDropdown, setMechanicForDropdown] = useState(
    mechanics[0].id
  );
  const [carForDropdown, setCarForDropdown] = useState(cars[0].id);
  const [carPartForDropdown, setCarPartForDropdown] = useState(carParts[0].id);

  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      id: "",
      name: "",
      car: "",
      mechanicName: "",
      price: "",
      laborCost: "",
      ...record,
    });
    setEditingKey(record.id);
    setCarPart(record.id);
    setCar(record.id);
    setMechanic(record.id);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  for (let i = 0; i < mechanics.length; i++) {
    if (mechanics[i].name === mechanic) {
      setMechanic(mechanics[i].id);
      console.log(mechanic);
    }
  }

  for (let i = 0; i < mechanics.length; i++) {
    if (mechanics[i].name === mechanicForDropdown) {
      setMechanicForDropdown(mechanics[i].id);
      console.log(mechanicForDropdown);
    }
  }

  for (let i = 0; i < cars.length; i++) {
    if (cars[i].brand + " " + cars[i].model === car) {
      setCar(cars[i].id);
      console.log(car);
    }
  }

  for (let i = 0; i < cars.length; i++) {
    if (cars[i].brand + " " + cars[i].model === carForDropdown) {
      setCarForDropdown(cars[i].id);
      console.log(carForDropdown);
    }
  }

  for (let i = 0; i < carParts.length; i++) {
    if (carParts[i].name === carPart) {
      setCarPart(carParts[i].id);
      console.log(carPart);
    }
  }

  for (let i = 0; i < carParts.length; i++) {
    if (carParts[i].name === carPartForDropdown) {
      setCarPartForDropdown(carParts[i].id);
      console.log(carPartForDropdown);
    }
  }

  const addCarPart = async () => {
    var raw = JSON.stringify({
      car: {
        id: carForDropdown,
      },
      mechanic: {
        id: mechanicForDropdown,
      },
      partName: {
        id: carPartForDropdown,
      },
      price: input.price,
      laborCost: input.laborCost,
    });
    alert(raw);
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: raw,
      redirect: "follow",
    };
    alert(raw);
    await fetch("http://127.0.0.1:8080/admin/add_carpart", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const deleteCarPart = async (record) => {
    var requestOptions = {
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      redirect: "follow",
    };

    fetch(
      "http://localhost:8080/admin/delete_carpart/" + record.id,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setData(data.filter((item) => item.id !== record.id));
  };

  const save = async (id) => {
    let newData;
    let index;
    try {
      const row = await form.validateFields();
      newData = [...data];
      index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }

    var raw = JSON.stringify({
      id: id,
      car: {
        id: car,
      },
      mechanic: {
        id: mechanic,
      },
      partName: {
        id: carPart,
      },
      price: input.price,
      laborCost: input.laborCost,
    });

    var requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: raw,
      redirect: "follow",
    };

    alert(raw);
    fetch("http://127.0.0.1:8080/admin/edit_carpart", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const filterCars = (cars) => (formatter) =>
    cars.map((item) => ({
      text: formatter(item),
      value: formatter(item),
    }));

  const filterMechanics = (mechanics) => (formatter) =>
    mechanics.map((item) => ({
      text: formatter(item),
      value: formatter(item),
    }));

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: "3%",
      editable: false,
      className: "bg-black/30 backdrop-filter backdrop-blur-lg text-white",
    },
    {
      title: "Car Part Name",
      dataIndex: "name",
      filters: [
        {
          text: "Headlamp",
          value: "Headlamp",
        },
        {
          text: "Rear Bumper",
          value: "Rear Bumper",
        },
        {
          text: "Door",
          value: "Door",
        },
        {
          text: "Hood",
          value: "Hood",
        },
        {
          text: "Front Bumper",
          value: "Front Bumper",
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      filterSearch: true,
      width: "25%",
      editable: true,
      className: "bg-black/30 backdrop-filter backdrop-blur-lg text-white",
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <select
            defaultValue={text}
            style={{ width: 120 }}
            onChange={(e) => setCarPart(e.target.value)}
            className="rounded h-7 text-black"
          >
            {carParts.map((carPart) => (
              <option value={carPart.name}>{carPart.name}</option>
            ))}
          </select>
        ) : (
          <div>{text}</div>
        );
      },
    },
    {
      title: "Car Name",
      dataIndex: "car",
      filters: filterCars(cars)((i) => i.brand + " " + i.model),
      onFilter: (value, record) => record.car.indexOf(value) === 0,
      filterSearch: true,
      width: "15%",
      editable: true,
      className: "bg-black/30 backdrop-filter backdrop-blur-lg text-white",
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <select
            defaultValue={text}
            style={{ width: 120 }}
            onChange={(e) => setCar(e.target.value)}
            className="rounded h-7 text-black"
          >
            {cars.map((car) => (
              <option value={car.brand + " " + car.model}>
                {car.brand} {car.model}
              </option>
            ))}
          </select>
        ) : (
          <div>{text}</div>
        );
      },
    },
    {
      title: "Mechanic Name",
      dataIndex: "mechanicName",
      filters: filterMechanics(mechanics)((i) => i.name),
      onFilter: (value, record) => record.mechanicName.indexOf(value) === 0,
      filterSearch: true,
      width: "15%",
      editable: true,
      className: "bg-black/30 backdrop-filter backdrop-blur-lg text-white",
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <select
            defaultValue={text}
            style={{ width: 120 }}
            onChange={(e) => setMechanic(e.target.value)}
            className="rounded h-7 text-black"
          >
            {mechanics.map((mechanic) => (
              <option value={mechanic.name}>{mechanic.name}</option>
            ))}
          </select>
        ) : (
          <div>{text}</div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "15%",
      editable: true,
      className: "bg-black/30 backdrop-filter backdrop-blur-lg text-white",
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <input
            type="text"
            name="price"
            placeholder="Enter Price"
            value={input.price}
            onChange={onInputChange}
            className="rounded h-7 text-black"
          ></input>
        ) : (
          <div>{text}</div>
        );
      },
    },
    {
      title: "Labor Cost",
      dataIndex: "laborCost",
      width: "15%",
      editable: true,
      className: "bg-black/30 backdrop-filter backdrop-blur-lg text-white",
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <input
            type="text"
            name="laborCost"
            placeholder="Enter Labor Cost"
            value={input.laborCost}
            onChange={onInputChange}
            className="rounded h-7 text-black"
          ></input>
        ) : (
          <div>{text}</div>
        );
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      width: "15%",
      className: "bg-black/30 backdrop-filter backdrop-blur-lg text-white",
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                <Typography.Link
                  onClick={() => save(record.id)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Edit
              </Typography.Link>
            )}
            <br />
            <Typography.Link onClick={() => deleteCarPart(record)}>
              Delete
            </Typography.Link>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Navbar />
      <div className="mb-48">
        <Icon
          icon="material-symbols:arrow-back-ios-new-rounded"
          color="white"
          width="2rem"
          height="2rem"
          className="absolute top-14 left-8 bg-black/30 rounded-full w-12 h-12 p-2"
          onClick={handleClick}
        />
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={columns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
        <div className="flex items-center justify-center">
          <form className="xs:w-96  mb-auto xs:mr-16 bg-black/30 flex-column p-6 rounded-xl backdrop-blur">
            <p className="text-white mt-4"> Car Part</p>
            <select
              onChange={(e) => setCarPartForDropdown(e.target.value)}
              className="mt-3 w-full rounded h-8 bg-cyan-100"
            >
              {optionsCarPart}
            </select>
            <p className="text-white mt-4"> Car </p>
            <select
              onChange={(e) => setCarForDropdown(e.target.value)}
              className=" mt-3 w-full rounded h-8 bg-cyan-100"
            >
              {optionsCar}
            </select>
            <p className="text-white mt-4"> Mechanic</p>
            <select
              onChange={(e) => setMechanicForDropdown(e.target.value)}
              className=" mt-3 w-full rounded h-8 bg-cyan-100"
            >
              {optionsMechanic}
            </select>
            <p className="text-white mt-4"> Price </p>
            <input
              type="text"
              name="price"
              placeholder="Enter Price"
              value={input.price}
              onChange={onInputChange}
              className="w-full h-8 rounded-md mt-2 bg-cyan-100 border"
            ></input>
            <p className="text-white mt-4"> Labor Cost </p>
            <input
              type="text"
              name="laborCost"
              placeholder="Enter Labor Cost"
              value={input.laborCost}
              onChange={onInputChange}
              className="w-full h-8 rounded-md mt-2 bg-cyan-100 border"
            ></input>
            <button
              className="border w-56 h-8 rounded-full mt-8 ml-16 bg-cyan-100"
              id="button"
              onClick={addCarPart}
            >
              Add Car Part
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default AdminListCarParts;
