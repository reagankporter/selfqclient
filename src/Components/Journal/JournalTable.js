import React, {useState} from 'react';
// import APIURL from '../../helpers/enviroment'
import { Table, Button, Card, CardBody, CardTitle, CardSubtitle, CardText, CardGroup } from 'reactstrap';
import JournalEdit from './JournalEdit';
import './Feeling.css';
import APIURL from '../../helpers/enviroment';


const JournalTable = (props) => {

    const [journal, setJournal] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    // const [split, setSplit] = journal.split;

    const deleteJournal = (journal) => {
        fetch(`${APIURL}/journal/delete/${journal.id}`, 
        
        {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })

            .then(() => props.fetchJournal())
    }
    const fetchJournal = () => {
        fetch(`${APIURL}/journal/mine`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then((res) => res.json())
        .then((JournalData) => {
            setJournal(JournalData)
        })
        .catch((err) => console.log(err))
    }
    const updateOn = () => {
        setUpdateActive(true);
    }
    const updateOff = () => {
        setUpdateActive(false);
    }

    

    const JournalMapper = () => {

        console.log(props.journal)
        
        return props.journal.map ((journal, index) => {
            return (
                <div>
                    <CardGroup>
                    <tr key={index}>
                        <Card>
                            <CardBody>
                                <CardTitle tag='h3'> Date: {journal.date}</CardTitle>
                                <hr/>
                                <CardSubtitle className='mb-2 text-muted' tag='h4'>How? {journal.howDay}</CardSubtitle>
                                <CardText>Improve? {journal.improveDay}</CardText>
                                <CardText>Rating? {journal.rating}</CardText>
                                <td>
                                    <JournalEdit updateOff={updateOff} token={props.token} fetchJournal={fetchJournal} JournalToUpdate={journal} />
                                    <Button className="feelingbutton" onClick={() => { deleteJournal(journal) }}>Delete</Button>
                                </td>
                            </CardBody>
                        </Card>
                    </tr>
                    </CardGroup>
                </div>
            )
        })
    }
    return (
        <div>
            <h3>Feeling Log</h3>
            <hr />
            <Table striped>
                <tbody>
                    {JournalMapper()}
                </tbody>
            </Table>
        </div>
    )
}
export default JournalTable;

