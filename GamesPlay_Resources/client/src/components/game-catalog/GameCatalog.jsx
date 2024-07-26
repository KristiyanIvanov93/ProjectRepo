import { useEffect, useState } from 'react';
import { getAll } from '../../api/gamesAPI'; 
import GameCatalogItem from '../game-catalog/game-catalog-item/GameCatalogItem';

export default function GameCatalog() {
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

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {games.map(game => (
                <GameCatalogItem key={game._id} {...game} />
            ))}
            <h3 className="no-articles">No articles yet</h3>
        </section>

    );
}