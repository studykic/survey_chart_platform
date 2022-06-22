import { Input, Form } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { DatePicker } from "antd";
import { useCallback } from "react";
import { Button } from "antd";
import axios from "axios";
import shortid from "shortid";
import MultipleChoice from "../components/MultipleChoice";
import SubjectiveQuestion from "../components/SubjectiveQuestion";

const TemplateSelect = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 70vw;
  height: 20vh;
  left: 50%;
  transform: translateX(-50%);

  background-color: #024059;

  .ant-btn {
    width: 160px;
    height: 55px;
    font-size: 1.2rem;
  }
`;

const FinalSubmit = styled.div`
  position: fixed;

  display: none;
  flex-direction: column;

  opacity: 0;
  transition: all 0.3s;

  justify-content: space-around;
  align-items: center;
  text-align: center;

  font-size: 1.1rem;
  font-weight: 600;

  background-color: rgba(128, 128, 128, 0.8);
  width: 30%;
  height: 35%;

  left: 50%;
  transform: translateX(-50%);
  top: 35%;

  border-radius: 7%;

  z-index: 99;

  .close {
    position: absolute;
    color: #ffffff;
    right: 7%;
    top: 8%;
    width: 7%;
    height: 14%;
    text-align: center;
    border-radius: 5%;
    background-color: #202124;
    cursor: pointer;
  }

  .text {
    position: relative;
    top: 12%;
  }
`;

const TemplateForm = styled(Form)`
  position: relative;

  display: flex;
  flex-direction: column;

  left: 50%;
  transform: translateX(-50%);
  width: 70vw;
  height: auto;
  min-height: 80vh;
  background-color: #181a1b;
  color: white;
  font-size: 1.2rem;
  padding: 7%;

  display: flex;
  justify-content: center;
  align-items: center;

  /* ant-input는 Input.TextArea를 뜻함 */
  .surveyTitle {
    border: 2px solid black;
    border-radius: 7px;
  }

  .TopForm {
    position: absolute;
    top: 0;
    width: 100%;
    height: auto;
    color: white;
    background-color: #024059;
    padding: 20px;
  }
`;

const TitleSurveyBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 25px;
`;

const AddBtn = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 53%;
  right: 0.7%;

  width: 13%;
  height: 20%;

  color: #bfbfbf;

  font-weight: 600;

  div {
    border-radius: 4px;
    background-color: #181a1b;
    padding: 3px;

    width: 100%;
    text-align: center;
    transition: 0.6s;

    cursor: pointer;
  }

  div:hover {
    box-shadow: 0px 0px 15px #181a1b;
  }
`;

const SurveyContainer = styled.div`
  width: 100%;
