import styled from "styled-components";

export const Layout = styled.div`
  background-color: ${({ theme }) => theme.colors.layoutBg};
  background: url("/bg.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  justify-content: flex-start;
  align-items: center;
  padding: 0;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.large}) {
    padding: 2rem 4rem;
  }
`;
