import { create, getAll, getOne } from '../api/gamesAPI';
import { useEffect, useState } from 'react';




export function useGetAllGames() {


    const [games, setGames] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await getAll();
                setGames(result);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        })();
    }, []);


    return [games, setGames];
}


export function useGetOneGames(gameId) {

    const [game, setGame] = useState({});

    useEffect(() => {

        (async () => {
            try {
                const gameResult = await getOne(gameId);
                setGame(gameResult);


            } catch (error) {
                console.error('Error fetching game details!', error);
            }
        })();
    }, [gameId]);

    return [
        game,
        setGame
    ];



}

export function useCreateGame() {
    
    const gameCreateHandler = (gameData) => create(gameData);

    return gameCreateHandler;
}

