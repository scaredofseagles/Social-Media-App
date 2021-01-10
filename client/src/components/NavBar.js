import { Navbar } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar className="yellow">
      <Navbar.Brand href="#home">SUBTweets Inc</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#login">Mark Otto</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
