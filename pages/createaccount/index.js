import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import axios from "axios";
import { register } from "../../actions/userAction";
import styles from "../../styles/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  console.log(isAuthenticated, user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      console.log("change be the chsnge");
      setNotification(true);
      router.push("/main");
    }
  }, [isAuthenticated, dispatch, user]);
  useEffect(() => {
    setTimeout(() => {
      setNotification(false);
    }, 2000);
  }, [notification]);
  const handleSubmit = async () => {
    const registerdata = {
      username: username,
      email: email,
      password: password,
    };
    dispatch(register(registerdata));
  };
  return (
    <Container>
      <LoginContainer>
        <div></div>

        <Login>
          <Welcome>Welcome</Welcome>
          <Input
            alt=""
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            alt=""
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            alt=""
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputSubmit
            alt=""
            type="submit"
            value="Create Account"
            onClick={(e) => handleSubmit(e)}
          />
          {notification && (
            <h3 style={{ color: "lightblue", marginTop: "5px" }}>
              U are Authenticated Successfully
            </h3>
          )}
        </Login>

        <Terms
          style={{
            width: "213px",
            fontSize: "12px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <span>terms of use</span>
          <span>privacy policy</span>
          <p>© Punctualiti 2022. All rights reserved</p>
        </Terms>
      </LoginContainer>
      <Assets>
        <img src="./Rectangle 269.png" alt="" width="400" />
        <Title>360° Solution for Asset Management</Title>
        <p
          style={{
            textAlign: "center",
            fontSize: "16px",
            fontFamily: "Nunito Sans",
            letterSpacing: "0.005em",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Assets>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LoginContainer = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 0;
  height: 100vh;
`;

const Assets = styled.div`
  width: 60%;
  height: 100vh;
  background: #1334b3;
  color: #ffffff;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h5`
  font-family: "Nunito Sans";
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 44px;
  /* identical to box height */

  letter-spacing: -0.005em;

  /* White */

  color: #ffffff;
`;

const Welcome = styled.h5`
font-family: 'Nunito Sans';
font-style: normal;
font-weight: 800;
font-size: 32px;
line-height: 44px;
/* identical to box height */

display: flex;
align-items: center;
text-align: center;
letter-spacing: -0.005em;
/* Secondary ISS Dark Blue/100% */5

`;

const Input = styled.input`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  outline: none;

  /* White */

  background: #ffffff;
  /* Grey/Light/100% */

  border: 1px solid #e6e6e6;
  border-radius: 8px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 5px 0;
`;
const InputSubmit = styled.input`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  gap: 8px;
  width: 100%;
  margin: 5px 0;
  /* Primary Persian Blue/125% */
  color: #ffffff;
  outline: none;
  border: none;
  background: #1334b3;
  border-radius: 8px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  cursor: pointer;
`;

const Login = styled.div`
  display: flex;
  justify-content: center;
  width: 85%;
  flex-direction: column;
  align-items: center;
`;
const Terms = styled.div``;
