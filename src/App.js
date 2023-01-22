import "./App.css";
import fktImage from "./image/fktLogo.png";
import styled from "styled-components";
import { useRef, useState } from "react";

const CursorImage = styled.div`
  z-index: 998;
  width: 8rem;
  height: 8rem;
  position: absolute;
  top: ${(props) => `${props.positionY}px`};
  left: ${(props) => `${props.positionX}px`};
  transform: translate(-50%, -50%);
  img {
    height: 8rem;
    width: 8rem;
    filter: invert(82%) sepia(28%) saturate(4599%) hue-rotate(79deg) brightness(103%) contrast(110%);
  }
`;

const PaintImage = styled.div`
  width: ${(props) => `${props.size}rem`};
  height: ${(props) => `${props.size}rem`};
  position: absolute;
  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
  transform: translate(-50%, -50%);
  img {
    height: ${(props) => `${props.size}rem`};
    width: ${(props) => `${props.size}rem`};
    filter: ${(props) => props.color};
  }
`;

const Background = styled.div`
  /* background-color: #01ff52; */
  background-color: black;
  position: relative;
  cursor: none;
  height: 100vh;
  width: 100vw;
`;

function App() {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [paint, setPaint] = useState([]);
  const colors = [
    // FKT 형광 초록
    "invert(79%) sepia(31%) saturate(5351%) hue-rotate(84deg) brightness(107%) contrast(105%)",
    // 레드
    "invert(37%) sepia(69%) saturate(7045%) hue-rotate(325deg) brightness(101%) contrast(102%)",
    // 노랑
    "invert(94%) sepia(42%) saturate(5369%) hue-rotate(341deg) brightness(112%) contrast(103%)",
    // 하늘
    "invert(96%) sepia(46%) saturate(6667%) hue-rotate(134deg) brightness(99%) contrast(84%)",
    // 초록
    "invert(16%) sepia(62%) saturate(1399%) hue-rotate(110deg) brightness(98%) contrast(97%)",
    // 보라
    "invert(20%) sepia(74%) saturate(3622%) hue-rotate(290deg) brightness(117%) contrast(136%)",
    // 파랑
    "invert(20%) sepia(56%) saturate(4675%) hue-rotate(244deg) brightness(60%) contrast(145%)",
    // 연보라
    "invert(73%) sepia(84%) saturate(5722%) hue-rotate(214deg) brightness(109%) contrast(126%)",
    // 오렌지
    "invert(68%) sepia(51%) saturate(5829%) hue-rotate(352deg) brightness(105%) contrast(101%)",
    // 연핑크
    "invert(99%) sepia(13%) saturate(4201%) hue-rotate(196deg) brightness(101%) contrast(101%)",
    // 청록
    "invert(36%) sepia(6%) saturate(4284%) hue-rotate(150deg) brightness(95%) contrast(104%)",
  ];
  const cursorControl = (e) => {
    setPositionX(e.clientX);
    setPositionY(e.clientY);
  };

  const makePaint = (e) => {
    const colorNumber = Math.floor(Math.random() * 10, 0);

    const size = window.outerWidth >= 800 ? Math.round(Math.random() * 25 + 5, 0) : Math.round(Math.random() * 12 + 4, 0);
    setPaint([...paint, { x: e.clientX, y: e.clientY, color: colors[colorNumber], size: size }]);
  };
  return (
    <div className="App">
      <button onClick={() => setPaint([])}>clear</button>
      <Background onClick={(e) => makePaint(e)} onMouseMove={(e) => cursorControl(e)}>
        {window.outerWidth >= 800 ? (
          <CursorImage positionX={positionX} positionY={positionY}>
            <img src={fktImage} alt="fkt-logo"></img>
          </CursorImage>
        ) : (
          ""
        )}
        {paint.map((map, idx) => {
          return (
            <PaintImage key={idx} x={map.x} y={map.y} color={map.color} size={map.size}>
              <img src={fktImage} alt="fkt-logo"></img>
            </PaintImage>
          );
        })}
      </Background>
    </div>
  );
}

export default App;
