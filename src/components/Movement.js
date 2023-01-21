import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../contexts/Context";
import { BeatLoader } from "react-spinners";

export default function Movement() {
  const { token, setTotal } = useContext(AuthContext);
  const [movements, setMovements] = useState([]);
  const [deleteM, setDeleteM] = useState(true);

  useEffect(() => {
    let sum = 0;
    const getmovementsURL = process.env.REACT_APP_GETMOVEMENTS_ROUTE;
    const promise = axios.get(getmovementsURL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    promise.then((response) => {
      setMovements(response.data);
      response.data.forEach((movement) => {
        if (movement.type === "entry") sum += Number(movement.value);
        else sum -= Number(movement.value);
      });
      setTotal(sum);
    });
    promise.catch((err) => {
      alert(err.response.data.message);
    });
  }, [deleteM]);

  if (movements === undefined) {
    return <BeatLoader color="#52b6ff" />;
  }

  function deleteMovement(id) {
    const deleteURL = `${process.env.REACT_APP_DELETEMOVEMENT_ROUTE}/${id}`;
    const promise = axios.delete(deleteURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    promise.then(() => {
      setDeleteM(false);
    });
    promise.catch((err) => console.log(err));
  }

  if (movements.length === 0) {
    return (
      <None>
        Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
        começar a trackear!
      </None>
    );
  }
  return (
    <Container>
      {movements.map((movement) => (
        <Item key={movement._id}>
          <Date>{movement.date}</Date>
          <Description>{movement.description}</Description>
          <Value color={movement.type === "exit" ? "red" : "green"}>
            {movement.value}
          </Value>
          <Delete
            onClick={() => {
              if (window.confirm("Deseja realmente apagar este item?")) {
                deleteMovement(movement._id);
                setDeleteM(true);
              }
            }}
          >
            x
          </Delete>
        </Item>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  overflow: auto;
  position: relative;
`;

const Item = styled.div`
  width: 100%;
  font-family: "Raleway";
  font-style: normal;
  display: flex;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  margin-top: 4%;
  color: #c6c6c6;
`;
const Date = styled.div`
  width: 15%;
  color: #c6c6c6;
`;

const Description = styled.div`
  width: 50%;
  color: black;
`;

const Value = styled.div`
  width: 30%;
  color: ${(props) => props.color};
  text-align: right;
  box-sizing: border-box;
  padding-right: 2%;
`;

const Delete = styled.div`
  width: 5%;
  color: #c6c6c6;
  text-align: center;
`;

const None = styled.div`
  margin-top: 5%;
  width: 90%;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
`;
