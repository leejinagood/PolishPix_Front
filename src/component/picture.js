import '../css/picture.css' ;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Picture() {
  const [imgUrls, setImgUrls] = useState([]); // 첫 번째 이미지 URL들을 저장할 상태

  useEffect(() => {
    axios.get('http://localhost:8080/Contetnt/view') // API 요청
      .then(response => {
        // API에서 받은 데이터를 처리
        const firstImageUrls = response.data.map(post => post.images[0].image_url);
        setImgUrls(firstImageUrls.reverse()); // 첫 번째 이미지 URL들만 역순으로 상태에 저장
      })
      .catch(error => console.log(error)); // 에러 처리
  }, []); // 컴포넌트가 처음 렌더링 될 때만 실행

  return (
    <div className="image-grid">
      {/* imgUrls 배열의 모든 URL을 출력 */}
      {imgUrls.map((url, index) => (
        <img key={index} src={url} alt={`image-${index}`} className="thumb" />
      ))}
    </div>
  );
}

export default Picture;
