import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.div`
  background: #0879c9;
`;

export const HeaderContent = styled.div`
  margin: 0 auto;

  max-width: 1360px;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;
    height: 120px;
    padding-bottom: 10px;
  }

  > img {
    height: 50px;
  }
`;

export const Content = styled.main`
  max-width: 1360px;
  margin: 0px auto;

  /* background: #ffffff; */
  /* display: flex; */
`;

export const Section = styled.section`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: flex-end; */
  div:nth-child(4n) {
    margin-right: 0;
  }

  div:nth-child(4n + 1) {
    margin-left: 0;
  }

  padding: 0;
  max-width: 1360px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const Search = styled.div`
  margin: 6px 0 6px 0;
`;

export const Product = styled.div`
  width: 23%;
  height: 450px;
  background: #ffffff;
  margin: 1%;

  & > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f4f4f4;
    width: 100%;
    height: 45%;

    img {
      max-height: 90%;
      max-width: 90%;
      margin: 10px;
    }
  }

  & > div:nth-child(2) {
    margin: 10px;
  }

  @media (max-width: 800px) {
    width: 100%;
    & + div {
      margin: 10px 0 10px 0;
    }
  }
`;

export const Price = styled.div`
  margin-top: 15px;

  span {
    font-size: larger;
  }

  strong {
    width: 20px;
    height: 40px;
    margin-top: 5px;
    background: #ff2500;
    color: #ffffff;
    margin-left: 10px;

    border-radius: 25px;

    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 5px;
    padding-right: 5px;
  }

  p {
    margin-top: 4px;

    & > s {
      font-size: small;
      color: #6a696d;
    }
  }
`;
