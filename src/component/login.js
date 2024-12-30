import '../css/login.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  // 이미지 클릭 핸들러
  const handleSignupClick = () => {
    navigate('/signup', {}); 
  };

  return (
    <div class="root">
        <div class="signin-wrapper form active">
            <div class="form-wrapper">
            <h5 class="login-text">로그인 하세요</h5>
            <input type="email" placeholder="Email" class="form-field"></input>
            <input  type="password" placeholder="Password" class="form-field"></input>
            <button class="button primary">Sign In</button>
            <button class="button secondary" onClick={() => handleSignupClick()} >Sign Up</button>
            </div>
        </div>
    </div>
  );
}

export default Login;