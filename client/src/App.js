import { useState } from 'react'
import { Container } from 'react-bootstrap'
import NewText from './components/NewText'
import AllPosts from './views/AllPosts'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import UserProfile from "./views/UserProfile"
import Login from './views/Login'
import Signup from './views/Signup'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <>
      {/* <AuthProvider> */}
        <Navbar/>        
          <Router>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Container className="mb-4">
              <Route path="/home">
                <NewText updateData={() => setIsSubmitted(!isSubmitted) }/>
                <AllPosts isSubmitted={isSubmitted}/>
              </Route>
              <Route path="/users/:userid">
                <UserProfile />
              </Route>
              <Route path="/admin">
                
              </Route>
              </Container>
            </Switch>
          </Router>       
        <Footer/>
      {/* </AuthProvider> */}
      
    </>
    
  );
}

export default App;
