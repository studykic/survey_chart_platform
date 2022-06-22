import React, { useEffect } from "react";
import styled from "styled-components";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCallback } from "react";
import axios from "axios";

const SearchSection = styled.section`
  position: relative;
  width: 70vw;
  height: auto;
  min-height: 73vh;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
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

const SearchItem = styled.div`
  margin-top: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #181a1b;
  padding: 10px;
`;

const SearchItemTitle = styled.span`
  margin-left: 5%;
  font-weight: 600;
  color: #226dff;
  cursor: pointer;
`;

const SearchItemDate = styled.span`
  margin-right: 25%;
  border-radius: 7%;
  font-weight: 600;
  color: #bdc3ac;
`;

const SearchResult = () => {
  let [searchData, setSearchData] = useState([]);
  let { SEARCH_VALUE } = useParams();

  console.log(searchData, "searchData");

  useEffect(() => {
    axios
      .get("http://localhost:8003/searchContent", {
        params: {
          SEARCH_VALUE: SEARCH_VALUE,
        },
      })
      .then((res) => {
        console.log(res, "res searchContent");
        setSearchData(res.data);
      });
  }, []);

  console.log(searchData, "searchData");

  return (
    <div>
      <h1 style={{ marginLeft: "8.5vw", fontWeight: 600 }}>검색결과</h1>
      <SearchSection>
        {searchData.map((searchdata) => (
          <Link to={`/post/${searchdata.BOARD_ID}`} key={searchdata.BOARD_ID}>
            <SearchItem>
              <SearchItemTitle>{searchdata.SERVEY_TITLE}</SearchItemTitle>
              <SearchItemDate>{searchdata.SERVEY_REGISTER_DATE}</SearchItemDate>
            </SearchItem>
          </Link>
        ))}
      </SearchSection>

      <PageBTN>
        <LeftCircleOutlined />
        <RightCircleOutlined />
      </PageBTN>
    </div>
  );
};

export default SearchResult;
