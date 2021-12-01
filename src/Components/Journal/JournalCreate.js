import React, {useState} from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
// import APIURL from '../../helpers/enviroment'
import APIURL from '../../helpers/enviroment';


const JournalCreate = (props) => {
    const [date, setDate] = useState('');
    const [howDay, setHowDay] = useState('');
    const [improveDay, setImproveDay] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${APIURL}/journal/create`, {
            method: 'POST',
            body: JSON.stringify({
                journal: {
                    date: date,
                    howDay: howDay,
                    improveDay: improveDay,
                    rating: rating
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then((res) => res.json())
        .then((journalData) => {
            console.log(journalData);
            setDate('');
            setHowDay('');
            setImproveDay('');
            setRating('');
            props.fetchJournal();
        })
    }
    return (
        <div>
            <h2>How was your day?</h2>
            <Form onSubmit={handleSubmit} className="feelingform">
                <FormGroup>
                    <br/>
                    <Label className='feelinglabel' htmlFor='howFeeling'> Date? </Label>
                    <br/>
                    <Input className='feelinginput' name='howFeeling' value={date} onChange={(e) => setDate(e.target.value)} placeholder='Date?' />
                </FormGroup>
                <FormGroup>
                    <Label className='feelinglabel' htmlFor='happyFeeling' >How was your day?</Label>
                    <br/>
                    <Input className='feelinginput' name='happyFeeling' value={howDay} onChange={(e) => setHowDay(e.target.value)} placeholder=' how was your day?' />
                </FormGroup>
                <FormGroup>
                    <Label className='feelinglabel' htmlFor='okayFeeling' >What will you do to have an even better day tomorrow?</Label>
                    <br/>
                    <Input className='feelinginput' name='okayFeeling' value={improveDay} onChange={(e) => setImproveDay(e.target.value)} placeholder='improve day?' />
                </FormGroup>
                <FormGroup>
                    <Label className='feelinglabel' htmlFor='sadFeeling' >Rate your day 1-10</Label>
                    <br/>
                    <Input className='feelinginput' name='sadFeeling' value={rating} onChange={(e) => setRating(e.target.value)} placeholder='rate your day?' />
                </FormGroup>
                <Button className="feelingbutton" type='submit'>Add Day Log</Button>
            </Form>
        </div>
    )
}
export default JournalCreate;


