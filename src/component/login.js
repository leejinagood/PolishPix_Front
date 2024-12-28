import '../css/login.css';

function Login() {
  
  return (
    <div class="root">
        <div class="signin-wrapper form active">
            <div class="form-wrapper">
            <h5 class="login-text">로그인 하세요</h5>
            <input type="text" placeholder="Username" class="form-field"></input>
            <input  type="password" placeholder="Password" class="form-field"></input>
            <button class="button primary">Sign In</button>
            <button class="button secondary" id="click-signup">Sign Up</button>
            </div>
        </div>
    </div>
  );
}

export default Login;