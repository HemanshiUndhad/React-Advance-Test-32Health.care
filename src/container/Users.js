import { Row, Col, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import Cards from "./Cards";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      });
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleSaveUser = (values) => {
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? { ...user, ...values } : user
    );
    setUsers(updatedUsers);
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div>
      {isLoading || users.length == 0 ? (
        <div className="spinner"></div>
      ) : (
        <Row gutter={[30, 32]}>
          {users.map((user) => (
            <Col xs={24} sm={12} md={8} lg={8} xl={6} key={user.id}>
              <Cards
                user={user}
                onEditUser={handleEditUser}
                onDeleteUser={handleDelete}
              />
            </Col>
          ))}
        </Row>
      )}
      <Modal
        title="Edit User"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          form={form}
          onFinish={handleSaveUser}
          initialValues={{
            name: selectedUser?.name,
            email: selectedUser?.email,
            phone: selectedUser?.phone,
            website: selectedUser?.website,
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the user name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input the user email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input the user phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Website"
            name="website"
            rules={[
              { required: true, message: "Please input the user website!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
