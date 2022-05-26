import Header from './Header';
import Button from './Buttons';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import  moment from 'moment';
import EmotionItem from './EmotionItem';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';
import { useEffect } from 'react';

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_text: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_text: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_text: "보통",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_text: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_text: "완전 별로",
  },
];
const DiaryEditor = ({isEdit, orginData}) => {

    const contentRef = useRef();
    const [headText, setHeadText] = useState("새로운 일기 작성")
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const {onCreate , onEdit } = useContext(DiaryDispatchContext)
    
    
    const changeEmotion = (emotion_id) => {
        setEmotion(emotion_id)
    }

    const onSubmit = () => {
        if(content.length < 1 ){
            contentRef.current.focus()
            alert("내용을 작성해 주세요")
            return false;
        }

        if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")){
          if(!isEdit){
            onCreate(date, content, emotion)
          }
          else{
            onEdit(orginData.id, date, content, emotion)
          }
        }


        navigate('/home', {replace : true})
    }

    useEffect(() => {
      if(isEdit){
        setDate(moment(orginData.date).format("YYYY-MM-DD"))
        setEmotion(orginData.emotion)
        setContent(orginData.content)
        setHeadText('일기 수정')
      }
    }, [isEdit, orginData, headText])

   
    return (
        <div className='DiaryEditor'>
         <Header headText={headText} leftChild={<Button text={"< 뒤로 가기"} onClick={() => navigate(-1)}/>}/>
         <div>
             <section>
                 <h4>날짜를 선택하세요</h4>
                 <div className='input'>
                     <input className='input_date' type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                      </div>
             </section>
         </div>
         <div>
             <section>
                 <h4>오늘의 감정</h4>
                 <div className='emotion_list'>
                    {emotionList.map((it) => {
                        return(
                            <div key={it.emotion_id}>
                             <EmotionItem
                              key={it.emotion_id}
                              {...it}
                              onClick={changeEmotion}
                              isSelected={it.emotion_id === emotion}
                              />
                            </div>
                        )
                    })}
                      </div>
             </section>
         </div>
         <div>
             <section>
                 <h4>오늘의 일기</h4>
                 <div className='input text_area'>
                     <textarea ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} placeholder="거루의 하루는 어땠나용?"/>
                      </div>
             </section>

             <section>
              <div className='control_box'>
                    <Button text={"취소하기"} onClick={() => navigate(-1)} />
                    <Button text={"작성완료"} type={"success"} onClick={onSubmit}/>
              </div>
             </section>
         </div>
        </div>
    )
}

export default DiaryEditor