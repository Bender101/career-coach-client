import React from "react";
import { Row, Col } from "antd";
import { Button, Tooltip } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { Typography, Space } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allFromLists } from "../../redux/actions/listsActions";
import {
  deleteFromBlackList,
  deleteAllBlackList,
} from "../../redux/thunk/deleteFromList";

const { Text } = Typography;

const BlackList = () => {
  const listItems = useSelector((store) => store.list);

  const user = useSelector((store) => store.users);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/helper/blacklist/${user.id}`);
      if (response.ok) {
        const blackList = await response.json();
        dispatch(allFromLists(blackList));
      }
    }
    fetchData();
  }, [user.id]);

  const deleteHandler = (id, userId) => {
    dispatch(deleteFromBlackList(id, userId));
  };

  return (
    <div className="main-page">
      <Row className="result-container">
        <Col span={10} className="col col-left">
          <div>
            <Space className="result-column-left" direction="vertical">
              <div className="column">
                <Text strong>Black List</Text>
              </div>
              <div style={{ padding: "10px" }}>
                {listItems.map((el) => (
                  <div
                    className="skill-div"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text>{el.word}</Text>
                    <div className="div-btn">
                      <Tooltip title="delete">
                        <Button
                          danger
                          type="ghost"
                          // type="text"
                          shape="circle"
                          icon={<DeleteTwoTone twoToneColor="red" />}
                          size="small"
                          onClick={() => deleteHandler(el.id, user.id)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            </Space>
            {/* <div style={{display:"flex", justifyContent:"center"}}><Button onClick={()=>deleteAllHandler(user.id)} style={{marginBottom:"5px"}} danger>Очистить все</Button></div> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BlackList;
