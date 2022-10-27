import React from 'react';
import './styles/reset.css';
import './styles/global.css';
import SelectOption from './components/SelectOption';

function App() {
  // API가 변경되어도 재사용할 수 있는 selec box 공통 컴포넌트 <SelectOption />를 가져다 씁니다.
  return <SelectOption />;
}

export default App;
