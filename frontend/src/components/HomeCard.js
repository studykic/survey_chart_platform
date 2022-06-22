import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import { Link } from "react-router-dom";

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

const CardTitle = styled.div`
  width: 20vw;
  height: 45vh;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-size: 1.6rem;
  font-weight: 600;
  padding: 1rem;
  border: 0.5px solid black;
  border-radius: 4%;
  overflow: hidden;
  word-wrap: break-word;
`;

const ItemLink = styled(Link)`
  .CardItem {
    width: 20vw;
    height: 55vh;
    border: 1.5px solid black;
    border-radius: 4%;
    background-color: #e8f5e9;
    box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 1);
    cursor: pointer;
    transition: 0.65s;
  }
  .CardItem:hover {
    transform: scale(1.05);
  }
  .ant-card-meta-title {
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

const HomeCard = ({ cardData }) => {
  let timeSource = cardData.SERVEY_REGISTER_DATE;
  let dateObj = new Date(timeSource);
  let timeString_KR = dateObj.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

  return (
    <ItemLink to={`/post/${cardData.BOARD_ID}`}>
      <Card className="CardItem" hoverable cover={<CardTitle style={{ backgroundColor: getRandomColor() }}>{cardData.SERVEY_TITLE}</CardTitle>}>
        <Card.Meta style={{ textAlign: "center", position: "absolute", left: 0, width: "100%" }} title={`${timeString_KR} 작성`} />
      </Card>
    </ItemLink>
  );
};

export default React.memo(HomeCard);
