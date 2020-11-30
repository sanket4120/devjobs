import React, { useContext, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ThemeContext } from '../ThemeContextProvider';
import '../Styles/jobinfo.css';

function JobInfo({
  type,
  created_at,
  company,
  location,
  title,
  logo,
  company_url,
  description,
  how_to_apply,
}) {
  const { isLightTheme } = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='jobinfo' style={{ wordBreak: 'break-word' }}>
      <div className={isLightTheme ? 'c_info' : 'c_info content-bg-dark'}>
        <div className='c_info_left'>
          <img src={logo} alt='Logo' />
        </div>
        <div className='c_info_right'>
          <h1>{company}</h1>
          <a
            className='apply-btn'
            href={company_url}
            target='_blank'
            rel='noopener noreferrer'
          >
            Company Site
          </a>
        </div>
      </div>
      <div className={isLightTheme ? 'desc' : 'desc content-bg-dark'}>
        <div className='jinfo'>
          <span>
            {created_at} - {type}
          </span>
          <p>{title}</p>
          <p id='location'>
            <i className='fas fa-map-marker-alt'></i>
            {location}
          </p>
        </div>
        <div className='jdesc'>
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </div>
      <div className='how_to_apply'>
        <h3 id='apply'>How to apply</h3>
        <div style={{ wordBreak: 'break-all' }}>
          <ReactMarkdown source={how_to_apply} />
        </div>
      </div>
    </div>
  );
}

export default JobInfo;
