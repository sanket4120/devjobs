import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/card.css';
import { ThemeContext } from '../ThemeContextProvider';

function Card({
  id,
  type,
  created_at,
  company,
  location,
  title,
  company_logo,
  company_url,
  description,
  how_to_apply,
}) {
  created_at = new Date(created_at).toLocaleDateString();
  const logo = company_logo ? company_logo : require('../assets/logo.png');
  const { isLightTheme } = useContext(ThemeContext);

  return (
    <Link
      style={{ wordBreak: 'break-word' }}
      className={isLightTheme ? 'card' : 'card content-bg-dark'}
      to={`/${id}`}
    >
      <img className='image' src={logo} alt='Logo' />
      <span>
        {created_at}-{type}
      </span>
      <p id='job_title' style={{ color: isLightTheme ? '#000' : '#fff' }}>
        {title}
      </p>
      <span>{company}</span>
      <p className='info'>
        <i className='fas fa-map-marker-alt'></i>
        {location}
      </p>
    </Link>
  );
}

export default Card;
