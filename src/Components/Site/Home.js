import React from "react";
import Feeling from '../Feeling/FeelingIndex';
import Journal from "../Journal/JournalIndex";
import Quote from "../Quote/Quote"




const Home = (props) => {
    return(
        <div className='main'>
            <h3 className='logoutt'>Logout</h3>
            <Quote/>
            <Feeling token={props.token}/>
            <Journal token={props.token}/>
            </div>
    );
};

export default Home;