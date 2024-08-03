import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useGetOneGames } from "../../hooks/useGames";
import { update } from "../../api/gamesAPI";
import { useMemo } from "react";


const initialValues = {
    title: '',
    category: '',
    maxLevel: '',
    imageUrl: '',
    summary: ''
};



export default function GameEdit() {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [game] = useGetOneGames(gameId);
    const initialFormValues = useMemo(() => Object.assign({}, initialValues, game), [game]);


    const { changeHandler, submitHandler, values } = useForm(initialFormValues, async (values) => {

        await update(gameId, values);
        navigate(`/games/${gameId}/details`);
    });


    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={submitHandler} >
                <div className="container">

                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input onChange={changeHandler} type="text" id="title" name="title" value={values.title} />

                    <label htmlFor="category">Category:</label>
                    <input onChange={changeHandler} type="text" id="category" name="category" value={values.category} />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input onChange={changeHandler} type="number" id="maxLevel" name="maxLevel" min="1" value={values.maxLevel} />

                    <label htmlFor="game-img">Image:</label>
                    <input onChange={changeHandler} type="text" id="imageUrl" name="imageUrl" value={values.imageUrl} />

                    <label htmlFor="summary">Summary:</label>
                    <textarea onChange={changeHandler} name="summary" id="summary" value={values.summary}></textarea>
                    <input className="btn submit" type="submit" value="Edit Game" />

                </div>
            </form>
        </section>
    );
}