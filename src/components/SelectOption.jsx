import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import arrowDown from '../assets/image/arrow_down.png';

const DivBody = styled.div`
  height: 100%;
  margin: 8% 0;
`;

const SelectButton = styled.select`
  display: flex;
  width: 80%;
  margin: 10px auto;
  padding: 10px 15px;
  border-radius: 3px;
  border: 1px solid #aaa;
  font-size: 16px;
  background: url(${arrowDown}) no-repeat 97% 50%;
  appearance: none;
  background-color: #fff;
  background-size: 14px;
`;

function SelectOption() {
  const [data, setData] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [countList, setCountList] = useState([]);
  const [checkStock, setCheckStock] = useState({});
  const [disabled, setDisabled] = useState([]);
  console.log(checkStock);

  const handleSelectBox = (e) => {
    console.log(e);
    setDisabled(true);
  };

  // remainCount 체크해서 품절 표시해주는 함수
  const onCheckStock = (countList) => {
    const temp = {};
    countList.map(({ combination, remainCount }) => {
      console.log('combination[0]', combination[0]);
      console.log('temp[combination[0]]', temp[combination[0]]);
      if (!temp[combination[0]]) {
        temp[combination[0]] = 0;
        temp[combination[0]] += remainCount;
      } else {
        temp[combination[0]] += remainCount;
      }
    });

    return temp;
  };

  // console.log('countList', countList);
  console.log(checkStock);

  // 페이지 마운트 시에 렌더링되고, API의 data 가져오기
  useEffect(() => {
    getData();
    onCheckCount();

    // setDisabled(false);
  }, []);

  // 데이터 가져오는 함수 getData
  const getData = async () => {
    try {
      const response = await axios.get(
        'https://apigen-server.herokuapp.com/api/621f2588d8d85b8d78eb3e64'
      );

      // 받아온 데이터 정보 저장
      let copy = { ...response.data.data };
      setData(copy);

      // titleList 저장
      let titleCopy = [...response.data.data.titleList];
      setTitleList(titleCopy);

      // groupList 저장
      let groupCopy = [...response.data.data.groupList];
      setGroupList(groupCopy);

      // countList 저장
      let countCopy = [...response.data.data.countList];
      setCountList(countCopy);

      setDisabled([false, ...new Array(titleCopy.length - 1).fill(true)]);

      setCheckStock(onCheckStock(countCopy));
    } catch (error) {
      console.log(error);
    }
  };

  // 사이즈 select 클릭시 remainCount 계산하여 '품절 혹은 남은 수량' 나타내기
  // remainCount 0인 경우: (품절), n인 경우: (n개 구매가능) => option 옆에 문구 띄워주기!
  // 💡고려사항: 그 사이에 누가 상품을 구매했다? 그럴 경우를 위해 axios 통신을 다시 해야하나?

  // select box 클릭시 데이터 불러와서 option에 구매가능 수량 표시해주기!
  const onCheckCount = async () => {
    try {
      const response = await axios.get(
        'https://apigen-server.herokuapp.com/api/621f2588d8d85b8d78eb3e64'
      );

      // titleList 저장
      let titleCopy = [...response.data.data.titleList];
      setTitleList(titleCopy);

      // groupList 저장
      let groupCopy = [...response.data.data.groupList];
      setGroupList(groupCopy);

      // countList 저장
      let countCopy = [...response.data.data.countList];
      setCountList(countCopy);

      setCheckStock(onCheckStock(countCopy));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DivBody>
      {groupList.map((group, i) => {
        return (
          <SelectButton
            key={group.title}
            defaultValue={group.title}
            onClick={onCheckCount}
            onChange={handleSelectBox}
            disabled={disabled[i]}
          >
            <option value={group.title} key={group.title} disabled='disabled'>
              {group.title}
            </option>

            {group.options.map((option) =>
              checkStock[option] ? (
                <option value={option} key={option}>
                  {option}
                  {/* (`(${}개 구매가능)`) */}
                </option>
              ) : (
                <option value={option} key={option} disabled='disabled'>
                  {`${option} (품절)`}
                </option>
              )
            )}
          </SelectButton>
        );
      })}
    </DivBody>
  );
}

export default SelectOption;
