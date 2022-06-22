import { Route, Routes, Switch } from "react-router-dom";

import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import styled from "styled-components";

import Surveying from "./pages/Surveying";
import SearchResult from "./components/SearchResult";
import MySurvey from "./components/MySurvey";
import HomeMenu from "./components/HomeMenu";
import axios from "axios";
import SurveyPost from "./components/SurveyPost";

const MyFooter = styled.footer`
  position: absolute;
  padding: 5px;
  border: 2px solid black;
  background-color: #1d2021;
  color: #9c9489;
  width: 100%;
  height: 15vh;
  font-weight: 500;
`;

const TopBtn = styled.a`
  display: flex;
  position: fixed;

  justify-content: center;
  align-items: center;
  right: 0.5vw;
  top: 76vh;

  width: 2.3rem;
  height: 2.3rem;

  font-size: 1rem;
  font-weight: 100;

  border: 1px solid black;
  border-radius: 50%;
  background-color: black;
  color: white;
`;

const App = () => {
  let [homeCardData, setHomeCardData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8003/boardlist").then((res) => {
      setHomeCardData(res.data);
    });
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#236C4E" }}>
      <HomeMenu />
      <Routes>
        <Route exact path="/" element={<Home SurveyData={homeCardData} />} />
        <Route path="/surveying" element={<Surveying />} />

        <Route path="/search/query/:SEARCH_VALUE" element={<SearchResult SurveyData={homeCardData} />} />
        <Route path="/Writer_id/post" element={<MySurvey SurveyData={homeCardData} />} />

        {/* 이 컴포넌트를 상세페이지로 만들기 이때 주소별로 <SurveyPost/>를 인스턴스화 시켜야함 */}

        <Route path="/post/:BOARD_ID" element={<SurveyPost />} />
      </Routes>

      <TopBtn href="#top">Top</TopBtn>

      <br />
      <br />
      <br />
      <MyFooter>
        문의사항&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;고객요청사항에 남기시거나, study6819789@gmail.com에 문의를 남겨주세요.
        <hr />
        <div style={{ position: "absolute", bottom: "0px" }}>
          Copyright © 2022 KIC Inc. 모든 권리 보유
          <br />
          Establishment&nbsp;&nbsp;강익치
        </div>
      </MyFooter>
    </div>
  );
};

export default App;
