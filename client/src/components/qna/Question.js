import { useEffect, useRef } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useFontStyle from "../../utils/useFontStyle";
import effectSound from "../../hooks/effectSound";
import { Howler } from 'howler';
import { useSelector, useDispatch } from "react-redux";
import { pathset } from "../../store/actions/qna/qnaindex";
import { changeView } from "../../store/actions/qna/changeView";

function Qusetion() {
    const { t, i18n } = useTranslation();
    const T = t("qna", { returnObjects: true });
    const dispatch = useDispatch();
    const qnaState = useSelector((state) => state.qnaIndexReducer);
    const index = qnaState.index;

    const question = T[index].question;
    const answerA = T[index].answer[0];
    const answerB = T[index].answer[1];
    const answerC = T[index].answer[2];

    const fontStyle = useFontStyle();
    const jppadding = (index === 5 ? 10 : 7);
    
    const [aAnswer, setaAnswer] = useState('');
    const [bAnswer, setbAnswer] = useState('');
    const [cAnswer, setcAnswer] = useState('');

    const [acount, setaCount] = useState(0);
    const [bcount, setbCount] = useState(0);
    const [ccount, setcCount] = useState(0);

    useEffect(() => {
      if (acount >= answerA.length) return;
      const typingInterval = setInterval(() => {
        setaAnswer((value) => {
          let resulta = value ? value + answerA[acount] : answerA[0];
          setaCount(acount + 1);

          return resulta;
        });
      }, 100);
      return () => {
        clearInterval(typingInterval);
      };
    }, [acount, aAnswer]);
    useEffect(() => {
      if (bcount >= answerB.length) return;
      const typingInterval = setInterval(() => {
        setbAnswer((value) => {
          let resultb = value ? value + answerB[bcount] : answerB[0];
          setbCount(bcount + 1);

          return resultb;
        });
      }, 100);
      return () => {
        clearInterval(typingInterval);
      };
    }, [bcount, bAnswer]);
    useEffect(() => {
      if (ccount >= answerC.length) return;
      const typingInterval = setInterval(() => {
        setcAnswer((value) => {
          let resultc = value ? value + answerC[ccount] : answerC[0];
          setcCount(ccount + 1);
  
          return resultc;
        });
      }, 100);
      return () => {
        clearInterval(typingInterval);
      };
    }, [ccount, cAnswer]);

    const questionClick = (idx)=>{
      dispatch(pathset(idx));
      dispatch(changeView());
    }

    if(answerB === "" || answerC === ""){
      Howler.stop();
      const us = effectSound("/assets/Sound/producer.mp3", 1, true);
      us.play();
      return (
        <InputDiv>
            <div><QMark jppadding={jppadding} font={fontStyle}>랝</QMark></div>
            <div>
                <QTitle jppadding={jppadding} font={fontStyle}>{question}</QTitle>    
            </div>
            <div><QContentP></QContentP></div>
            <QContentP font={fontStyle}>{aAnswer}</QContentP>
            <div><QContentP></QContentP></div>
            <InputText font={fontStyle}></InputText>
            <div></div>
            <ImgDiv><InputBtn onClick={() => questionClick(0)} src="/assets/Qnaimges/inputbtn.png"></InputBtn></ImgDiv>
        </InputDiv>
      );
    }
    return (
        <QDiv jppadding={jppadding}>
            <div><QMark font={fontStyle}>랝</QMark></div>
            <div><QContentP font={fontStyle}>a.</QContentP></div>
            <div><QContentP font={fontStyle}>b.</QContentP></div>
            <div><QContentP font={fontStyle}>c.</QContentP></div>
            <div>
                <QTitle font={fontStyle}>{question}</QTitle>    
            </div>
            <QContentP onClick={() => questionClick(0)} font={fontStyle}>{aAnswer}</QContentP>
            <QContentP onClick={() => questionClick(1)} font={fontStyle}>{bAnswer}</QContentP>
            <QContentP onClick={() => questionClick(2)} font={fontStyle}>{cAnswer}</QContentP>
        </QDiv>
    );
}

const ImgDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 10%; 
`;

const InputBtn = styled.img`
  width: 25px;
  height: 17px;
`;
const InputDiv = styled.div`
  witdh: 100%;
  flex: 1 1 55%;
  margin: 0px 7% 7% 7%;
  background-image: url("/assets/Qnaimges/question.png");
  background-size: 100% 100%;
  overflow: hidden;
  padding : 7% 6% 0 6%;
  
  display: grid;
  grid-template-columns: 7% 90%;
  grid-template-rows: 30% 9% 30%; 
  grid-auto-flow : row;
  grid-column-gap : 2%;
  grid-row-gap: 5%;
  
  @media screen and (min-height: 800px) {
    @media screen and (min-width: 680px){
        padding : 5% 5% 0 5%;
    }
    padding : 13% 5% 0 5%;
  }
  
  @media screen and (min-width: 950px) {
    padding : 2% 5% 0 5%;
  }
`;
const InputText = styled.textarea`
  background: black;
  font-family: ${(props) => props.font || "Ycomputer"};
  color: #00ff00;
  font-size: 17px;
  margin-right: 10%;
`;

const QDiv = styled.div`
  witdh: 100%;
  flex: 1 1 55%;
  margin: 0px 7% 7% 7%;
  background-image: url("/assets/Qnaimges/question.png");
  background-size: 100% 100%;
  overflow: hidden;
  padding : 7% 4.6% 0 4.6%;
  padding-top: ${(props) => props.jppadding}%;
  display: grid;
  grid-template-columns: 7% 90%;
  grid-template-rows: 29% 18% 18% 18%; 
  grid-auto-flow : column;
  grid-column-gap : 2%;
  grid-row-gap: 5%;
  
  @media screen and (min-height: 800px) {
    @media screen and (min-width: 680px){
        padding : 5% 5% 0 5%;
    }
    padding : 13% 5% 0 5%;
  }
  
  @media screen and (min-width: 950px) {
    padding : 2% 5% 0 5%;
  }
`;
// font-family: "Ycomputer";
const QTitle = styled.p`
  font-family: ${(props) => props.font || "Ycomputer"};
  color: #00ff00;
  font-size: ${(props) => props.font==="Ycomputer" ? 21 : 18}px;
  line-height: 24px;
`;

const QMark = styled.p`
  font-family: "Ycomputer";
  color: #00ff00;
  font-size: ${(props) => props.font==="Ycomputer" ? 21 : 18}px;
  line-height: 24px;
  padding: 0 1.4% 0 1.4%;
`;

const QContentP = styled.p`
  font-family: ${(props) => props.font || "Ycomputer"};
  color: #00ff00;
  font-size: ${(props) => props.font==="Ycomputer" ? 17 : 15}px;
  line-height: 22px;
  white-space: pre-wrap;
  padding: 0 1.4% 0 1.4%;
`;
export default Qusetion;