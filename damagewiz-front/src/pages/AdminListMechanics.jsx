import { Form, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useState } from "react";
import { Input } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

let originData = [];

var requestOptions = {
  method: "GET",
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  redirect: "follow",
};

async function fetchMechanics() {
  await fetch("http://127.0.0.1:8080/mechanic", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        originData.push({
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

await fetchMechanics();
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
const AdminListMechanics = () => {
  const [input, setInput] = useState({
    name: "",
    latitude: "",
    longitude: "",
    phoneNumber: "",
  });
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      id: "",
      name: "",
      latitude: "",
      longitude: "",
      phoneNumber: "",
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

  const addMechanic = async () => {
    var raw = JSON.stringify({
      name: input.name,
      latitude: input.latitude,
      longitude: input.longitude,
      phoneNumber: input.phoneNumber,
    });

    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/admin/add_mechanic", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const deleteMechanic = async (record) => {
    var requestOptions = {
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      redirect: "follow",
    };

    fetch(
      "http://localhost:8080/admin/delete_mechanic/" + record.id,
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
      title: "id",
      dataIndex: "id",
      width: "3%",
      editable: true,
      className: "bg-black/30 backdrop-filter backdrop-blur-lg text-white",
    },
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
      className: "bg-black/30 backdrop-filter backdrop-blur-lg text-white",
    },
    {
      title: "latitude",
      dataIndex: "latitude",
      width: "15%",
      editable: true,
      className: "bg-black/30 backdrop-filter backdrop-blur-lg text-white",
    },
    {
      title: "longitude",
      dataIndex: "longitude",
      width: "15%",
      editable: true,
      className: "bg-black/30 backdrop-filter backdrop-blur-lg text-white",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      width: "15%",
      editable: true,
      className: "bg-black/30 backdrop-filter backdrop-blur-lg text-white",
    },
    {
      title: "operation",
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
            <Typography.Link onClick={() => deleteMechanic(record)}>
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
      <div className=" mb-48">
        <Form form={form} component={false}>
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
        <div className="flex  items-center justify-center">
          <form className="xs:w-96  mb-auto xs:mr-16 bg-black/30 flex-column p-6 rounded-xl backdrop-blur">
            <p className="text-white mt-4"> Mechanic Name </p>
            <input
              type="text"
              name="name"
              placeholder="Enter Mechanic Name"
              value={input.name}
              onChange={onInputChange}
              className="w-full h-8 rounded-md mt-2 bg-cyan-100 border"
            ></input>
            <p className="text-white mt-4"> Mechanic Latitude </p>
            <input
              type="latitude"
              name="latitude"
              placeholder="Enter Latitude"
              value={input.latitude}
              onChange={onInputChange}
              className="w-full h-8 rounded-md mt-2 bg-cyan-100 border"
            ></input>
            <p className="text-white mt-4"> Mechanic Longitude </p>
            <input
              type="longitude"
              name="longitude"
              placeholder="Enter Longitude"
              value={input.longitude}
              onChange={onInputChange}
              className="w-full h-8 rounded-md mt-2 bg-cyan-100 border"
            ></input>
            <p className="text-white mt-4"> Mechanic Phone Number </p>
            <input
              type="phoneNumber"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              value={input.phoneNumber}
              onChange={onInputChange}
              className="w-full h-8 rounded-md mt-2 bg-cyan-100 border"
            ></input>
            <button
              className="border w-56 h-8 rounded-full mt-8 ml-16 bg-cyan-100"
              id="button"
              onClick={addMechanic}
            >
              Add Mechanic
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default AdminListMechanics;
