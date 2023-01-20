import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/Context";

export default function Home() {
  const { loading } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <ContainerHome>
      <Title>
      <p>Olá, Fulano!</p>
      <ion-icon name="log-out-outline"></ion-icon>
      </Title>
      <ContainerInfos>
      </ContainerInfos>
      <ContainerButtons>
      <Button onClick={()=>navigate("/nova-entrada")} disabled={loading}>
        <ion-icon name="add-circle-outline"></ion-icon>
        <spam>Nova<br/>Entrada</spam>
      </Button>
      <Button  onClick={()=>navigate("/nova-saida")}  disabled={loading}>
        <ion-icon name="add-circle-outline"></ion-icon>
        <spam>Nova<br/>Saída</spam>
      </Button>
      </ContainerButtons>
    </ContainerHome>
  );
}

const ContainerHome = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #8c11be;

`;

const ContainerInfos = styled.div`
  width: 85%;
  min-height: 68vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 5px;
`;

const Title = styled.div`
  width:85%;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 50px;
  color: #ffffff;
  margin-bottom: 5%;
  display: flex;
  justify-content: space-between;
  ion-icon{
    font-size:36px;
  }
`;


const ContainerButtons = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #ffffff;
  margin-top: 4%;
`;

const Button = styled.button`
  width: 47%;
  height: 114px;
  background-color: #a328d6;
  border-radius: 5px;
  border: none;
  font-style: normal;
  font-size: 20px;
  line-height: 23px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 2%;
  ion-icon{
    font-size:26px;
  }
  spam{
    text-align: left;
  }
`;
