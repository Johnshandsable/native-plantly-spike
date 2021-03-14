//
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Material UI
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Custom Components
import AboutPage from '../AboutPage/AboutPage';
import Nav from '../Nav/Nav';
import PlantList from '../PlantList/PlantList';
import SearchBar from '../SearchBar/SearchBar';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#83a668',
      },
      secondary: {
        main: '#abc9cb',
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          {/* Navigation for other pages */}
          <Nav />

          {/* Renders only one page at a time */}
          <Switch>
            {/* Home Route */}
            <Route path="/" exact>
              <SearchBar />
            </Route>

            {/* About Route */}
            <Route path="/about">
              <AboutPage />
            </Route>

            {/* My List Route */}
            <Route path="/my-list">
              <PlantList />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
