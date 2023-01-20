import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/Context";
import { BeatLoader } from "react-spinners";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useContext(AuthContext);

  return (
    <ContainerLogin>
      <Logo>MyWallet</Logo>
      <Form onSubmit={(e) => login(e, email, password)}>
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <Input
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <Button type="submit" disabled={loading}>
          {" "}
          {loading ? <BeatLoader color="white" /> : "Entrar"}{" "}
        </Button>
      </Form>
      <Link to="/cadastro">
        <p>Não tem uma conta? Cadastre-se!</p>
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
  background-color: #8C11BE;
  p {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    color: #FFFFFF;
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
  background-color:#A328D6;
  border-radius: 5px;
  border: none;
  font-style: normal;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
`;
