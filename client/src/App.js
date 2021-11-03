import { useState } from "react";
import { Container } from "react-bootstrap";
import NewText from "./components/NewText";
import AllPosts from "./views/AllPosts";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserProfile from "./views/UserProfile";
import Login from "./views/Login";
import Signup from "./views/Signup";
import TagSearch from "./views/TagSearch";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";

import "./styles.css";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <ChakraProvider>
        <Navbar />
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Container className="mb-4">
              <PrivateRoute path="/home">
                <NewText updateData={() => setIsSubmitted(!isSubmitted)} />
                <AllPosts isSubmitted={isSubmitted} />
              </PrivateRoute>
              <PrivateRoute path="/users/:userid">
                <UserProfile />
              </PrivateRoute>
              <PrivateRoute path="/admin"></PrivateRoute>
              <PrivateRoute path="/tags">
                <TagSearch />
              </PrivateRoute>
            </Container>
          </Switch>
        </Router>
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default App;
