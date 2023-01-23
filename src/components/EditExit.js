import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/Context";
import { BeatLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditExit() {
  const [value, setValue] = useState(undefined);
  const [description, setDescription] = useState("");
  const { loading, editMovement, token, setName, setToken } =
    useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    let tokenSession = undefined;
    const sessionExists = localStorage.getItem("myWalletAuthentication");

    if (sessionExists) {
      const user = JSON.parse(sessionExists);
      setName(user.name);
      setToken(user.token);
      tokenSession = user.token;
    } else {
      tokenSession = token;
    }

    const getURL = `https://mywallet-back-t18p.onrender.com/movimentacoes/${id}`;
    const promise = axios.get(getURL, {
      headers: {
        Authorization: `Bearer ${tokenSession}`,
      },
    });
    promise.then((res) => {
      setValue(res.data.value.toString().replace(".", ","));
      setDescription(res.data.description);
    });
    promise.catch((err) => console.log(err));
  }, []);

  function edit(e) {
    e.preventDefault();
    const valueNumber = Number(value.replace(",", ".")).toFixed(2);
    if (isNaN(valueNumber) || valueNumber <= 0)
      return alert("Informe um valor válido!");
    editMovement(e, id, valueNumber, description, "exit");
  }

  if (value === undefined) {
    return (
      <ContainerBeat>
        <BeatLoader color="white" />
      </ContainerBeat>
    );
  }

  return (
    <ContainerEntry>
      <Title>
        <p>Editar saída</p>
      </Title>
      <Form onSubmit={(e) => edit(e)}>
        <Input
          type="text"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          data-test="registry-amount-input"
          required
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          data-test="registry-name-input"
          required
        />
        <Button type="submit" disabled={loading} data-test="registry-save">
          {" "}
          {loading ? <BeatLoader color="white" /> : "Atualizar saída"}{" "}
        </Button>
      </Form>
    </ContainerEntry>
  );
}

const ContainerEntry = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #8c11be;
`;
const ContainerBeat = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #8c11be;
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
  background-color: #a328d6;
  border-radius: 5px;
  border: none;
  font-style: normal;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
`;
const Title = styled.div`
  width: 85%;
  margin-top: 10%;
  margin-bottom: 10%;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
`;
