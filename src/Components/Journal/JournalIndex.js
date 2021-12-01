import React, {useState, useEffect} from "react";
import { Container, Row, Col } from 'reactstrap';
import JournalCreate from "./JournalCreate";
import JournalTable from "./JournalTable";
import JournalEdit from "./JournalEdit";
import './Feeling.css';
// import APIURL from '../../helpers/enviroment'

const JournalIndex = (props) => {
    const [journal, setJournal] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [JournalToUpdate, setJournalToUpdate] = useState({});
    const fetchJournal = () => {
        fetch(`http://localhost:3001/journal/mine`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then((res) => res.json())
        .then((JournalData) => {
            console.log(JournalData)
            setJournal(JournalData)
        })
        .catch(err => console.log(err))
    }
    const editUpdateJournal = (journal) => {
        setJournalToUpdate(journal);
    }
    const updateOn = () => {
        setUpdateActive(true);
    }
    const updateOff = () => {
        setUpdateActive(false);
    }
    
    useEffect(() => {
        fetchJournal();
        console.log("useEffect")
    }, [])
    return (
        <Container>
            <Row>
                <Col md='3'>
                    <JournalCreate fetchJournal={fetchJournal} token={props.token} />
                </Col>
                <Col md='9'>
                    <JournalTable journal={journal} editUpdateJournal={editUpdateJournal} 
                    updateOn={updateOn} updateOff={updateOff} fetchJournal={fetchJournal} token={props.token} />
                </Col>
            
            </Row>
        </Container>
    )
};
export default JournalIndex;