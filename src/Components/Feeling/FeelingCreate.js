import React, {useState} from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
// import APIURL from '../../helpers/enviroment'
import APIURL from '../../helpers/enviroment';



const FeelingCreate = (props) => {
    const [howFeeling, setHowFeeling] = useState('');
    const [happyFeeling, setHappyFeeling] = useState('');
    const [okayFeeling, setOkayFeeling] = useState('');
    const [sadFeeling, setSadFeeling] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${APIURL}/feeling/create`, {
            method: 'POST',
            body: JSON.stringify({
                feeling: {
                    howFeeling: howFeeling,
                    happyFeeling: happyFeeling,
                    okayFeeling: okayFeeling,
                    sadFeeling: sadFeeling
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then((res) => res.json())
        .then((feelingData) => {
            console.log(feelingData);
            setHowFeeling('');
            setHappyFeeling('');
            setOkayFeeling('');
            setSadFeeling('');
            props.fetchFeeling();
        })
    }
    return (
        <div>
            <h2>How are you feeling?</h2>
            <Form onSubmit={handleSubmit} className="feelingform">
                <FormGroup>
                    <br/>
                    <Label className='feelinglabel' htmlFor='howFeeling' >How are you feeling today?</Label>
                    <br/>
                    <Input className='feelinginput' name='howFeeling' value={howFeeling} onChange={(e) => setHowFeeling(e.target.value)} placeholder='How are you feeling today?' />
                </FormGroup>
                <FormGroup>
                    <Label className='feelinglabel' htmlFor='happyFeeling' >Something that made you happy today?</Label>
                    <br/>
                    <Input className='feelinginput' name='happyFeeling' value={happyFeeling} onChange={(e) => setHappyFeeling(e.target.value)} placeholder=' happy :)' />
                </FormGroup>
                <FormGroup>
                    <Label className='feelinglabel' htmlFor='okayFeeling' >Something that made you okay today?</Label>
                    <br/>
                    <Input className='feelinginput' name='okayFeeling' value={okayFeeling} onChange={(e) => setOkayFeeling(e.target.value)} placeholder='neutral :\' />
                </FormGroup>
                <FormGroup>
                    <Label className='feelinglabel' htmlFor='sadFeeling' >Something that made you sad today?</Label>
                    <br/>
                    <Input className='feelinginput' name='sadFeeling' value={sadFeeling} onChange={(e) => setSadFeeling(e.target.value)} placeholder='sad :(' />
                </FormGroup>
                <Button className="feelingbutton" type='submit'>Add Feeling Log</Button>
            </Form>
        </div>
    )
}
export default FeelingCreate;


