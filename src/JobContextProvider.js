import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import jobReducer from './reducer/jobReducer';
import {
  MAKE_REQUEST,
  GET_DATA,
  ERROR,
  UPDATE_HAS_NEXT_PAGE,
} from './reducer/actions/actions';

export const JobContext = createContext();

export default function JobContextProvider(props) {
  const [state, dispatch] = useReducer(jobReducer, { jobs: [], loading: true });
  const BASE_URL =
    'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';

  function getJobs(params, page) {
    dispatch({ type: MAKE_REQUEST });
    axios
      .get(BASE_URL, {
        params: {
          markdown: true,
          page: page,
          ...params,
        },
      })
      .then((res) => dispatch({ type: GET_DATA, payload: { jobs: res.data } }))
      .catch((e) => {
        dispatch({ type: ERROR, payload: { error: e } });
      });

    axios
      .get(BASE_URL, {
        params: {
          markdown: true,
          page: page + 1,
          ...params,
        },
      })
      .then((res) =>
        dispatch({
          type: UPDATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length !== 0 },
        })
      )
      .catch((e) => {
        dispatch({ type: ERROR, payload: { error: e } });
      });
  }

  return (
    <JobContext.Provider value={{ ...state, getJobs }}>
      {props.children}
    </JobContext.Provider>
  );
}
