

const Button = ({text, type, onClick}) => {

    const btnType = ['success', 'error'].includes(type) ? type : 'default'


    return(
        <button className={["Button", `Button_${btnType}`].join(" ")} onClick={onClick}>{text}</button>
    )
}

Button.defaultProps ={ // 기본 값 설정
    type : "default"
}



export default Button;