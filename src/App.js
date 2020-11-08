import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles.css';
import Header from './components/Header';
import SearchBar from './components/Searchbar';
import Jobs from './components/Jobs';
import JobInfo from './components/JobInfo';
import JobContextProvider from './JobContextProvider';
import PageContextProvider from './PageContextProvider';
import { ThemeContext } from './ThemeContextProvider';

export default function App() {
  const { isLightTheme } = useContext(ThemeContext);
  return (
    <div className={isLightTheme ? 'app' : 'app bg-dark'}>
      <Header />
      <Router>
        <JobContextProvider>
          <PageContextProvider>
            <Route exact path='/' component={SearchBar} />
            <Route exact path='/' component={Jobs} />
          </PageContextProvider>
        </JobContextProvider>
        <Route
          exact
          path='/jobinfo'
          render={(props) => <JobInfo {...props.history.location.state} />}
        />
      </Router>
    </div>
  );
}
