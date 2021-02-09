import { Container } from 'react-bootstrap'
import NewText from './components/NewText'
import AllPosts from './views/AllPosts'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserProfile from "./views/UserProfile"

function App() {
  return (
    <>
      <Navbar/>
      <Container>
        <Router>
          <Switch>
            <Route path="/home">
              <NewText/>
              <AllPosts/>
            </Route>
            <Route path="/users/:userid">
              <UserProfile />
            </Route>
            <Route path="/admin">
              
            </Route>
          </Switch>
        </Router>       
      </Container>
      <Footer/>
    </>
    
  );
}

export default App;
