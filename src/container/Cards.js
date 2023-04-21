import { useState } from "react";
import { Card } from "antd";
import {
  EditOutlined,
  DeleteFilled,
  HeartOutlined,
  HeartFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "./style.css";

const Cards = ({ user, onEditUser, onDeleteUser }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleEditClick = () => {
    onEditUser(user);
  };

  const handleDeleteClick = () => {
    onDeleteUser(user.id);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      <Card
        className="card"
        actions={[
          isLiked ? (
            <HeartFilled key="like" onClick={handleLike} className="likeIcon" />
          ) : (
            <HeartOutlined
              key="like"
              onClick={handleLike}
              className="likeIcon"
            />
          ),
          <EditOutlined
            key="edit"
            onClick={handleEditClick}
            style={{ fontSize: "18px" }}
          />,
          <DeleteFilled
            key="delete"
            onClick={handleDeleteClick}
            style={{ fontSize: "18px" }}
          />,
        ]}
      >
        <div className="cardContainer">
          <img
            src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
            alt="Avatar"
            className="image"
          />
        </div>
        <div className="cardInfo">
          <h3>{user.name}</h3>
          <div className="info">
            <i aria-label="icon: mail">
              <MailOutlined />
            </i>
            <p>{user.email}</p>
          </div>
          <div className="info">
            <i aria-label="icon: mail">
              <PhoneOutlined />
            </i>
            <p>{user.phone}</p>
          </div>
          <div className="info">
            <i aria-label="icon: mail">
              <GlobalOutlined />
            </i>
            <p>{"http://" + user.website}</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Cards;
