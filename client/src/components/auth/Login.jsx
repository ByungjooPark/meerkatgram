import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../store/thunks/authThunk.js";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    dispatch(loginThunk({email, password}));
  }
  return (
    <>
      <h1>Login</h1>
      <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
      <br />
      <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
      <button type="button" onClick={login}>로그인</button>
    </>
  )
}

export default Login;
