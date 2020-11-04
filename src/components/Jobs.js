import React, { useContext } from "react";
import "../Styles/jobs.css";
import Card from "./Card";
import Loader from './Loader';
import Message from './Message';
import { JobContext } from "../JobContextProvider";
import Pagination from "./Pagination";

function Jobs(desc) {
  const { loading, error, jobs } = useContext(JobContext);

  return (
    <div className='container'>
      {(!loading && !error) && <Pagination />}
      {error && <Message message='Sorry, something went wrong.' image={require('../assets/server_error.svg')} /> }
      
      <div className="jobs">
        {loading && <Loader/>}
        {(!loading && !error) && (jobs && (jobs.length > 0 && jobs.map((job) => (
            <Card
              key={job.id}
              id={job.id}
              type={job.type}
              created_at={job.created_at}
              company={job.company}
              location={job.location}
              title={job.title}
              company_logo={job.company_logo }
              description={job.description}
              company_url={job.company_url}
              how_to_apply={job.how_to_apply}
            />
          ))))}
      </div>
      {(!loading && !error) && (jobs && (jobs.length === 0 && <Message message='Sorry, no jobs found' image={require('../assets/search.svg')} /> ))}
      {(!loading && !error) && <Pagination />}
    </div>
  );
}

export default Jobs;
