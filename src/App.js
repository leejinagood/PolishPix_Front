import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

// 이미지
import LogoImage from './image/PolishPix3.png';
import IconPicture from './image/picture.png';
import IconMarker from './image/marker.png';
import IconSearch from './image/search.png';
import IconUser from './image/user.png';

// 컴포넌트
import MarkerComponent from './component/marker';
import SearchComponent from './component/search';
import UserComponent from './component/user';
import LoginComponent from './component/login';
import PictureComponent from './component/picture';
import BoardComponent from './component/board';  // BoardComponent 추가

import './App.css';

function App() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [content, setContent] = useState('Picture'); // 상태 초기화

  // 메뉴 버튼 클릭 이벤트
  const menuClickButton = e => {
    const { name } = e.target;
    setContent(name); // 상태 업데이트
    // 버튼 클릭 시 해당 라우트로 네비게이션
    navigate(`/${name.toLowerCase()}`);
  };

  const logoClickHandler = () => {
    setContent('Picture'); // 상태 초기화
    navigate("/"); // 네비게이션
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={LogoImage} className="logo_img" alt="logo" onClick={logoClickHandler}/>
        <table className='menu-table'>
          <tr>
            <td>
              <button className="menu-button" onClick={menuClickButton} name='Picture'>
                <img src={IconPicture} className="icon" />
              </button>
            </td>
            <td>
              <button className="menu-button" onClick={menuClickButton} name='Marker'>
                <img src={IconMarker} className="icon" />
              </button>
            </td>
            <td>
              <button className="menu-button" onClick={menuClickButton} name='Search'>
                <img src={IconSearch} className="icon" />
              </button>
            </td>
            <td>
              <button className="menu-button" onClick={menuClickButton} name='User'>
                <img src={IconUser} className="icon" />
              </button>
            </td>
          </tr>
        </table>

        <br />

        {/* Routes 설정 */}
        <Routes>
          <Route path="/" element={<PictureComponent />} />
          <Route path="/marker" element={<MarkerComponent />} />
          <Route path="/search" element={<SearchComponent />} />
          <Route path="/user" element={<UserComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/picture" element={<PictureComponent />} />
          <Route path="/board" element={<BoardComponent />} />
        </Routes>
      </header>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
