import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Tabs, Tab } from 'react-bootstrap';
import API from '../utils/API';

const UserContainer = styled.section`
    //display: flex;
    border: 2px solid red;
    margin: 30px 0px;
    padding: 30px;
    height: 100vh;
`;

const ProfileImage = styled.img`
    background-image: url(${props => props.image});
    margin: 5px;
    width: 300px;
    height: 300px;
    // /* object-fit: cover;
    // object-position: center; */
    background-position: top left;
    background-size: cover;
    float:left;
`;

const Actionables = styled.aside`
    //display: flex;
    flex-direction: column wrap;
    height: 100vh;
    width: 350px;
`;

export default function UserProfile() {
    
    const [key, setKey] = useState('home')
    const [user, setUser] = useState({})

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('currentUser')))
        getPosts()
    }, [])

    async function getPosts(){
        let result = await API.getUserPosts(user.id);
        debugger
    }

    return (
        <>
            <UserContainer>
                <h2>Welcome, {user.screen_name}</h2>
                <div style={{display: 'flex'}}>
                    <Actionables>
                        <ProfileImage image={user.profile_image} />
                        <div>
                            <h6>Some Stats (interations)</h6>
                            <ul>
                                <li>posts</li>
                                <li>likes</li>
                                <li>replies</li>
                            </ul>
                        </div>
                        <Button>Edit Profile</Button>
                        <Button>Settings</Button>                   
                    </Actionables>
                    <aside>
                        <h1>hello</h1>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            >
                            <Tab eventKey="home" title="Posts">
                                
                            </Tab>
                            <Tab eventKey="profile" title="Likes">
                                
                            </Tab>
                        </Tabs>
                    </aside>
                </div>
                
                
        
            </UserContainer>
        </>
    )
}