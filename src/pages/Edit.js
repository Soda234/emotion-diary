import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor";
import { DiaryDataContext } from './../App';

const Edit = () => {
    
    const navigate = useNavigate(); // Link태그를 클릭안해도 의도적으로 페이지를 바꿔버림.
    const [orginData , setOrginDatar ] = useState()
    const { id } = useParams()

    const diaryData = useContext(DiaryDataContext)

    useEffect(() => {
      if(diaryData.length >= 1){
        const targetDiary = diaryData.find((it) => Number(it.id) === Number(id))

        if(targetDiary){
          setOrginDatar(targetDiary)
        }
        else{
          navigate('/home', { replace : true });
        }
      }

  
      
    },[id, diaryData])

    
    return(
      <div>
        {orginData && <DiaryEditor isEdit={true} orginData={orginData}/>}
      </div>
    );
}

export default Edit;