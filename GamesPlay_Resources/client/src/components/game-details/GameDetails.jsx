import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetOneGames } from '../../hooks/useGames';
import { useForm } from '../../hooks/useForm';
import { useCreateComment, useGetAllComments } from '../../hooks/useComments';
import { useAuthContext } from '../../api/contexts/authContext';
import { remove } from '../../api/gamesAPI';

const initialValues = {
    comment: ''
};

export default function GameDetails() {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const { comments, setComments, fetchComments } = useGetAllComments(gameId);
    const createComment = useCreateComment();
    const [game] = useGetOneGames(gameId);
    const { isAuthenticated, userId, user } = useAuthContext();

    const { changeHandler, submitHandler, values } = useForm(initialValues, async ({ comment }) => {
        try {
            const newComment = await createComment(gameId, comment);
            // Ensure the new comment has the author information
            const commentWithAuthor = {
                ...newComment,
                author: {
                    email: user.email // Use the user email from the context
                }
            };
            fetchComments();
            setComments(oldComments => [...oldComments, commentWithAuthor]);

            // Optionally fetch comments from the server for consistency
        } catch (error) {
            console.log(error.message);
        }
    });

    const gameDeleteHandler = async () => {
        try {
            const isConfirmed = confirm(`Are you sure you want to delete ${game.title}?`);
            if (!isConfirmed) {
                return;
            }
            await remove(gameId);
            navigate('/games');


        } catch (error) {
            console.log(error.message);

        }
    };

    const isOwner = userId === game._ownerId;

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
                                    <p>{comment.author?.email || 'Unknown'}: {comment.text}</p>
                                </li>
                            ))
                        ) : (
                            <p className="no-comment">No comments.</p>
                        )}
                    </ul>
                </div>
                {isOwner && (
                    <div className="buttons">
                        <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                        <a href="#" onClick={gameDeleteHandler} className="button">Delete</a>
                    </div>
                )}
            </div>
            {isAuthenticated && (
                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form" onSubmit={submitHandler}>
                        <textarea
                            name="comment"
                            placeholder="Comment......"
                            onChange={changeHandler}
                            value={values.comment}
                        ></textarea>
                        <input
                            className="btn submit"
                            type="submit"
                            value="Add Comment"
                        />
                    </form>
                </article>
            )}
        </section>
    );
}
