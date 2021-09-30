import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function CodeInputMain ({ codeInputInfo, setCodeInputInfo }) {
  const [userCodeCard, setUserCodeCard] = useState({
    codeContent: '',
    textContent: ''
  });
  const postState = useSelector((state) => state.codePostReducer);
  const { codePost } = postState;

  const handleInputValue = (key) => (e) => {
    setUserCodeCard({ ...userCodeCard, [key]: e.target.value });
  };

  useEffect(()=>{
    setCodeInputInfo({ ...codeInputInfo, codeContent: userCodeCard.codeContent, textContent: userCodeCard.textContent});
  },[userCodeCard])

  return (
    <div className='codeinputmain'>
      <div className='codeinputmain-container'>
        <textarea
          type='text'
          className='codeinputmain-code'
          placeholder='코드를 입력하세요.'
          onChange={handleInputValue('codeContent')}
        ></textarea>
        <textarea
          type='text'
          className='codeinputmain-text'
          placeholder='설명을 입력하세요.'
          onChange={handleInputValue('textContent')}
        ></textarea>
      </div>
    </div>
  );
}

export default CodeInputMain;
