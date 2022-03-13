import { InView } from 'react-intersection-observer';

import { useEffect, useState, useRef } from 'react';

export const Messages = () => {
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ nextToken, setNextToken ] = useState();
    const [ messages, setMessages ] = useState([]);
    
    const messagesRef = useRef();

    const getMessages = (pageToken) => {
        fetch(`https://message-list.appspot.com/messages?limit=20&pageToken=${pageToken}`)
        .then(response => response.json())
        .then(data => parseData(data))
        .then(() => setIsLoaded(true))
    }

    const parseData = (data) => {
        setNextToken(data.pageToken)
        setMessages(messages.concat(data.messages))
    }

    useEffect(() => {
        getMessages();
    }, []);

    return (
        <div className="messages">
            <h1>This is the messages component in the body section</h1>
            <ul>
                {isLoaded && messages.map((message, index) => (
                    (index == messages.length) ?
                        <li key={index}>{message.content}</li>
                    :
                        <InView onChange={() => getMessages(nextToken)}>
                            <li key={index} className="poo">{message.content}</li>
                        </InView>
                ))}
            </ul>
        </div>
    )
}