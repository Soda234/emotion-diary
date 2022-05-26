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
  
  return newState;

}

export const DiaryDataContext = React.createContext()
export const DiaryDispatchContext = React.createContext()



function App() {

  const dummyData = [
    {
      id : 1,
      emotion : 1,
      content : "test",
      date : 1653453000000
    },
    {
      id : 2,
      emotion : 2,
      content : "test2",
      date : 1653493223796
    },
    {
      id : 3,
      emotion : 3,
      content : "test3",
      date : 1653493223797
    },
    {
      id : 4,
      emotion : 4,
      content : "test4",
      date : 1653493223799
    },
    {
      id : 5,
      emotion : 5,
      content : "test5",
      date : 1653493223799
    },
    {
      id : 6,
      emotion : 5,
      content : "test6",
      date : 1753493223799
    }
  ]


  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(6);

  const onCreate = (date, content, emotion) => {
    dispatch({type : "CREATE", data:{
      id : dataId,
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
