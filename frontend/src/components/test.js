import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Test = () => {
  const [aa, setAa] = useState("set함수호출 전");

  let kic = "시작 : ";
  let count = 0;

  //함수가 새로만들어지는지 테스트하기
  let 일반함수속변수변경fun = () => {
    count = count + 1;
    console.log("안녕 나는 새함수야");
  };

  useEffect(() => {
    console.log(aa, "aa변경");
  }, [aa]);

  return (
    <div>
      <div
        onClick={() => {
          setAa("set함수호출");
        }}
      >
        {aa}
      </div>

      <div
        onClick={() => {
          일반함수속변수변경fun();
        }}
      >
        일반함수속변수변경fun
      </div>

      <span>{kic}</span>
    </div>
  );
};

export default Test;
