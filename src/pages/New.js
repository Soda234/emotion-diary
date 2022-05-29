import DiaryEditor from "../components/DiaryEditor";
import { useEffect } from 'react';


const New = () => {

    useEffect(() =>{
        const title = document.getElementsByTagName('title')[0]
        console.log("title", title)
        title.innerHTML = `히거루의 일기 작성`
    }, [])
   
    return (
        <div>
       <DiaryEditor />
        </div>
    )
}

export default New;