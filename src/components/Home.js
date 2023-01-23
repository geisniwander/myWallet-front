import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/Context";
import Movement from "./Movement";

export default function Home() {
  const { loading, name, total, movements, setName, setToken } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionExists = localStorage.getItem("myWalletAuthentication");
    if (sessionExists) {
      const user = JSON.parse(sessionExists);
      setName(user.name);
      setToken(user.token);
    }
  }, []);

  function logout() {
    localStorage.removeItem("myWalletAuthentication");
    navigate("/");
  }

  return (
    <ContainerHome>
      <Title>
        <p data-test="user-name">Olá, {name}!</p>
        <ion-icon
          name="log-out-outline"
          onClick={logout}
          data-test="logout"
        ></ion-icon>
      </Title>
      <ContainerInfos>
        <ContainerMovement>
          <Movement />
        </ContainerMovement>{" "}
        <ContainerTotal>
          <Total>
            {movements.length > 0 ? (
              <>
                <span>SALDO</span>
                <Balance
                  color={total >= 0 ? "green" : "red"}
                  data-test="total-amount"
                >
                  {total.toString().replace(".", ",")}
                </Balance>
              </>
            ) : (
              ""
            )}
          </Total>
        </ContainerTotal>
      </ContainerInfos>
      <ContainerButtons>
        <Button
          onClick={() => navigate("/nova-entrada")}
          disabled={loading}
          data-test="new-income"
        >
          <ion-icon name="add-circle-outline"></ion-icon>
          <span>
            <p>Nova</p>
            <p>entrada</p>
          </span>
        </Button>
        <Button
          onClick={() => navigate("/nova-saida")}
          disabled={loading}
          data-test="new-expense"
        >
          <ion-icon name="add-circle-outline"></ion-icon>
          <span>
            <p>Nova</p>
            <p>saída</p>
          </span>
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
  max-height: 68vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 2%;
  position: relative;
`;
const ContainerMovement = styled.div`
  height: 64vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-around;
  background-color: white;
`;
const ContainerTotal = styled.div`
  height: 4vh;
  display: flex;
  background-color: white;
`;
const Title = styled.div`
  width: 85%;
  font-weight: 700;
  font-size: 32px;
  line-height: 50px;
  color: #ffffff;
  margin-bottom: 5%;
  display: flex;
  justify-content: space-between;
  ion-icon {
    font-size: 36px;
  }
`;
const ContainerButtons = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #ffffff;
  margin-top: 4%;
`;
const Button = styled.button`
  width: 45%;
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
  ion-icon {
    font-size: 26px;
  }
  p {
    text-align: left;
  }
`;
const Total = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  box-sizing: border-box;
  padding: 3%;
  bottom: 0;
  left: 0;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  font-weight: 400;
  span {
    font-weight: 700;
  }
`;
const Balance = styled.div`
  color: ${(props) => props.color};
`;
