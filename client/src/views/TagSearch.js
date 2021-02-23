import { useState, useEffect } from 'react';
import API from '../utils/API';
import queryString from 'query-string';

export default function TagSearch(){

    useEffect(() => {
        getTagsList();
    }, [])

    async function getTagsList(){
        console.log('is this thinhg on???')
        console.log(window.location.search)
        //let result = await API.getTags();
    }

    return(
        <></>
    )
}