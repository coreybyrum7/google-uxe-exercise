import './index.scss';
import Moment from 'react-moment';
import ClampLines from 'react-clamp-lines';
import { messages_api } from '../../../data';

export const Message = ({ index, message, isLast} ) => {
    const { content, updated, author } = message;
    const { name, photoUrl } = author;

    return (
        <article
            key={message.id}
            className={isLast ? 'message--last' : 'message__container'}
        >
            <div className="message">
                <div className="message__head">
                    <div className="message__avatar">
                        <img 
                            src={`${messages_api}/${photoUrl}`} 
                            alt="image" 
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
    )
}