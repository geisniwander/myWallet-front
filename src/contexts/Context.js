import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function login(e, email, password) {
    e.preventDefault();
    setLoading(true);
    const promise = axios.post("http://localhost:5000/sign-in", {
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

  return (
    <AuthContext.Provider
      value={{
        login,
        token,
        name,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
