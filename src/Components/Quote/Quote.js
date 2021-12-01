import React, {useState, useEffect, useRef} from "react";
import "./Quote.css"

const Quote = () => {

    const [quotes, setQuotes] = useState('');
    const textRef = useRef();

const getQuote = () => {
    fetch("https://type.fit/api/quotes")
    .then ((res) => res.json())
    .then ((data) => {
        let randomNum = Math.floor(Math.random () * data.length);
        setQuotes(data[randomNum]);
    });
}

useEffect(() => {
    getQuote();
}, []);



    return (
        <div className="App"> 
            <div className="Quote">
                <p> {quotes.text}</p>
                <p>Author: {quotes.author}</p>
                <button className="quoteb" onClick={getQuote} > Get Quote </button>
            </div>
        </div>          
    )
    }
    
    export default Quote;