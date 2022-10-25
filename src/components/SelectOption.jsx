import React from 'react';
import { useState, useEffect } from 'react';
import Title from './Title';
import axios from 'axios';

function SelectOption() {
  const [data, setData] = useState([]);
  const [titleList, setTitleList] = useState([]);

  // 데이터 가져오는 함수 getData
  function getData() {
    try {
      axios
        .get('https://apigen-server.herokuapp.com/api/621f2588d8d85b8d78eb3e64')
        .then((response) => {
          // setData(response);
          // console.log(response.data.data);
          let copy = { ...response.data.data };
          // console.log(copy);
          setData(copy);

          let titleCopy = [...response.data.data.titleList];
          setTitleList(titleCopy);

          console.log(copy);
          console.log(titleCopy);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  console.log(data);
  console.log(titleList);

  // 페이지 마운트 시에 렌더링되고, API의 title값(option태그) 가져오기
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='selectbox'>
      {titleList.map((title, i) => {
        return <Title title={title} i={i} />;
      })}
    </div>
  );
}

export default SelectOption;
