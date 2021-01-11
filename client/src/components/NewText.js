import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Divider } from '@material-ui/core'
import EmojiModal from './EmojiModal'
import PropTypes from 'prop-types';

EmojiModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

export default function NewText(){
    const [open, setOpen] = useState(false);
    const emails = ['username@gmail.com', 'user02@gmail.com'];
    const [selectedValue, setSelectedValue] = useState(emails[1]);

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
            <Form className="mt-5">
                <Form.Group>
                    <Form.Control as="textarea" rows={4} placeholder="How do you feel?"/>
                </Form.Group>
                <IconBar handleClickOpen={handleClickOpen}/>
                <Button>Send Message</Button>
            </Form>
            <br/>
            <Divider variant="middle" />
        </>
    )
}

function IconBar(props){
    return(
        <>
            <ul className="d-flex" style={{justifyContent: "space-evenly"}} sticky="bottom">
                <a><i class="fas fa-italic"></i></a>
                <a><i class="fas fa-underline"></i></a>
                <a><i class="fas fa-strikethrough"></i></a>
                <a><i class="fas fa-bold"></i></a>
                <a><i class="fas fa-link"></i></a>
                <a><i class="fas fa-paperclip"></i></a>
                <a onClick={props.handleClickOpen} ><i class="fas fa-icons"></i></a>
            </ul>
        </>
    )
}