import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [movements, setMovements] = useState([]);
  const navigate = useNavigate();

  function login(e, email, password) {
    const signinURL = `https://mywallet-back-t18p.onrender.com/sign-in`;
    e.preventDefault();
    setLoading(true);
    const promise = axios.post(signinURL, {
      email: email.toString(),
      password: password.toString(),
    });
    promise.then((response) => {
      setToken(response.data.token);
      setName(response.data.name);
      const user = { name: response.data.name, token: response.data.token };
      const userSerialized = JSON.stringify(user);
      localStorage.setItem("myWalletAuthentication", userSerialized);
      navigate("/home");
      setLoading(false);
    });
    promise.catch((err) => {
      alert(err.response.data);
      setLoading(false);
    });
  }

  function postMovement(e, value, description, type) {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = { value, description, type };
    const postURL = `https://mywallet-back-t18p.onrender.com/movimentacoes`;
    const promise = axios.post(postURL, body, config);
    promise.then(() => {
      navigate("/home");
    });
    promise.catch((err) => console.log(err));
  }

  function editMovement(e, id, value, description, type) {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = { value, description, type };
    const putURL = `https://mywallet-back-t18p.onrender.com/editar-entrada/${id}`;
    const promise = axios.put(putURL, body, config);
    promise.then(() => {
      navigate("/home");
    });
    promise.catch((err) => console.log(err));
  }

  function verifySession() {
    const sessionExists = localStorage.getItem("myWalletAuthentication");
    if (sessionExists) {
      const user = JSON.parse(sessionExists);
      setName(user.name);
      setToken(user.token);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        token,
        name,
        loading,
        setLoading,
        total,
        setTotal,
        postMovement,
        editMovement,
        movements,
        setMovements,
        setName,
        setToken,
        verifySession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
