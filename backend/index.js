//express 사용하는 보일러태그
const express = require("express");
const app = express();
const mysql = require("mysql");

const PORT = process.env.port || 8003;
// const capstoneDB = mysql.createPool({ host: "127.0.0.1", user: "root", password: "1234", database: "capstoneDB" });
// const answerDB = mysql.createPool({ host: "127.0.0.1", user: "root", password: "1234", database: "answerDB" });
const capstoneDB = mysql.createPool({ host: "127.0.0.1", user: "root", password: "6819et", database: "capstoneDB" });
const answerDB = mysql.createPool({ host: "127.0.0.1", user: "root", password: "6819et", database: "answerDB" });

// 서버단에서 cors 처리하는 방법(express)
const cors = require("cors");
let corsOptions = { origin: "*", credential: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE" };
app.use(cors(corsOptions));

// import 하는 부분
const bodyParser = require("body-parser");

// 아랫부분 적당한 위치에 추가
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// App.js에서 설문지 데이터목록을 조회함 (Home.js에서 사용)
app.get("/boardlist", (req, res) => {
  const sqlQuery = "SELECT *FROM BOARD;";
  capstoneDB.query(sqlQuery, (err, result) => {
    console.log(result, " <- boardlist result 완료되었습니다.  ");
    console.log(err, "<- boardlist err 에러입니다.");

    result.map((item) => (item.SUBJECTIVE_QUESTION = JSON.parse(item.SUBJECTIVE_QUESTION)));
    result.map((item) => (item.MULTIPLECHOICE_QUESTION = JSON.parse(item.MULTIPLECHOICE_QUESTION)));
    result.map((item) => (item.MULTIPLECHOICE_QUESTION_OPTION = JSON.parse(item.MULTIPLECHOICE_QUESTION_OPTION)));
    res.send(result);
  });
});

// SurveyPost.js에서 설문지 데이터를 조회함 (SurveyPost.js에서 사용)
app.get("/boardContent", (req, res) => {
  // sql query 문
  const sql = "SELECT * FROM BOARD WHERE `BOARD_ID` = ?;";
  const values = [req.query.BOARD_ID];

  capstoneDB.query(sql, values, (err, result) => {
    result.map((item) => (item.SUBJECTIVE_QUESTION = JSON.parse(item.SUBJECTIVE_QUESTION)));
    result.map((item) => (item.MULTIPLECHOICE_QUESTION = JSON.parse(item.MULTIPLECHOICE_QUESTION)));
    result.map((item) => (item.MULTIPLECHOICE_QUESTION_OPTION = JSON.parse(item.MULTIPLECHOICE_QUESTION_OPTION)));
    result[0].RequestTime = new Date();
    res.send(result);
    console.log(result, " <- boardContent result 완료되었습니다.  ");
    console.log(err, "<- boardContent err 에러입니다.");
  });
});

app.get("/searchContent", (req, res) => {
  const sql = "SELECT * FROM BOARD WHERE `SERVEY_TITLE` LIKE ?;";
  const values = "%" + req.query.SEARCH_VALUE + "%";

  capstoneDB.query(sql, values, (err, result) => {
    res.send(result);
    console.log(result, " <- searchContent result 완료되었습니다.  ");
    console.log(err, "<- searchContent err 에러입니다.");
  });
});

// surveying.js에서 설문지 데이터를 작성하여 데이터베이스로 저장 (Surveying.js에서 사용)
app.post("/postinsert", (req, res) => {
  let MyServeyKey = req.body.MyServeyKey;
  let Title = req.body.Title;
  let SubjectiveQ = { 0: req.body.SubjectiveQ };
  let SubjectiveQSTR = JSON.stringify(SubjectiveQ);
  let MultiplechoiceQ = { 0: req.body.MultiplechoiceQ };
  let MultiplechoiceQSTR = JSON.stringify(MultiplechoiceQ);
  let MultiplechoiceQ_Option = req.body.MultiplechoiceQ_Option;
  let MultiplechoiceQ_OptionSTR = JSON.stringify(MultiplechoiceQ_Option);
  let DeadLine = req.body.DeadLine;

  const sqlQuery = `insert into BOARD(MY_SERVEY_KEY, SERVEY_TITLE, SUBJECTIVE_QUESTION, MULTIPLECHOICE_QUESTION, MULTIPLECHOICE_QUESTION_OPTION, SERVEY_DEADLINE_DATE) values(?, ?, ?, ?, ?, ?);`;

  const values = [MyServeyKey, Title, SubjectiveQSTR, MultiplechoiceQSTR, MultiplechoiceQ_OptionSTR, DeadLine];
  capstoneDB.query(sqlQuery, values, (err, result) => {
    res.send(result);
    console.log(result, " <- postinsert result 완료되었습니다.  ");
    console.log(err, "<- postinsert err 에러입니다.");
  });
});

//  (answerDB를 연동하여 사용)
// SurveyPost.js에서 설문지 답변 데이터를 작성하여 데이터베이스로 저장
app.post("/answerinsert", (req, res) => {
  let MY_SERVEY_KEY = req.body.BOARD_ID;
  let SubjectiveResponse = JSON.stringify({ 0: req.body.SubjectiveResponse });
  let MultipleChoiceOptionResponse = JSON.stringify(req.body.MultipleChoiceOptionResponse);

  const sqlQuery = `insert into ANSWERBOARD(SERVEY_KEY, SUBJECTIVE_ANSWER, MULTIPLECHOICE_ANSWER) values(?, ?, ?);`;
  const values = [MY_SERVEY_KEY, SubjectiveResponse, MultipleChoiceOptionResponse];

  answerDB.query(sqlQuery, values, (err, result) => {
    console.log(result, " <- answerinsert_1 result 완료되었습니다.  ");
    console.log(err, "<- answerinsert_1 err 에러입니다.");
  });

  const sqlQuery2 = "SELECT * FROM ANSWERBOARD WHERE `SERVEY_KEY` = ?;";
  const values2 = [req.body.BOARD_ID];

  answerDB.query(sqlQuery2, values2, (err, result) => {
    result.map((item) => (item.MULTIPLECHOICE_ANSWER = JSON.parse(item.MULTIPLECHOICE_ANSWER)));
    result.map((item) => (item.SUBJECTIVE_ANSWER = JSON.parse(item.SUBJECTIVE_ANSWER)));

    res.send(result);
    console.log(result, " <- answerinsert_2 result 완료되었습니다.  ");
    console.log(err, "<- answerinsert_2 err 에러입니다.");
  });
});

// get 요청만 넣을경우 차트결과만 반환해준다
app.get("/answerinsert", (req, res) => {
  const sqlQuery = "SELECT * FROM ANSWERBOARD WHERE `SERVEY_KEY` = ?;";
  const values = [req.query.BOARD_ID];

  answerDB.query(sqlQuery, values, (err, result) => {
    result.map((item) => (item.MULTIPLECHOICE_ANSWER = JSON.parse(item.MULTIPLECHOICE_ANSWER)));
    result.map((item) => (item.SUBJECTIVE_ANSWER = JSON.parse(item.SUBJECTIVE_ANSWER)));

    res.send(result);
    console.log(result, " <- answerinsert_get result 완료되었습니다.  ");
    console.log(err, "<- answerinsert_get err 에러입니다.");
  });
});

// PORT번호로 접속이 성공된다면 구현부의 콜백함수를 실행시킨다
app.listen(PORT, () => {
  console.log(`running on port ${PORT}!`);
});
