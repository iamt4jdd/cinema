import { Link } from 'react-router-dom'
import './Button.css'



const Button = ({
    href,
    to,
    type = 'primary',
    size = 'medium',
    children,
    className,
    animation,
    icon,
    image,
    onClick,
    ...passProps
}) => {

    let Comp = 'button'


    const props = {
        onClick,
        ...passProps
    }
    
    if(to){
        props.to = to
        Comp = Link
    } else if (href) {
        props.href = href
        Comp = 'a'
    }

    const classes =  {
        [className]: className,
        [type]: type,
        [size]: size,
    }

    return (
        <>
            <Comp className={`wrapper ${animation == "zoom" && 'focus:ring transform transition hover:scale-105 duration-300 ease-in-out'} ${Object.keys(classes).filter(key => classes[key]).join(' ')}`} {...props}>
                {icon && <span className={'icon'}>{icon}</span>}
                {children && <span className={'title text-center'}>{children}</span>}
                {image && <img  src={image} alt="" className={'image'}/>}
            </Comp>
        </>
    )

}

export default Button