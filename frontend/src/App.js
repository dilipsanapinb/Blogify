
import './App.css';
import {Route,BrowserRouter as Router,Routes} from "react-router-dom" 
import LandingPage from './Pages/LandingPage';
import SignInPage from './Pages/SignInPage';
import BlogsPage from './Pages/BlogsPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
