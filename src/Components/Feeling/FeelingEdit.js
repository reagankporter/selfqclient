import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';
import './Feeling.css';

const FeelingEdit = (props) => {
    const [editHowFeeling, setEditHowFeeling] = useState(props.FeelingToUpdate.howFeeling);
    const [editHappyFeeling, setEditHappyFeeling] = useState(props.FeelingToUpdate.happyFeeling);
    const [editOkayFeeling, setEditOkayFeeling] = useState(props.FeelingToUpdate.okayFeeling);
    const [editSadFeeling, setEditSadFeeling] = useState(props.FeelingToUpdate.sadFeeling);
    const [modalOpen, setModalOpen] = useState(false);
    const FeelingUpdate = (e, feeling) => {
        
        fetch(`http://localhost:3001/feeling/update/${props.FeelingToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                feeling: {
                    howFeeling: editHowFeeling,
                    happyFeeling: editHappyFeeling,
                    okayFeeling: editOkayFeeling,
                    sadFeeling: editSadFeeling
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then((res) => {
            console.log(res)
            props.fetchFeeling();
            props.updateOff();
        })
    }
    const toggleModal = () => {
        setModalOpen(!modalOpen)}
        return (
        <>
        <button className="feelingbutton" onClick={toggleModal}>Edit</button>
        <Modal isOpen={modalOpen}>
            <ModalHeader>Edit your feelings list!</ModalHeader>
            <ModalBody>
                <Form onSubmit={FeelingUpdate}>
                    <FormGroup>
                        <Label htmlFor='howFeeling'>Edit How:</Label>
                        <br/>
                        <Input className="editinput" name='howFeeling' value={editHowFeeling} onChange={(e) => setEditHowFeeling(e.target.value)} placeholder='How are you feeling today?' />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='happyFeeling'>Edit Happy:</Label>
                        <br/>
                        <Input className="editinput" name='happyFeeling' value={editHappyFeeling} onChange={(e) => setEditHappyFeeling(e.target.value)} placeholder='Happy:' />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='okayFeeling'>Edit Okay:</Label>
                        <br/>
                        <Input className="editinput" name='okayFeeling' value={editOkayFeeling} onChange={(e) => setEditOkayFeeling(e.target.value)} placeholder='Okay:' />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='sadFeeling'>Edit Sad:</Label>
                        <br/>
                        <Input className="editinput" name='sadFeeling' value={editSadFeeling} onChange={(e) => setEditSadFeeling(e.target.value)} placeholder='Sad:' />
                    </FormGroup>
                    <Button className="feelingbutton" type='submit'>Update Feelings Log</Button>
                </Form>
            </ModalBody>
        </Modal>
        </>
    )
}
export default FeelingEdit;