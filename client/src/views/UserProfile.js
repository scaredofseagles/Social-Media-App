import styled from 'styled-components'

const UserContainer = styled.section`
    display: flex;
    border: 2px solid red;
    margin: 30px;
    padding: 30px;
    height: 100vh;
`;

const ProfileImage = styled.img`
    background-image: url(${props => props.image});
    margin: 5px;
    width: 300px;
    height: 300px;
    object-fit: cover;
    
`;

export default function UserProfile(){
    return (
        <>
            <UserContainer>
                <h1>Welcome, User</h1>

                <ProfileImage image="https://robohash.org/65.60.11.210.png"/>

            </UserContainer>
        </>
    )
}