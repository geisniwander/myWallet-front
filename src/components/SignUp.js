import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { AuthContext } from "../contexts/Context";
import { useContext } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  function register(e) {
    e.preventDefault();
    setLoading(true);
    const promise = axios.post("http://localhost:5000/sign-up", {
      email: email.toString(),
      name: name.toString(),
      password: password.toString(),
      confirmPassword: confirmPassword.toString(),
    });
    promise.then(() => {
      navigate("/");
      setLoading(false);
    });
    promise.catch((err) => {
      alert(err.response.data.message);
      setLoading(false);
    });
  }

  return (
    <ContainerSignUp>
      <Logo>MyWallet</Logo>
      <Form onSubmit={register}>
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
        />
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <Input
          type="password"
          placeholder="Confirme a senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? <BeatLoader color="white" /> : "Cadastrar"}
        </Button>
      </Form>
      <Link to="/" disabled={loading}>
        <p>Já tem uma conta? Entre agora!</p>
      </Link>
    </ContainerSignUp>
  );
}

const ContainerSignUp = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #8c11be;
  p {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
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
  font-style: normal;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
`;
