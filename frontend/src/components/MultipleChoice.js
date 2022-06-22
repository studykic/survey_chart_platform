import { Input } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import { useCallback } from "react";
import shortid from "shortid";

const SurveyBox = styled.div`
  margin-top: 100px;

  min-width: 100%;
  max-width: 100%;

  .answerObjectivitybox {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .answerObjectivityItem {
    /* min-width: 85px; */
    width: 249px;
    height: 70px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 9px;
  }

  .multipleChoiceTitle {
    font-size: 1rem;
    width: 99%;
    height: 37px;
    background-color: #181a1b;
    color: #a5a5a6;
    border: none;
  }

  .OptionForm {
    font-size: 1rem;
    color: #a5a5a6;
    height: 55px;
    background-color: #181a1b;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .OptionForm::-webkit-scrollbar {
    display: none;
  }

  .AnswerTypeSelect {
    display: flex;
    justify-content: space-around;
    font-size: 0.9rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .MultipleChoice {
    background-color: #3c5473;
    width: 60px;
    text-align: center;
    padding: 3px;
    color: #9c9489;
    font-weight: 600;
    cursor: pointer;
  }

  .objectivityQuestion {
    background-color: #a8a2a2;
    width: 60px;
    text-align: center;
    padding: 3px;
    color: #353535;
    font-weight: 600;
    cursor: pointer;
  }
`;

const MultipleChoice = ({ index, MultiplechoiceQ, MultiplechoiceQ_Option }) => {
  // 설문 작성 완료가 눌려지면 발동

  let [option, setOption] = useState([]);

  //    MultiplechoiceQ_Option객체의 key값을 배열로 사용하기위해 선택지 추가버튼을 처음 실행시에만 key값을 배열로 만들어줌 Propblem) 선택지 값이 추가될때매다 새배열을 매번 만들어 이전 값이 비는 문제를 해결

  let onOptionAdd = useCallback(() => {
    if (option[0] === undefined) {
      MultiplechoiceQ_Option[index] = [];
    }

    let shortkey = shortid.generate();
    setOption(option.concat(shortkey));
    console.log(option);
  }, [MultiplechoiceQ_Option, index, option]);

  let onOptionRemove = useCallback(
    (e) => {
      const target = e.currentTarget.getAttribute("data-option-key");
      const optionindex = Number(e.currentTarget.getAttribute("optionindex"));

      setOption(option.filter((data) => data !== target));
      MultiplechoiceQ_Option[index].splice(optionindex, 1);
    },
    [MultiplechoiceQ_Option, index, option]
  );

  // 질문 입력을 받아서 상태로 저장하는 모듈

  let onChange = useCallback(
    (e) => {
      MultiplechoiceQ[index] = e.target.value;
    },
    [MultiplechoiceQ, index]
  );

  let onOptionChange = useCallback(
    (e) => {
      // 그냥 getAttribute 허면 문자열로 index를 가져오기에 Number로 변환해줘야함
      const optionindex = Number(e.currentTarget.getAttribute("optionindex"));
      MultiplechoiceQ_Option[index][optionindex] = e.target.value;
    },
    [MultiplechoiceQ_Option, index]
  );

  return (
    <SurveyBox style={{ msUserSelect: "none", MozUserSelect: "-moz-none", WebkitUserSelect: "none", userSelect: "none" }}>
      <Input.TextArea className="multipleChoiceTitle" onChange={onChange} placeholder="설문을 입력하세요"></Input.TextArea>
      <div className="bottomLine" style={{ bottom: "inherit", backgroundColor: "pink", height: "1px", width: "99%", display: "block" }}></div>

      <span onClick={onOptionAdd} style={{ cursor: "pointer" }}>
        <PlusCircleOutlined style={{ marginRight: "10px", marginTop: "20px", fontSize: "1rem" }} />
        선택지 추가2
      </span>

      <br />

      <div className="answerObjectivitybox">
        {option.map((data2, index) => (
          <span key={data2} className="answerObjectivityItem">
            <span onClick={onOptionRemove} index={index} data-option-key={data2} optionindex={index}>
              <MinusCircleOutlined style={{ marginRight: "5px", cursor: "pointer" }} />
            </span>
            <Input.TextArea className="OptionForm" onChange={onOptionChange} optionindex={index} placeholder="선택지를 입력"></Input.TextArea>
          </span>
        ))}
      </div>
      <div
        className="bottomLine"
        style={{ bottom: "inherit", backgroundColor: "green", height: "1px", width: "99%", display: "block", marginTop: "20px" }}
      ></div>
    </SurveyBox>
  );
};

export default MultipleChoice;
