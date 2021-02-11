import TextCard from "../components/TextCard";
import { useEffect, useState } from 'react'
import API from '../utils/API'

export default function AllPosts(props) {
    const [postData, setPostData] = useState([])

    useEffect(() => {
        getAllPosts()
    }, [props.isSubmitted])

    async function getAllPosts() {
        let result = await API.getPosts()
        if (result.data.success) {
            setPostData(result.data.response)
        } else {
            throw 'SOMETHING WENT WRONG';
        }
    }

    return(
        <main style={{ overflowY: 'auto' }}>
            { postData.length >= 1 ? postData.map(post => {
                return <TextCard data={ post }/>
            }) : <p>i'll put a spinner here</p>}
            
        </main>
    )
}