import Button from "../components/Buttons";
import { useNavigate } from 'react-router-dom';

const Title = () => {

  const navigate = useNavigate();

  return (
    <div className="Title">
      <h2> 히거루의 감정일기 </h2>
      <div className="keng">
     <img src={process.env.PUBLIC_URL + `assets/keng.png`} />     
     </div>
     <div className="record">
     <Button type='success' text="기록하기" onClick={() => navigate("/home")}/>
     </div>    
    </div>
  );
}

export default Title;