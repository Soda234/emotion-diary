import React from 'react';

const EmotionItem = ({emotion_id, emotion_img, emotion_text, onClick, isSelected}) => {
    return(
        <div onClick={() => onClick(emotion_id)} className={["EmotionItem", isSelected ? `Emotion_on_${emotion_id}` : "Emotion_off" ].join(" ") }>
             <img src={emotion_img} />
             <span>{emotion_text}</span>
        </div>
    )
}

export default React.memo(EmotionItem);