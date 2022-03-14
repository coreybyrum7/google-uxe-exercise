import './index.scss';
import { Message } from '../../../components';
import { InView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export const Feed = () => {
    const [ isFetching, setIsFetching ] = useState(false);
    const [ nextToken, setNextToken ] = useState();
    const [ feed, setFeed ] = useState([]);
    
    const loadMore = (pageToken) => {
        fetch(`https://message-list.appspot.com/messages?limit=20&pageToken=${pageToken}`)
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
        setNextToken(data.pageToken)
        setFeed(feed.concat(data.messages))
    }

    useEffect(() => {
        setIsFetching(true);
        loadMore();
    }, []);

    return (
        <main className="feed">
            {!isFetching && feed.map((feedUnit, index) => (
                (index != feed.length - 1) ?
                    <Message
                        key={index}
                        message={feedUnit}
                        isLast={false}
                    />
                :
                    <InView onChange={(inView) => inView && loadMore(inView, nextToken) }>
                        <Message
                            key={index}
                            message={feedUnit}
                            isLast={true}
                        />
                    </InView>
            ))}
        </main>
    )
}