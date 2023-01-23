import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/Context";
import { BeatLoader } from "react-spinners";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, setName, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionExists = localStorage.getItem("myWalletAuthentication");
    if (sessionExists) {
      const user = JSON.parse(sessionExists);
      setName(user.name);
      setToken(user.token);
      navigate("/home");
    }
  }, []);

  return (
    <ContainerLogin>
      <Logo>MyWallet</Logo>
      <Form onSubmit={(e) => login(e, email, password)}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          data-test="email"
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          data-test="password"
          required
        />
        <Button type="submit" disabled={loading} data-test="sign-in-submit">
          {" "}
          {loading ? <BeatLoader color="white" /> : "Entrar"}{" "}
        </Button>
      </Form>
      <Link to="/cadastro">
        <p>Primeira vez? Cadastre-se!</p>
      </Link>
    </ContainerLogin>
  );
}

const ContainerLogin = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #8c11be;
  p {
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
    margin-top: 8%;
  }
  a {
    text-decoration: none;
  }
`;
const Logo = styled.h1`
  font-family: "Saira Stencil One";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 50px;
  color: #ffffff;
  margin-bottom: 7%;
`;
const Form = styled.form`
  width: 80%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  width: 98%;
  height: 58px;
  margin: 2%;
  background: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
`;
const Button = styled.button`
  width: 99%;
  height: 46px;
  margin-top: 2%;
  margin-bottom: 7%;
  background-color: #a328d6;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  line-height: 23px;
  color: #ffffff;
`;
