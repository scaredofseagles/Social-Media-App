import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import API from '../utils/API'
import { useAuth } from '../contexts/AuthContext';

const SignupContainer = styled.div`
    display: flex;
    margin-right: 0px !important;
    padding: 0px;
    max-width: 1140px;
    box-sizing: border-box;
    background-color: #FFBC42;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    css-selector;
`;
const Body = styled.body`
    background-color: #FFBC42;
    padding-bottom: 4em;
`;

const ProfileImage = styled.img`
    background-image: url(${props => props.image});
    margin: 5px;
    margin-right: 30px;
    width: 200px;
    height: 200px;
    // /* object-fit: cover;
    // object-position: center; */
    background-position: top left;
    background-size: cover;
    float:left;
`;

export default function Signup() {

    const [showNext, setShowNext] = useState(false)
    const [nameValue, setNameValue] = useState('')
    const [profileValue, setProfileValue] = useState('')
    const [loading, setLoading] = useState(false)   
    const [error, setError] = useState('')

    //const  signup  = useAuth()

    const emailRef = useRef()

    const history = useHistory()

    useEffect(() => {
        //getDefaultName()
        console.log(emailRef.current.value)
    }, [])

    async function getDefaultName() {
        let nameResult = await API.getScreenName()
        let imageResult = await API.getProfile(nameResult.data.join('-'))
        setNameValue(nameResult.data.join('-'))       
        setProfileValue(imageResult.config.url)
    }


    async function handleFormSubmit(event) {
        event.preventDefault();

        const newUserData = {
            screen_name: nameValue,
            email: emailRef.current.value,
            profile_image: profileValue
        }

        try {
            setLoading(true)

            let result = await API.addUser(newUserData)           
            //debugger
            if (result.data.success) {
                localStorage.setItem('currentUser', JSON.stringify(result.data.response))
                history.push("/home")
            } else if (!result.data.success) {
                setError(result.data.msg)
            }

        } catch (error) {
            setError('Something went wrong. Please try again.')
            console.error(error)
        }
        setLoading(false)
    }

    return (
        <Body>
            <SignupContainer>
                <div className="w-100" style={{maxWidth: "600px", margin: "auto"}}>
                    <Card style={{padding: "0px 10px"}}>
                        <Card.Body>
                            <h2>Sign Up</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Group as={Row}>
                                    
                                    <Form.Control ref={emailRef} placeholder="Enter your email here" type="email" required/>
                                    <Button onClick={() => setShowNext(!showNext)} disabled={emailRef.current?.value} style={{marginTop: "2%", float: "right"}} type="button">Continue</Button>
                                </Form.Group>


                                {showNext ? <>

                                <Col sm={10}>
                                    <Form.Group>                                    
                                        <ProfileImage image={profileValue}/>                              
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group as={Row}>
                                        <Form.Label>Screen Name</Form.Label>
                                        <Form.Control value={nameValue} readOnly />
                                        <Button onClick={getDefaultName} type="button" style={{marginTop: "2%"}}>Generate</Button>
                                    </Form.Group>
                                
                                </Col>
                                
                                <div style={{marginTop: "5%"}}>
                                    <Button type="submit" className="w-100" disabled={loading}>Submit</Button>
                                </div>
                                 </>   
                                : <></>}
                                
                            </Form>
                        </Card.Body>
                    
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </div>
                
                
            </SignupContainer>
        </Body>
        
    )
}