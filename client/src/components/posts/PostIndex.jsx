import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postIndex } from "../../store/thunks/postThunk.js";
import { setLogout } from "../../store/slices/authSlices.js";

function PostIndex() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const posts = useSelector(state => state.post.index);

  useEffect(() => {
    dispatch(postIndex());
  }, [dispatch]);

  function logout() {
    dispatch(setLogout());
    navigate('/');
    return;
  }

  return (
    <>
      <h1>PostIndex</h1>
      <button onClick={logout}>Logout</button>
      <div className="posts-container">
        {
          posts && posts.map(item => {
            return (
              <div key={item.id}>
                <h3>{item.title}</h3>
                <img src={item.image} alt="" width="200px" height="200px" />
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default PostIndex;
