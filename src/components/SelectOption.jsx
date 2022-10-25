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
          console.log(copy);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  console.log(data.titleList);

  //     let copy = { ...data.data };
  //     console.log(copy);
  //     setData(copy);
  //     console.log(data);

  // 페이지 마운트 시에 titleList 렌더링되고, title값(option태그) 가져오기
  useEffect(() => {
    getData();

    // setTitleList(data);
  }, []);

  return (
    <div className='selectbox'>
      {/* {titleList.map((title, i) => {
        return <Title title={title} i={i} />;
      })} */}
    </div>
  );
}

export default SelectOption;
