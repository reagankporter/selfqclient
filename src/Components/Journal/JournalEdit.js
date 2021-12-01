import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';
import './Feeling.css';

const JournalEdit = (props) => {
    const [editDate, setEditDate] = useState(props.JournalToUpdate.date);
    const [editHowDay, setEditHowDay] = useState(props.JournalToUpdate.howDay);
    const [editImproveDay, setEditImproveDay] = useState(props.JournalToUpdate.improveDay);
    const [editRating, setEditRating] = useState(props.JournalToUpdate.rating);
    const [modalOpen, setModalOpen] = useState(false);
    const JournalUpdate = (e, journal) => {
        
        fetch(`http://localhost:3001/journal/update/${props.JournalToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                journal: {
                    date: editDate,
                    howDay: editHowDay,
                    improveDay: editImproveDay,
                    rating: editRating
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then((res) => {
            console.log(res)
            props.fetchJournal();
            props.updateOff();
        })
    }
    const toggleModal = () => {
        setModalOpen(!modalOpen)}
        return (
        <>
        <button className="feelingbutton" onClick={toggleModal}>Edit</button>
        <Modal isOpen={modalOpen}>
            <ModalHeader>Edit your day log!</ModalHeader>
            <ModalBody>
                <Form onSubmit={JournalUpdate}>
                    <FormGroup>
                        <Label htmlFor='howFeeling'>Edit Date:</Label>
                        <br/>
                        <Input className="editinput" name='howFeeling' value={editDate} onChange={(e) => setEditDate(e.target.value)} placeholder='date?' />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='happyFeeling'>Edit How:</Label>
                        <br/>
                        <Input className="editinput" name='happyFeeling' value={editHowDay} onChange={(e) => setEditHowDay(e.target.value)} placeholder='how?' />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='okayFeeling'>Edit Improve:</Label>
                        <br/>
                        <Input className="editinput" name='okayFeeling' value={editImproveDay} onChange={(e) => setEditImproveDay(e.target.value)} placeholder='improve?' />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='sadFeeling'>Edit Rating:</Label>
                        <br/>
                        <Input className="editinput" name='sadFeeling' value={editRating} onChange={(e) => setEditRating(e.target.value)} placeholder='rating?' />
                    </FormGroup>
                    <Button className="feelingbutton" type='submit'>Update Day Log</Button>
                </Form>
            </ModalBody>
        </Modal>
        </>
    )
}
export default JournalEdit;