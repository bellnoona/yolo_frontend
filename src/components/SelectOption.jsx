import React from 'react';
import { useState, useEffect } from 'react';
// import Title from './Title';
// import Option from './Option';
import axios from 'axios';

function SelectOption() {
  const [data, setData] = useState([]);
  const [groupList, setGroupList] = useState([]);

  // 데이터 가져오는 함수 getData
  function getData() {
    try {
      axios
        .get('https://apigen-server.herokuapp.com/api/621f2588d8d85b8d78eb3e64')
        .then((response) => {
          let copy = { ...response.data.data };
          // 받아온 데이터 정보 저장
          setData(copy);

          // groupList 저장
          let groupCopy = [...response.data.data.groupList];
          setGroupList(groupCopy);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  // 페이지 마운트 시에 렌더링되고, API의 title값(option태그) 가져오기
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {groupList.map((group) => {
        return (
          <select key={group.title}>
            <option
              value={group.title}
              key={group.title}
              // disabled='disabled'
              // defaultValue={group.title[0]}
            >
              {group.title}
            </option>

            {group.options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        );
      })}
    </div>
  );
}

export default SelectOption;
