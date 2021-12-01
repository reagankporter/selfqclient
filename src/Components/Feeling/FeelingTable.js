import React, {useState} from 'react';
// import APIURL from '../../helpers/enviroment'
import { Table, Button, Card, CardBody, CardTitle, CardSubtitle, CardText, CardGroup } from 'reactstrap';
import FeelingEdit from './FeelingEdit';
import './Feeling.css';
import APIURL from '../../helpers/enviroment';

const FeelingTable = (props) => {

    const [feeling, setFeeling] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);

    const deleteFeeling = (feeling) => {
        fetch(`${APIURL}/feeling/delete/${feeling.id}`, 
        
        {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })

            .then(() => props.fetchFeeling())
    }
    const fetchFeeling = () => {
        fetch(`${APIURL}/feeling/mine`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then((res) => res.json())
        .then((FeelingData) => {
            setFeeling(FeelingData)
        })
        .catch((err) => console.log(err))
    }
    const updateOn = () => {
        setUpdateActive(true);
    }
    const updateOff = () => {
        setUpdateActive(false);
    }

    const FeelingMapper = () => {
        
        return props.feeling.map ((feeling, index) => {
            return (
                <div>
                    <CardGroup>
                    <tr key={index}>
                        <Card>
                            <CardBody>
                                <CardTitle tag='h3'>How are you feeling today? {feeling.howFeeling}</CardTitle>
                                <hr/>
                                <CardSubtitle className='mb-2 text-muted' tag='h4'>Happy: {feeling.happyFeeling}</CardSubtitle>
                                <CardText>Okay: {feeling.okayFeeling}</CardText>
                                <CardText>Sad: {feeling.sadFeeling}</CardText>
                                <td>
                                    <FeelingEdit updateOff={updateOff} token={props.token} fetchFeeling={fetchFeeling} FeelingToUpdate={feeling} />
                                    <Button className="feelingbutton" onClick={() => { deleteFeeling(feeling) }}>Delete</Button>
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
                    {FeelingMapper()}
                </tbody>
            </Table>
        </div>
    )
}
export default FeelingTable;

