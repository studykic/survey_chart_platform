import React, { useCallback } from "react";
import styled from "styled-components";

import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";

const MyKeyInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  position: relative;
  width: 50vw;
  height: 15vh;

  background-color: #024059;

  left: 50%;
  top: 5vh;
  transform: translateX(-50%);

  text-align: center;

  .MySurveyExplanation {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .MySurveyCode {
    display: flex;
    position: relative;
    justify-content: space-around;
    align-items: center;

    background-color: #181a1b;

    width: 100%;
    height: 40%;
    top: 6px;
  }

  .MySurveyCodeInput {
    margin-left: -14.2%;
    font-size: 1rem;
    width: 40%;
    height: 100%;
    background-color: #181a1b;
    color: white;
    border: none;
    -ms-overflow-style: none;
  }
  /* 개인코드 입력창 스크롤바 제거 */
  .MySurveyCodeInput::-webkit-scrollbar {
    display: none;
  }
`;

const MyPostSection = styled.section`
  position: relative;
  width: 70vw;
  height: auto;
  min-height: 73vh;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
`;

const MyPostItem = styled.div`
  margin-top: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #181a1b;
  padding: 10px;
`;

const MyPostItemTitle = styled.span`
  margin-left: 5%;
  font-weight: 600;
  color: #226dff;
  cursor: pointer;
`;

const MyPostItemDate = styled.span`
  margin-right: 25%;
  border-radius: 7%;
  font-weight: 600;
  color: #bdc3ac;
`;

const PageBTN = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 70px;

  left: 50%;
  transform: translateX(-50%);

  font-size: 1.5rem;

  margin-top: 2%;
  text-align: center;
`;

const MySurvey = ({ SurveyData }) => {
  let [mySurvey, setMySurvey] = useState([]);

  // 입력을 받아서 상태로 저장하는 모듈
  let [state, setState] = useState(null);
  let onInput = useCallback((e) => {
    setState(e.target.value);
  }, []);

  let onSearch = useCallback(() => {
    const found = SurveyData.filter((element) => element.MY_SERVEY_KEY == state);
    setMySurvey(found);
  }, [SurveyData, state]);

  console.log(mySurvey, "mySurvey");

  return (
    <div>
      <MyKeyInput>
        <span className="MySurveyExplanation">설문지를 작성할때 입력한 개인코드를 입력하면 자신의 설문을 모아볼수있습니다</span>
        <div className="MySurveyCode">
          <Input.TextArea
            className="MySurveyCodeInput"
            value={state}
            onChange={onInput}
            placeholder="내 설문지 코드를 이곳에 입력하세요"
            maxLength={10}
          ></Input.TextArea>
          <Button onClick={onSearch} type="primary" style={{ height: "99%" }}>
            내 설문 찾기
          </Button>
        </div>
      </MyKeyInput>

      <MyPostSection>
        {mySurvey.map((myItem, index) => (
          <Link to={`/post/${myItem.BOARD_ID}`} key={index}>
            <MyPostItem>
              <MyPostItemTitle>{myItem.SERVEY_TITLE}</MyPostItemTitle>
              <MyPostItemDate>
                <span style={{ color: "#E6F7FF" }}>작성시간 :</span> {new Date(myItem.SERVEY_REGISTER_DATE).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
              </MyPostItemDate>
            </MyPostItem>
          </Link>
        ))}
      </MyPostSection>
      <PageBTN>
        <LeftCircleOutlined />
        <RightCircleOutlined />
      </PageBTN>
    </div>
  );
};

export default MySurvey;
