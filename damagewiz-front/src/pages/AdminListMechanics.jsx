import { Form, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useState } from "react";
import { Input } from "antd";

let originData = [];
// let deneme = [];
// for (let i = 0; i < 4; i++) {
//   deneme.push({
//     id: i,
//     name: "Melisa",
//     latitude: "Cem",
//     longitude: "deneme",
//     phoneNumber: "123",
//   });
// }

var requestOptions = {
  method: "GET",
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  redirect: "follow",
};

async function fetchMechanics() {
  await fetch("http://127.0.0.1:8080/mechanic", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        originData.push({
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
  console.log("fetch çalıştı");
  console.log(originData);
}

await fetchMechanics();
console.log(originData);
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
const App = () => {
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
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
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
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      width: "25%",
      editable: true,
    },
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "latitude",
      dataIndex: "latitude",
      width: "15%",
      editable: true,
    },
    {
      title: "longitude",
      dataIndex: "longitude",
      width: "40%",
      editable: true,
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
      width: "40%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
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
  );
};
export default App;
