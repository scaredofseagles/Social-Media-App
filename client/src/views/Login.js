import { Card, Form, Button, Alert } from 'react-bootstrap'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { useRef, useState } from 'react';
import API from '../utils/API'

const LoginContainer = styled.div`
    display: block;
    margin: 0px 173px;
    padding: 0px 173px;
    max-width: 1140px;
    box-sizing: border-box;
    background-color: #FFBC42;
    height: 68vh;
`;
const Body = styled.body`
    background-color: #FFBC42;
    padding-bottom: 4em;
`;

export default function Login() {
    const [loading, setLoading] = useState(false)   
    const [error, setError] = useState('')
    const screen_nameRef = useRef()

    const history = useHistory()

    async function handleFormSubmit(event) {
        event.preventDefault();

        let result = await API.getUsers()
        try {
            let validUser = result.data.response.filter(user => user.screen_name === screen_nameRef.current.value)
            setLoading(true)

            if (validUser.length >= 1) {
                history.push("/home")
            } else {
                setError('User does not exist')
            }
        } catch (error) {
            setError('Error')
        }
        
        setLoading(false)
        
    }

    return (
        <Body>
            <LoginContainer>
                <Card>
                    <Card.Body>
                        <h2>Log In</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Label>Screen Name:</Form.Label>
                            <Form.Control ref={screen_nameRef} placeholder="Enter your screen name here" required/>
                            <small><Link to="/forgot">Forgot your screen name?</Link></small>
                            <div style={{marginTop: "3%"}}>
                                <Button type="submit" disabled={loading}>Submit</Button>
                            </div>
                            
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </LoginContainer>
        </Body>
        
    )
}