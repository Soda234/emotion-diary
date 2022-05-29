import React from 'react';
import moment from "moment";
import Button from "./Buttons";
import { useNavigate } from 'react-router-dom';

const DiaryItem = ({id, emotion, content, date}) => {

    const navigate = useNavigate()

   

   const newdate = moment(date).format("YYYY년 MM월 DD일") // 밀리세컨드로오는 date를 알맞은 형태로 변환

    return(
        <div className="DiaryItem">
            <div onClick={() => navigate(`/diary/${id}`)} className={["emotion_img", `emotion_img_${emotion}`].join(" ")}>
            <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
            </div>
            <div onClick={() => navigate(`/diary/${id}`)} className="info">
                <div className="date">
              {newdate}
                </div>
                <div className="content">
                {content.slice(0, 25)} {/* 너무 길면 내용이 짤릴 수 있으니 적당선에서 컷 */}
                </div>
            </div>
            <div className="edit_button">
                <Button text="수정하기" onClick={() => navigate(`/edit/${id}`)} />
            </div>
           
        </div>
    )
}

export default React.memo(DiaryItem);