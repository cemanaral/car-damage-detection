import { Form, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useState } from "react";
import { Input } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

let originData = [];
let mechanics = [];
let cars = [];
let carParts = [];

var requestOptions = {
  method: "GET",
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  redirect: "follow",
};

async function fetchCarParts() {
  await fetch("http://127.0.0.1:8080/car_part", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        originData.push({
          key: i,
          id: result[i].id,
          name: result[i].partName.name,
          brand: result[i].car.brand,
          model: result[i].car.model,
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

  console.log(mechanics, cars, carParts);
  const [mechanic, setMechanic] = useState(mechanics[0].id);
  const [car, setCar] = useState(cars[0].id);
  const [carPart, setCarPart] = useState(carParts[0].id);
  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      id: "",
      name: "",
      brand: "",
      model: "",
      mechanicName: "",
      price: "",
      laborCost: "",
      ...record,
    });
    setEditingKey(record.id);
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

  for (let i = 0; i < cars.length; i++) {
    if (cars[i].brand + " " + cars[i].model === car) {
      setCar(cars[i].id);
      console.log(car);
    }
  }

  for (let i = 0; i < carParts.length; i++) {
    if (carParts[i].name === carPart) {
      setCarPart(carParts[i].id);
      console.log(carPart);
    }
  }

  const addCarPart = async () => {
    var raw = JSON.stringify({
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
    console.log(id);
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
      id: newData[index].id,
      name: newData[index].name,
      latitude: newData[index].latitude,
      longitude: newData[index].longitude,
      phoneNumber: newData[index].phoneNumber,
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

    fetch("http://127.0.0.1:8080/admin/edit_mechanic", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: "3%",
      editable: true,
    },
    {
      title: "Car Part Name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "Car Part Brand",
      dataIndex: "brand",
      width: "15%",
      editable: true,
    },
    {
      title: "Car Part Model",
      dataIndex: "model",
      width: "15%",
      editable: true,
    },
    {
      title: "Mechanic Name",
      dataIndex: "mechanicName",
      width: "15%",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "15%",
      editable: true,
    },
    {
      title: "Labor Cost",
      dataIndex: "laborCost",
      width: "15%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      width: "15%",
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
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "id" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div>
      <Navbar />
      <div className="mt-20 mb-48">
        <Form form={form} component={false} className="bg-slate-200">
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
        <div className="flex items-center justify-center">
          <form className="xs:w-96  mb-auto xs:mr-16 mt-20 bg-black/30 flex-column p-6 rounded-xl backdrop-blur">
            <p className="text-white mt-4"> Car Part</p>
            <select
              value={carPart}
              onChange={(e) => setCarPart(e.target.value)}
              className=" mt-3 w-full rounded h-8 bg-cyan-100"
            >
              {optionsCarPart}
            </select>
            <p className="text-white mt-4"> Car </p>
            <select
              value={car}
              onChange={(e) => setCar(e.target.value)}
              className=" mt-3 w-full rounded h-8 bg-cyan-100"
            >
              {optionsCar}
            </select>
            <p className="text-white mt-4"> Mechanic</p>
            <select
              value={mechanic}
              onChange={(e) => setMechanic(e.target.value)}
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
