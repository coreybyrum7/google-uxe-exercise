import './index.scss';
import { messages_api } from '../../../data';
import { Message } from '../../../components';
import { InView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export const Feed = () => {
    const [ isFetching, setIsFetching ] = useState(false);
    const [ token, setToken ] = useState('');
    const [ feed, setFeed ] = useState([]);
    
    const loadMore = (pageToken) => {
        fetch(`${messages_api}/messages?limit=20&pageToken=${pageToken}`)
            .then(response => response.json())
            .then(data => {
                parseData(data)
                setIsFetching(false)
            })
            .catch(e => {
                console.log(e);
            })
    }

    const parseData = (data) => {
        setToken(data.pageToken)
        setFeed(feed.concat(data.messages))
    }

    useEffect(() => {
        setIsFetching(true);
        loadMore();
    }, []);

    return (
        <div className="feed">
            {!isFetching && feed.map((feedUnit, index) => (
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