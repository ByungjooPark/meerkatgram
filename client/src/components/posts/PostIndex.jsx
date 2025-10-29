import { useNavigate } from "react-router-dom";

function PostIndex() {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate('/');
    return;
  }

  return (
    <>
      <h1>PostIndex</h1>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default PostIndex;
