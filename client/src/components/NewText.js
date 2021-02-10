import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Divider } from '@material-ui/core'
import EmojiModal from './EmojiModal'
import PropTypes from 'prop-types';
import API from '../utils/API'

EmojiModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

export default function NewText(props){
    const [open, setOpen] = useState(false);
    const emails = ['username@gmail.com', 'user02@gmail.com'];
    const [selectedValue, setSelectedValue] = useState(emails[1]);
    const [textValue, setTextValue] = useState('')


    function handleInputChange(event) {
        const { value } = event.target;
        console.log("i can what you're typing", value)
        
        setTextValue(value)
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        let parsedtags = textValue.match(/(^|\s)(#[a-z\d-]+)/ig)

        let trimmedtext = textValue.replace(/(^|\s)(#[a-z\d-]+)/ig, '')

        const postData = {
            user_id: '29dad17a-d056-45a1-9184-91f03fa862ae',
            tweet: trimmedtext,
            tags: parsedtags
        }
        debugger
        let result = await API.addPost(postData)
        props.updateData()
        setTextValue('')
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <>
            <EmojiModal selectedValue={selectedValue} open={open} onClose={handleClose} />
            <Form onSubmit={handleFormSubmit} className="mt-5">
                <Form.Group>
                    <Form.Control onChange={handleInputChange} value={textValue} as="textarea" rows={3} placeholder="How do you feel?"/>
                </Form.Group>
                <IconBar handleClickOpen={handleClickOpen}/>
                <Button type="submit">Send Message</Button>
            </Form>
            <br/>
            <Divider variant="middle" />
        </>
    )
}

function IconBar(props){
    return(
        <>
            <ul className="d-flex" style={{ justifyContent: "space-evenly" }} sticky="bottom">
                {/* TODO: use icon buttons */}
                <a><i className="fas fa-italic"></i></a>
                <a><i className="fas fa-underline"></i></a>
                <a><i className="fas fa-strikethrough"></i></a>
                <a><i className="fas fa-bold"></i></a>
                <a><i className="fas fa-link"></i></a>
                <a><i className="fas fa-paperclip"></i></a>
                <a onClick={props.handleClickOpen} ><i className="fas fa-icons"></i></a>
            </ul>
        </>
    )
}