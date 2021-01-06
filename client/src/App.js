import { Container } from 'react-bootstrap'
import NewText from './components/NewText'
import TextCard from './components/TextCard'
import Navbar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar/>
      <Container>
        <NewText/>
        <TextCard />
      </Container>
      <Footer/>
    </>
    
  );
}

export default App;
