import React,{ useContext } from 'react';
import '../Styles/Message.css';
import { ThemeContext } from '../ThemeContextProvider';

function NotFound({message, image}){
    const {isLightTheme} = useContext(ThemeContext);
    return(
        <div className='not_found'>
                <img src={image} alt="No jobs"/>
            <h1 style={{ color:isLightTheme?'#000':'#fff'}}>{message}</h1>
        </div>
    )
}

export default NotFound;