import { useEffect, useState } from "react";
import commentsAPI from "../api/commentsAPI";


export function useCreateComment() {
    const createHandler = (gameId, comment) => commentsAPI.create(gameId, comment);


    return createHandler;
}

export function useGetAllComments(gameId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await commentsAPI.getAll(gameId);
            console.log(result);
            
            setComments(result);
        })();
    }, [gameId]);
    return [comments, setComments];
}