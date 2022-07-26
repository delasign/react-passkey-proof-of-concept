import styled from "styled-components";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 0;
  border: none;
`;

const UserName = styled.input`
  width: 300px;
  height: 60px;
`;

const SignInButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
  width: 300px;
  height: 60px;
  border: none;
  background-color: white;
  padding: 0;
`;

const Copy = styled.div`
  margin-top: 50px;
  color: white;
`;

export default Container;
export { Container, UserName, SignInButton, Copy };
