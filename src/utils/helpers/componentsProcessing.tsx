import {AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike} from "react-icons/ai";

export const getLikeButtonByReaction = (userReaction: string, handler: () => Promise<void>, styles: string): JSX.Element =>  {
    return (userReaction === "like")
        ?
        <
            AiFillLike
            className={styles}
            onClick={handler}
            size={25}
        />
        :
        <
            AiOutlineLike
            className={styles}
            onClick={handler}
            size={25}
        />;
};

export const getDislikeButtonByReaction = (userReaction: string, handler: () => Promise<void>, styles: string): JSX.Element => {
    return (userReaction === "dislike")
        ?
        <
            AiFillDislike
            className={styles}
            onClick={handler}
            size={25}
        />
        :
        <
            AiOutlineDislike
            className={styles}
            onClick={handler}
            size={25}
        />;
};
