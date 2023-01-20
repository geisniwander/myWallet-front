import styled from "styled-components";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/Context";
import { BeatLoader } from "react-spinners";

export default function NewExit() {
  const [value, setValue] = useState(undefined);
  const [description, setDescription] = useState("");
  const { loading } = useContext(AuthContext);

  return (
    <ContainerExit>
      <Title>
      <p>Nova saída</p>
      </Title>    
      <Form >
        <Input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          required
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          required
        />
        <Button type="submit" disabled={loading}>
          {" "}
          {loading ? <BeatLoader color="white" /> : "Salvar saída"}{" "}
        </Button>
      </Form>
    </ContainerExit>
  );
}

const ContainerExit = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #8C11BE;
`;

const Form = styled.form`
  width: 85%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  height: 58px;
  margin: 2%;
  background: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
`;
const Button = styled.button`
  width: 100%;
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

const Title = styled.div`
  width:85%;
  margin-top:10%;
  margin-bottom:10%;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
`;