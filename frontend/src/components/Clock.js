import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useCallback, useEffect } from "react";

const MainText = styled.div`
  display: block;
  text-align: center;
  font-size: 2.5rem;
  font-family: "Cinzel Decorative", cursive;
  background-color: rgba(255, 234, 204, 0.6);
`;

const Clock = () => {
  let [Rtime, setTime] = useState(".");

  const clock = useCallback(() => {
    let time = new Date();

    let month = time.getMonth();
    let date = time.getDate();
    let day = time.getDay();
    let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    let TimeText =
      // eslint-disable-next-line no-useless-concat
      `Today is ${week[day]} , ${month + 1}/${date}, ` +
      `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}` +
      " Have a nice day";

    return TimeText;
  }, []); // prev를 사용하면 state값을 불러온다 !로 반전값을 준다

  useEffect(() => {
    setInterval(() => {
      setTime(clock());
    }, 1000);
  }, []);
  return (
    <>
      <MainText style={{ fontFamily: "Reenie Beanie" }}>{Rtime}</MainText>
    </>
  );
};

export default Clock;
