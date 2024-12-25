import React, { useState } from 'react';

//이미지
import LogoImage from './image/PolishPix3.png';
import IconPicture from './image/picture.png';
import IconMarker from './image/marker.png';
import IconSearch from './image/search.png';
import IconUser from './image/user.png';

//컴포넌트
import MarkerComponent from './component/marker';
import SearchComponent from './component/search';
import UserComponent from './component/user';
import PictureComponent from './component/picture'; 

import './App.css';

function App() {
  const [content, setContent] = useState();

  //메뉴 클릭 이벤트
  const menuClickButton = e => {
    const { name } = e.target;
    setContent(name);
  };

  //객체 생성
  const selectComponent = {
    Marker: <MarkerComponent />,
    Search: <SearchComponent />,
    User: <UserComponent />,
    Picture: <PictureComponent />,
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={LogoImage} className="logo_img" alt="logo" />
        <table className='menu-table'>
          <td>
            <button onClick={menuClickButton} name='Picture' >
              <img src={IconPicture} className="icon"/>
            </button>
          </td>

          <td>
            <button onClick={menuClickButton} name='Marker' >
              <img src={IconMarker} className="icon"/>
            </button>
          </td>
          
          <td>
            <button onClick={menuClickButton} name='Search' >
              <img src={IconSearch} className="icon"/>
            </button>
          </td>

          <td>
            <button onClick={menuClickButton} name='User' >
              <img src={IconUser} className="icon"/>
            </button>
          </td>
        </table>

        <content>{selectComponent[content]}</content>
      
      </header>

        
    </div>
  );
}

export default App;
