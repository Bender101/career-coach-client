import { Button, Avatar } from "antd";
import { IdcardTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { uploadAvatarAC } from "../../redux/thunk/usersAC";
import { useState } from "react";
import React from "react";

const Avatarka = () => {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.users);

  const [image, setImage] = useState(null);

  const uploadHandler = async () => {
    dispatch(uploadAvatarAC(image, user.id));
  };
  return (
    <div className="card-avatar">
      {user.avatar ? (
        <img src={`${user.avatar}`} alt="avatar" />
      ) : (
        <img src="/images/avatar.png" alt="avatar" />
      )}
      <div className="avatar-container">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <Button
          onClick={uploadHandler}
          style={{ marginTop: "1em" }}
          type="primary"
          shape="round"
          icon={<IdcardTwoTone />}
          size="large"
        >
          Обновить фото
        </Button>
      </div>
    </div>
  );
};

export default Avatarka;
