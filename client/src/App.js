import { Container } from 'react-bootstrap'
import NewText from './components/NewText'
import AllPosts from './views/AllPosts'
import Navbar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar/>
      <Container>
        <NewText/>
        <AllPosts/>
      </Container>
      <Footer/>
    </>
    
  );
}

export default App;
