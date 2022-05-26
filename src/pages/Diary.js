import { useNavigate, useParams } from "react-router-dom"; // url 뒤의 id값을 가져오게 하는 훅
import { useContext, useState } from 'react';
import { DiaryDataContext } from './../App';
import { useEffect } from 'react';
import Header from "../components/Header";
import moment from 'moment';
import Button from './../components/Buttons';
import { emotionList } from './../util/emotion';

const Diary = () => {

    const navigate = useNavigate()
    const { id } = useParams();
    const [data, setData] = useState() 
    const diaryData = useContext(DiaryDataContext)

    useEffect(() => {
        
        if(diaryData.length >= 1){
        const targetDiary = diaryData.find((it) => Number(it.id) === Number(id))
        if(targetDiary){
            
            setData(targetDiary)
          }
          else{
              alert("없는 일기 입니다.")
            navigate('/home', { replace : true });
          }
        }
    }, [id, diaryData])

        if(!data)
        return (
            <div>로딩중</div>
        )
        else{

            const curEmotionData = emotionList.find((it) => Number(it.emotion_id) === Number(data.emotion))


            return(
                <div className="DiaryPage">
                    <Header headText={`${moment(data.date).format("YYYY년 MM월 DD일 기록")}`}
                   leftChild={<Button text={"< 뒤로 가기"} onClick={() => navigate(-1)}/>}
                   rightChild={<Button text={"수정하기"} onClick={() => navigate(`/edit/${data.id}`)}/>}
                   />

                <article>
                    <section>
                        <h4> 오늘의 감정 </h4>
                        <div className={["diary_img", `diary_img_${data.emotion}`].join(" ")}>
                        <img src={curEmotionData.emotion_img} />
                        <div className="emotion_text">
                            {curEmotionData.emotion_text}
                        </div>
                         </div>
                    </section>

                    <section>
                        <h4> 오늘의 일기 </h4>
                        <div className="diary_content">
                         <p>{data.content}</p>
                         </div>
                    </section>
                </article>
                </div>

               
            )
        }
  
}

export default Diary;