import moment from "moment";
import { useContext, useEffect, useState } from "react";
import Button from "../components/Buttons";
import DiaryData from "../components/DiaryData";
import Header from "../components/Header";
import { DiaryDataContext } from './../App';

const Home = () => {

 const diaryData = useContext(DiaryDataContext) // App.js에서 설정한 데이터를 Context를 사용하여 받아옴.


  const [data, setData] = useState([]) 
  const [currentDate, setCurrentDate] = useState(moment());

  useEffect(() => { // diaryData와 현재 월의 데이터가 바뀌었을때마다 첫째날 둘째날 값을 구함
    if(diaryData.length !== 0){
    const firstDay = new Date(currentDate.startOf('month')._d).getTime()
    const endDay = new Date(currentDate.endOf('month')._d).getTime()

    setData(diaryData.filter((it) => firstDay <= it.date && it.date <= endDay)) // diaryData의 Date값을 밀리세컨드로 해놓고 월이 바뀔때마다
  }                                                             // 해당월의 첫째날 마지막날의 밀리세컨드를 구해 비교연산자를 통해 그 사이 날짜값만 구함
}, [diaryData, currentDate])

  useEffect(() => {
  }, [data])

  const headText = `${currentDate.format("YYYY")}년 ${currentDate.format("MM")}월`

 const increMonth = () =>{
    setCurrentDate(currentDate.clone().add(1, "months"))
    
  }

  const decreMonth = () =>{
    setCurrentDate(currentDate.clone().subtract(1, "months"))
  }

  return (
    <div>
      <Header
        headText={headText}
        leftChild={<Button text={"<"} onClick={decreMonth}/>}
        rightChild={<Button text={">"} onClick={increMonth}/>}
      />
      <DiaryData diaryData={data}/>
    </div>
  );
}

export default Home;