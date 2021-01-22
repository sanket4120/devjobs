import React, { useContext, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { ThemeContext } from '../ThemeContextProvider';
import '../Styles/jobinfo.css';
import Loader from './Loader';
import Message from './Message';

const JobInfo = ({ match }) => {
  const { isLightTheme } = useContext(ThemeContext);
  const [info, setInfo] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const id = match.params.id;
  const BASE_URL = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions/${id}.json?markdown=true`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(BASE_URL)
      .then((res) => {
        setLoading(false);
        setInfo({ ...res.data });
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
    window.scrollTo(0, 0);
  }, []);

  const {
    type,
    created_at,
    company,
    location,
    title,
    company_logo,
    company_url,
    description,
    how_to_apply,
  } = info;

  const logo = company_logo ? company_logo : require('../assets/logo.png');
  console.log(error);

  return (
    <>
      {error !== null && !loading && (
        <Message
          message={`We can't find the job you are looking for.`}
          image={require('../assets/search.svg')}
        />
      )}
      {loading && error === null && <Loader />}
      {error === null && Object.keys(info).length !== 0 && !loading && (
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
      )}
    </>
  );
};

export default JobInfo;
