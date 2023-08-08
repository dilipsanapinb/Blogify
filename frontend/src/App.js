
import './App.css';
import {Route,BrowserRouter as Router,Routes} from "react-router-dom" 
import LandingPage from './Pages/LandingPage';
import SignInPage from './Pages/SignInPage';
import BlogsPage from './Pages/BlogsPage';
import CreatePost from './Pages/CreatePost';
import FullPostDetails from './Pages/FullPostDetails';
import EditPost from './Pages/EditPost';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<FullPostDetails />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
