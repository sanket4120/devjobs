import React, { createContext, useEffect, useReducer } from 'react';
import jobReducer from './reducer/jobReducer';
import axios from 'axios';
import {
  MAKE_REQUEST,
  GET_DATA,
  ERROR,
  UPDATE_HAS_NEXT_PAGE,
} from './reducer/actions/actions';

export const JobContext = createContext();

export default function JobContextProvider(props) {
  const [state, dispatch] = useReducer(jobReducer, { jobs: [], loading: true });

  const fetchJobs = (params, page) => {
    dispatch({ type: MAKE_REQUEST });
    axios
      .get('/jobs', {
        params: {
          markdown: true,
          page: page,
          ...params,
        },
      })
      .then((res) => {
        dispatch({ type: GET_DATA, payload: { jobs: res.data } });
      })
      .catch((e) => {
        dispatch({ type: ERROR, payload: { error: e } });
      });

    axios
      .get('/jobs', {
        params: {
          markdown: true,
          page: page + 1,
          ...params,
        },
      })
      .then((res) => {
        dispatch({
          type: UPDATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length !== 0 },
        });
      })
      .catch((e) => {
        dispatch({ type: ERROR, payload: { error: e } });
      });
  };

  useEffect(() => {
    fetchJobs(
      {
        description: '',
        location: '',
        full_time: false,
      },
      1
    );
  }, []);

  return (
    <JobContext.Provider value={{ ...state, fetchJobs }}>
      {props.children}
    </JobContext.Provider>
  );
}
