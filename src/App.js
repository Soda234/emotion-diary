import React, { useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import Button from './components/Buttons'; // CUSTOM BUTTON
import Header from './components/Header';
import Title from './pages/Title';
import { useEffect } from 'react';



const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT':{
      return action.data
    }
  
    case 'CREATE':{
      const newItem = {
        ...action.data
      }
      newState = [newItem, ...state]
      break;
    }

    case 'REMOVE':{
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }

    case 'EDIT':{
      newState = state.map((it) => it.id === action.data.id ? {...action.data} : it )
      break;
    }

    default:
      return state;

  }

  localStorage.setItem('diray', JSON.stringify(newState))
  
  return newState;

}

export const DiaryDataContext = React.createContext()
export const DiaryDispatchContext = React.createContext()



function App() {

  useEffect(() => {
    const localData = localStorage.getItem('diray')
    if(localData){
      const diaryList = JSON.parse(localData).sort((a,b) => Number(b.id) - Number(a.id))
      
      if(diaryList.length >= 1){
      dataId.current = Number(diaryList[0]) + 1
      dispatch({type:"INIT", data:diaryList})
    }
    }
  }, [])





  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const onCreate = (date, content, emotion) => {
    dispatch({type : "CREATE", data:{
      id : dataId.current,
      date : new Date(date).getTime(),
      content,
      emotion
    }
  })
   dataId.current += 1;
  }

  const onRemove = (targetId) => {
    dispatch({type : "REMOVE", targetId})
  }

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({type : "EDIT", data:{
      id : targetId,
      date : new Date(date).getTime(),
      content,
      emotion
    }
  })
  }


  return (
    <DiaryDataContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate, onRemove, onEdit
      }}>
    <BrowserRouter>
    <div className="App">
    
    <Routes>
      <Route path="/" element={<Title />}/>
      <Route path="/Home" element={<Home />}/>  {/* 특정 경로일경우 해당하는 컴포넌트 랜더링 */}
      <Route path="/new" element={<New />}/>
      <Route path="/edit/:id" element={<Edit />}/>
      <Route path="/diary/:id" element={<Diary />}/>

    </Routes>    

    </div>
    </BrowserRouter>
    </DiaryDispatchContext.Provider>
    </DiaryDataContext.Provider>
  );
}

export default App;
