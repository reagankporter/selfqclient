import React, {useState, useEffect} from "react";
import { Container, Row, Col } from 'reactstrap';
import FeelingCreate from "./FeelingCreate";
import FeelingTable from "./FeelingTable";
import FeelingEdit from "./FeelingEdit";
import './Feeling.css';
// import APIURL from '../../helpers/enviroment'

const FeelingIndex = (props) => {
    const [feeling, setFeeling] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [FeelingToUpdate, setFeelingToUpdate] = useState({});
    const fetchFeeling = () => {
        fetch(`http://localhost:3001/feeling/mine`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then((res) => res.json())
        .then((FeelingData) => {
            setFeeling(FeelingData)
            console.log(FeelingData)
        })
        .catch(err => console.log(err))
    }
    const editUpdateFeeling = (feeling) => {
        setFeelingToUpdate(feeling);
    }
    const updateOn = () => {
        setUpdateActive(true);
    }
    const updateOff = () => {
        setUpdateActive(false);
    }
    
    useEffect(() => {
        fetchFeeling();
    }, [])
    return (
        <Container>
            <Row>
                <Col md='3'>
                    <FeelingCreate fetchFeeling={fetchFeeling} token={props.token} />
                </Col>
                <Col md='9'>
                    <FeelingTable feeling={feeling} editUpdateFeeling={editUpdateFeeling} 
                    updateOn={updateOn} updateOff={updateOff} fetchFeeling={fetchFeeling} token={props.token}/>
                </Col>
            
            </Row>
        </Container>
    )
};
export default FeelingIndex;