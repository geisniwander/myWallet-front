import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NewEntry from "./components/NewEntry";
import NewExit from "./components/NewExit";
import SignUp from "./components/SignUp";
import AuthProvider from "./contexts/Context";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/nova-entrada" element={<NewEntry />} />
          <Route path="/nova-saida" element={<NewExit />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
