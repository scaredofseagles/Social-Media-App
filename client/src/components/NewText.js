import { Form, Button } from 'react-bootstrap'
import { Divider } from '@material-ui/core'

export default function NewText(){
    return (
        <>
            <Form className="mt-5">
                <Form.Group>
                    <Form.Control as="textarea" rows={4} placeholder="How do you feel?"/>
                </Form.Group>
                <IconBar />
                <Button>Send Message</Button>
            </Form>
            <br/>
            <Divider variant="middle" />
        </>
    )
}

function IconBar(){
    return(
        <>
            <ul className="d-flex" style={{justifyContent: "space-evenly"}} sticky="bottom">
                <a><i class="fas fa-italic"></i></a>
                <a><i class="fas fa-underline"></i></a>
                <a><i class="fas fa-strikethrough"></i></a>
                <a><i class="fas fa-bold"></i></a>
                <a><i class="fas fa-link"></i></a>
                <a><i class="fas fa-paperclip"></i></a>
                <a><i class="fas fa-icons"></i></a>
            </ul>
        </>
    )
}