`;

const Surveying = () => {
  const SubmitModal = useRef(null);

  const DeadLinetodatetime = (date) => {
    let 년 = date.getFullYear();
    let 월 = date.getMonth() + 1;
    let 일 = date.getDate();
    let 시 = date.getHours();
    let 분 = date.getMinutes();
    let 초 = date.getSeconds();

    return `${년}-${월}-${일} ${시}:${분}:${초}`;
  };

  // 객관식 설문 데이터 생성 및 삭제 (배열데이터 map하여 사용 , component key 사용필수 , splice로 삭제도 사용해볼것)

  const [MultipleChoiceKey, setMultipleChoiceKey] = useState([]);
  const [SubjectiveQuestionKey, setSubjectiveQuestionKey] = useState([]);

  const [MultiplechoiceQ, setMultiplechoiceQ] = useState([]);
  const [SubjectiveQ, setSubjectiveQ] = useState([]);

  const [MultiplechoiceQ_Option, setMultiplechoiceQ_Option] = useState({});

  const [MyServeyKey, setMyServeyKey] = useState();
  const [Title, setTitle] = useState();
  const [DeadLine, setDeadLine] = useState();

  const onMultipleChoiceAdd = useCallback(() => {
    const shortkey = shortid.generate();
    setMultipleChoiceKey(MultipleChoiceKey.concat(shortkey));
  }, [MultipleChoiceKey]);

  const onMultipleChoiceRemove = useCallback(
    (e) => {
      // 아래의 MultiplechoiceQ 배열속 질문 요소를 완전히 제거하려면 filter가 아닌 이방식으로 해야함
      const target1 = e.currentTarget.getAttribute("data-multiplechoice-key");
      const target2 = e.currentTarget.getAttribute("index");
      setMultipleChoiceKey(MultipleChoiceKey.filter((data) => data !== target1));
      MultiplechoiceQ.splice(target2, 1);
    },
    [MultipleChoiceKey, MultiplechoiceQ]
  );

  // 주관식 설문 데이터 생성 및 삭제 (배열데이터 map하여 사용 , component key 사용필수)

  const onSubjectiveQuestionAdd = useCallback(() => {
    const shortkey = shortid.generate();
    setSubjectiveQuestionKey(SubjectiveQuestionKey.concat(shortkey));
  }, [SubjectiveQuestionKey]);

  const onSubjectiveQuestionRemove = useCallback(
    (e) => {
      const target = e.currentTarget.getAttribute("data-subjectivequestion-key");
      setSubjectiveQuestionKey(SubjectiveQuestionKey.filter((data) => data !== target));
    },
    [SubjectiveQuestionKey]
  );

  // 입력을 받아서 상태로 저장하는 모듈

  const onMyServeyKey = useCallback((e) => {
    setMyServeyKey(e.target.value);
  }, []);

  const onTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onDeadLine = useCallback((e) => {
    // setDeadLine(e._d);
    setDeadLine(DeadLinetodatetime(e._d));
  }, []);

  let ModalOpen = () => {
    SubmitModal.current.style.display = "flex";

    setTimeout(() => {
      SubmitModal.current.style.opacity = 1;
    }, 200);
  };

  let ModalClose = () => {
    SubmitModal.current.style.opacity = 0;
    setTimeout(() => {
      SubmitModal.current.style.display = "none";
    }, 300);
  };

  let onSubmit = async () => {
    await axios
      .post("http://localhost:8003/postinsert", {
        MyServeyKey: MyServeyKey,
        Title: Title,
        SubjectiveQ: SubjectiveQ,
        MultiplechoiceQ: MultiplechoiceQ,
        MultiplechoiceQ_Option: MultiplechoiceQ_Option,
        DeadLine: DeadLine,
      })
      .then((res) => {})
      .catch((e) => {
        console.error(e, "e");
      })
      .finally(() => {
        window.location.replace("/");
      });
  };

  return (
    <Form onFinish={ModalOpen} style={{ msUserSelect: "none", MozUserSelect: "-moz-none", WebkitUserSelect: "none", userSelect: "none", marginTop: "5vh" }}>
      <FinalSubmit ref={SubmitModal} className="finalSubmit">
        <span className="close" onClick={ModalClose}>
          X
        </span>
        <div className="text">
          동일한 객관식 선택지가 존재하거나 <br /> 빈칸이 있는지 확인후 <br /> 작성 완료 버튼을 눌러주세요.
        </div>
        <Button type="primary" onClick={onSubmit}>
          작성 완료
        </Button>
      </FinalSubmit>
      <TemplateForm className="TemplateForm">
        <div className="TopForm">
          <TitleSurveyBox>
            <Input.TextArea
              onChange={onMyServeyKey}
              className="surveyTitle"
              placeholder="내가 만든 설문만 모아 볼수있는 개인코드를 입력하세요 ( 10자 이내)"
              style={{ fontSize: "1rem", width: "45vw", height: "37px", backgroundColor: "#181A1B", color: "white", border: "none" }}
              maxLength={10}
            ></Input.TextArea>
            <Input.TextArea
              onChange={onTitle}
              className="surveyTitle"
              placeholder="설문 제목을 입력하세요 ( 50자)"
              style={{ fontSize: "1rem", width: "55vw", height: "37px", marginTop: "1rem", backgroundColor: "#181A1B", color: "white", border: "none" }}
              maxLength={50}
            ></Input.TextArea>
            <div className="bottomLine" style={{ bottom: "inherit", backgroundColor: "gray", height: "1px", width: "55vw", display: "block" }}></div>
            <br />
            <DatePicker showTime placeholder="설문의 마감 날짜/시간" onChange={onDeadLine} />
          </TitleSurveyBox>
        </div>
        <br />
        <br />
        <br />

        <SurveyContainer>
          {MultipleChoiceKey.map((MultipleChoiceeItem, index) => (
            <span key={MultipleChoiceeItem}>
              <MultipleChoice
                key={MultipleChoiceeItem}
                index={index}
                MultipleChoiceeItem={MultipleChoiceeItem}
                MultiplechoiceQ={MultiplechoiceQ}
                MultiplechoiceQ_Option={MultiplechoiceQ_Option}
              />
              <div onClick={onMultipleChoiceRemove} index={index} data-multiplechoice-key={MultipleChoiceeItem}>
                {MultipleChoiceeItem} , 제거버튼
              </div>
            </span>
          ))}

          {/* important point 1. key를 입력하지 않으면 설문제거의 버그가 일어남 */}
          {SubjectiveQuestionKey.map((SubjectiveQuestionItem, index) => (
            <span key={SubjectiveQuestionItem}>
              <SubjectiveQuestion SubjectiveQuestionItem={SubjectiveQuestionItem} index={index} SubjectiveQ={SubjectiveQ} />
              <div onClick={onSubjectiveQuestionRemove} data-subjectivequestion-key={SubjectiveQuestionItem}>
                {SubjectiveQuestionItem} , 제거버튼
              </div>
            </span>
          ))}
        </SurveyContainer>
      </TemplateForm>

      <AddBtn>
        <div onClick={onMultipleChoiceAdd}>
          <PlusCircleOutlined style={{ marginRight: "10px", fontSize: "1rem" }} />
          객관식 설문 추가
        </div>

        <div onClick={onSubjectiveQuestionAdd}>
          <PlusCircleOutlined style={{ marginRight: "10px", fontSize: "1rem" }} />
          주관식 설문 추가
        </div>
      </AddBtn>

      <br />
      <br />
      <br />
      <br />
      <TemplateSelect>
        <Button type="primary" htmlType="submit">
          설문 작성 완료
        </Button>
      </TemplateSelect>
    </Form>
  );
};

export default Surveying;
