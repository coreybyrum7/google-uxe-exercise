import './index.scss';

export const Message = ({ key, message, isLast} ) => {
    return (
        <article 
            key={key}
            className={isLast ? 'message--last' : 'message'}
        >
            {message.content}
        </article>
    )
}