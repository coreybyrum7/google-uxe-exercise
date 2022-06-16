import React, { useState } from 'react';
import Moment from 'react-moment';
import ClampLines from 'react-clamp-lines';
import { TinderCard } from '../tinder-card/index';
import { messages_api } from '../../../data';
import './index.scss';

export const Message = ({ message, isLast} ) => {
    const { id, content, updated, author } = message;
    const { name, photoUrl } = author;
    const [ isOutOfFrame, setIsOutOfFrame ] = useState(false);

    return (
        <TinderCard
            className={`card swipeable ${isOutOfFrame ? 'display--none' : ''}`}
            key={id}
            onCardLeftScreen={() => setIsOutOfFrame(true)}
        >
            <article
                key={message.id}
                className={isLast ? 'message--last' : 'message__container'}
                tabIndex={0}
            >
                <div className="message">
                    <div className="message__head">
                        <div className="message__avatar">
                            <img 
                                src={`${messages_api}/${photoUrl}`} 
                                alt={`${name} portrait`}
                                title={`${name} portrait`}
                                width="45" 
                                height="45"
                            />
                        </div>
                        <div className="message__info">
                            <h4>{name}</h4>
                            <p className="paragraph--subtext">
                                <Moment fromNow>{updated}</Moment>
                            </p>
                        </div>
                    </div>
                    <div className="message__body">
                        <ClampLines
                            text={content}
                            lines={4}
                            buttons={false}
                        />
                    </div>
                </div>
            </article>
        </TinderCard>
    )
}