import React from "react";
import styled, { keyframes } from "styled-components";

const ChartEffect = keyframes`
0%{
    width:0;
}
100%{
    width:1;
}
`;

const DataEffect = keyframes`
0%{
    left:0;
}
100%{
    left:1;
}
`;

const Container = styled.div`
  width: 40%;
  background: white;
  border-radius: 10px;
  border: ${(props) => props.theme.border};
  box-shadow: ${(props) => props.theme.boxShadow};
`;

const Header = styled.div`
  width: 100%;
  background: #f7f8fb;
  border-bottom: 1px solid #e3e6f0;
  color: #4e73df;
  font-weight: 700;
  font-size: 17px;
  padding: 13px 25px;
`;

const ChartContainer = styled.div`
  padding: 25px;
  width: 100%;
`;

const Wrapper = styled.div`
  margin: 10px 0 45px 0;
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  opacity: 0.7;
`;

const Title = styled.div`
  font-weight: 700;
  text-transform: uppercase;
`;

const Unit = styled.div``;

const Data = styled.div<{ range: string }>`
  position: absolute;
  left: ${(props) => props.range};
  top: 1.5px;
  margin-left: 10px;
  opacity: 0.8;
  animation: ${DataEffect} 1s ease-in-out 0.5s;
`;

const BarContainer = styled.div`
  position: relative;
`;

const EmptyBar = styled.div`
  width: 100%;
  height: 20px;
  background: #e3e6ec;
  border-radius: 9px;
  position: absolute;
`;

const FilledBar = styled.div<{ range: string }>`
  width: ${(props) => props.range};
  height: 20px;
  background: ${(props) => props.color};
  border-radius: 9px;
  position: absolute;
  animation: ${ChartEffect} 1s ease-in-out 0.5s;
`;

const Date = styled.div`
  width: 100%;
  text-align: right;
  margin-bottom: 15px;
  opacity: 0.7;
`;

interface Iprops {
  bodyWeight: string;
  muscle: string;
  fat: string;
  bodyFatRate: string;
  createdAt: string;
}

const InbodyChart: React.SFC<Iprops> = ({
  bodyWeight,
  muscle,
  fat,
  bodyFatRate,
  createdAt
}) => {
  return (
    <Container>
      <Header>Latest inbody data</Header>
      <ChartContainer>
        <Date>{`Record date : ${createdAt}`}</Date>
        <Wrapper>
          <ChartHeader>
            <Title>Weight</Title>
            <Unit>(kg)</Unit>
          </ChartHeader>
          <BarContainer>
            <EmptyBar />
            <FilledBar color={"#0061F2"} range={`${bodyWeight}%`} />
            <Data range={`${bodyWeight}%`}>{bodyWeight}</Data>
          </BarContainer>
        </Wrapper>
        <Wrapper>
          <ChartHeader>
            <Title>Muscle</Title>
            <Unit>(kg)</Unit>
          </ChartHeader>
          <BarContainer>
            <EmptyBar />
            <FilledBar color={"#F4A100"} range={`${muscle}%`} />
            <Data range={`${muscle}%`}>{muscle}</Data>
          </BarContainer>
        </Wrapper>
        <Wrapper>
          <ChartHeader>
            <Title>fat</Title>
            <Unit>(kg)</Unit>
          </ChartHeader>
          <BarContainer>
            <EmptyBar />
            <FilledBar color={"#00AC69"} range={`${fat}%`} />
            <Data range={`${fat}%`}>{fat}</Data>
          </BarContainer>
        </Wrapper>
        <Wrapper>
          <ChartHeader>
            <Title>Body fat rate</Title>
            <Unit>(%)</Unit>
          </ChartHeader>
          <BarContainer>
            <EmptyBar />
            <FilledBar color={"#E81500"} range={`${bodyFatRate}%`} />
            <Data range={`${bodyFatRate}%`}>{bodyFatRate}</Data>
          </BarContainer>
        </Wrapper>
      </ChartContainer>
    </Container>
  );
};

export default InbodyChart;
