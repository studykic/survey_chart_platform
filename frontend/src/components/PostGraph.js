import React, { useCallback, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import styled from "styled-components";

const PostGraph = ({ countdata, Options, index }) => {
  const DivGraph = styled.div`
    min-width: 500px;
    height: 500px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    text {
      fill: rgb(510, 51, 51);
    }
  `;

  let data = [];

  // Options속 요소와 countdata속 MULTIPLECHOICE_ANSWER[index]의 요소를 비교하여 값이 동일할경우 value를 증가시킴

  Options.map((bitem) => {
    let countvalue = 0;
    countdata.map((citem) => {
      let result = citem.MULTIPLECHOICE_ANSWER[index].filter((cfitem) => cfitem === bitem);
      countvalue = countvalue + result.length;
    });
    data.push({ id: bitem, label: bitem, value: countvalue, color: "hsl(120, 70%, 50%)" });
  });

  return (
    <DivGraph>
      <ResponsivePie
        data={data}
        theme={{ legends: { text: { fontSize: 12 } } }}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={5}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 15,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 14,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </DivGraph>
  );
};

export default PostGraph;
