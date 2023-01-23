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
    const signinURL = `${process.env.REACT_APP_API_URL}/sign-in`;
    e.preventDefault();
    setLoading(true);
    const promise = axios.post(signinURL, {
      email: email.toString(),
      password: password.toString(),
    });
    promise.then((response) => {
      setToken(response.data.token);
      setName(response.data.name);
      navigate("/home");
      setLoading(false);
    });
    promise.catch((err) => {
      alert(err.response.data.message);
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
    const postURL = `${process.env.REACT_APP_API_URL}/movimentacoes`;
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
    const putURL = `${process.env.REACT_APP_API_URL}/editar-entrada/${id}`;
    const promise = axios.put(putURL, body, config);
    promise.then(() => {
      navigate("/home");
    });
    promise.catch((err) => console.log(err));
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
        setMovements
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
