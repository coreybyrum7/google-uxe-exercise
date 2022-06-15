import React, { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { messages_api } from '../../../data';
import { Message } from '../../../components';
import './index.scss';


export const Feed = () => {
    const [ isFetched, setIsFetched ] = useState(false);
    const [ token, setToken ] = useState('');
    const [ feed, setFeed ] = useState([]);

    useEffect(() => {
        loadMore();
    }, []);

    const parseData = (data) => {
        setToken(data.pageToken)
        setFeed(feed.concat(data.messages))
        setIsFetched(true)
    }
    
    const loadMore = (pageToken) => {
        fetch(`${messages_api}/messages?limit=20&pageToken=${pageToken}`)
            .then(response => response.json())
            .then(data => {
                parseData(data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div className="feed">
            {isFetched && feed.map((feedUnit, index) => (
                (index !== feed.length - 1) ?
                    <Message
                        message={feedUnit}
                        isLast={false}
                    />
                :
                    <InView 
                        onChange={(inView) => inView && loadMore(token) }
                        rootMargin="100px"
                    >
                        <Message
                            message={feedUnit}
                            isLast={true}
                        />
                    </InView>
            ))}
        </div>
    )
}