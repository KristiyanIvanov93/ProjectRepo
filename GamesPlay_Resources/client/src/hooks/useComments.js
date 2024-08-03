import { useEffect, useState } from "react";
import commentsAPI from "../api/commentsAPI";

export function useCreateComment() {
    const createHandler = (gameId, comment) => commentsAPI.create(gameId, comment);
    return createHandler;
}

export function useGetAllComments(gameId) {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const result = await commentsAPI.getAll(gameId);
            console.log(result);
            setComments(result);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [gameId]);

    return { comments, setComments, fetchComments };
}
