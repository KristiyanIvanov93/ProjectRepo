import { useEffect, useState } from "react";
import { getOne } from "../../api/gamesAPI";
import { useParams } from 'react-router-dom';
import commentsAPI from "../../api/commentsAPI";

export default function GameDetails() {
    const [game, setGame] = useState({});
    const [comments, setComments] = useState([]);
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const { gameId } = useParams();

    useEffect(() => {
        if (!gameId) return;

        (async () => {
            try {
                const gameResult = await getOne(gameId);
                setGame(gameResult);

                const commentsResult = await commentsAPI.getAll(gameId);
                setComments(commentsResult);
            } catch (error) {
                console.error('Error fetching game details or comments:', error);
            }
        })();
    }, [gameId]);

    const commentSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const newComment = await commentsAPI.create(gameId, username, comment); 
            setComments(prevComments => [...prevComments, newComment]);
            setUsername('');
            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl || ''} alt={game.title || 'Game Image'} />
                    <h1>{game.title || 'Game Title'}</h1>
                    <span className="levels">Max Level: {game.maxLevel || 'Unknown'}</span>
                    <p className="type">{game.category || 'Category'}</p>
                </div>
                <p className="text">{game.summary || 'No description available.'}</p>
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {comments.length > 0 ? (
                            comments.map(comment => (
                                <li className="comment" key={comment._id}>
                                    <p>{comment.username}: {comment.text}</p>
                                </li>
                            ))
                        ) : (
                            <p className="no-comment">No comments.</p>
                        )}
                    </ul>
                </div>
                <div className="buttons">
                    <a href="#" className="button">Edit</a>
                    <a href="#" className="button">Delete</a>
                </div>
            </div>
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={commentSubmitHandler}>
                    <input
                        type="text"
                        placeholder="Pesho"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    ></textarea>
                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
}
