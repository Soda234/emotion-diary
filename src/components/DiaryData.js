import React,{ useState } from 'react';
import Button from './Buttons';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';
import { useEffect } from 'react';



const SortMenu = React.memo(({value, onChange, optionList, emotionType, emoitonOptionList, onChange2}) => {
   
    
    return(
        <div>
        <select className='SortMenu' value={value} onChange={(e) => onChange(e.target.value)}> 
            {optionList.map((it, index) =>{
                return(
                <option key={index} value={it.value}>{it.label}</option>
                )
            })}
        </select>

        <select className='SortMenu' value={emotionType} onChange={(e) => onChange2(e.target.value)}> 
            {emoitonOptionList.map((it, index) =>{
                return(
                <option key={index} value={it.value}>{it.label}</option>
                )
            })}
        </select>

        </div>
    )
})


const DiaryData =({diaryData}) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState("lastest");
    const [emotionType, setEmotionType] = useState("all");
    
    const sortOptionList = [
        {value : "lastest", label : "최신순"},
        {value : "oldest", label : "오래된 순"},
    ]

    const emoitonOptionList = [
        {value : "all", label : "전부다"},
        {value : "good", label : "좋은 감정만"},
        {value : "bad", label : "안좋은 감정만"},
    ]

    const getOrderbylist = () =>{

    const compare = (a, b) => { // 차례대로 두개 정수 받은 후 날짜 비교하여 양수면 오름차순 음수면 내림차순으로 정렬
        if(sortType === "lastest"){
            return Number(b.date) - Number(a.date) 
        }
        else{
            return Number(a.date) - Number(b.date)
        }
    }

    const emotionfilter = (emotionlist) =>{
        
        switch (emotionType) {
            case "all":
                return emotionlist;                

            case "good":     
               const goodemotion = emotionlist.filter((it) => it.emotion <= 3)
                return goodemotion

            case "bad":     
                const bademotion = emotionlist.filter((it) => it.emotion > 3)
                return bademotion
            default:
                break;
        }

    }

      const clonelist = JSON.parse(JSON.stringify(diaryData))
      const orderedlist = clonelist.sort(compare)
      const emotionlist = emotionfilter(orderedlist) // 최신 오래된순으로 먼저 정렬을 시킨 값에서 다시 감정점수로 필터를 걸어서 필요한 값만 추출
      return emotionlist
    }

   

    return (
        <div className='DiaryData'>
            <div className='menu_wrapper'>
                <div className='left_col'>  <SortMenu value={sortType} onChange={setSortType} optionList={sortOptionList} emotionType={emotionType} onChange2={setEmotionType} emoitonOptionList={emoitonOptionList}/></div>
                <div className='right_col'><Button type={'success'} text={'새 일기쓰기'} onClick={() => navigate("/new")}/></div>
            </div>
  
          
            {getOrderbylist().map((it) =>{
                return (
                     <DiaryItem key={it.id} {...it}/>
                )
            })}
            
        </div>
    )
}

DiaryData.defaultProps ={
    diaryData : []
}

SortMenu.defaultProps ={
    value : []
}

export default DiaryData;