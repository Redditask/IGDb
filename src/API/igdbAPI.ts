import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {IGameCard} from "../types/data";
import {
    GetAccountGamesQueryResult,
    AddReviewQueryArgs,
    CheckIsAddedQueryResult, EditReviewQueryArgs, GetReviewsQueryArgs,
    GetReviewsQueryResult,
    LoginQueryArgs,
    LoginQueryResult, MessageQueryResult, NumberQueryArg,
    RegistrationQueryArgs,
    RegistrationQueryResult,
    StringQueryArg, GetAccountInfoQueryResult
} from "../types/queries";

export const igdbAPI = createApi({
    reducerPath: "idbgAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env["REACT_APP_IGDB_API_URL"]}`,
        prepareHeaders: (headers): void => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginQueryResult, LoginQueryArgs>({
            query: ({email, password}) => ({
                url: "login",
                method: "POST",
                body: {
                    email,
                    password
                },
            }),
        }),
        registration: builder.mutation<RegistrationQueryResult, RegistrationQueryArgs>({
            query: ({email, password, username}) => ({
                url: "registration",
                method: "POST",
                body: {
                    email,
                    username,
                    password
                },
            }),
        }),
        logout: builder.mutation<void, {}>({
            query: () => ({
                url: "logout",
                method: "POST"
            })
        }),
        checkAuth: builder.query<LoginQueryResult, {}>({
            query: () =>
                "refresh"
        }),
        getAccountGames: builder.query<GetAccountGamesQueryResult, {}>({
            query: () =>
                "account/games"
        }),
        addGameToWishlist: builder.mutation<void, IGameCard>({
            query: (gameInfo) => ({
                url: "wishlist",
                method: "POST",
                body: {
                    gameInfo
                },
            })
        }),
        addGameToLibrary: builder.mutation<void, IGameCard>({
            query: (gameInfo) => ({
                url: "library",
                method: "POST",
                body: {
                    gameInfo
                },
            })
        }),
        removeFromWishlist: builder.mutation<void, { slug: StringQueryArg }>({
            query: ({slug}) => ({
                url: `wishlist/${slug}`,
                method: "DELETE",
            })
        }),
        removeFromLibrary: builder.mutation<void, { slug: StringQueryArg }>({
            query: ({slug}) => ({
                url: `library/${slug}`,
                method: "DELETE",
            })
        }),
        checkIsAdded: builder.query<CheckIsAddedQueryResult, { slug: StringQueryArg }>({
            query: ({slug}) =>
                `check/${slug}`,
        }),
        activateAccount: builder.query<MessageQueryResult, { link: StringQueryArg }>({
            query: ({link}) =>
                `activate/${link}`,
        }),
        addReview: builder.mutation<MessageQueryResult, AddReviewQueryArgs>({
            query: ({slug, text}) => ({
                url: `review/${slug}`,
                method: "POST",
                body: {
                    text
                },
            })
        }),
        getReviews: builder.query<GetReviewsQueryResult, GetReviewsQueryArgs>({
            query: ({slug, username, sortOption}) =>
                `reviews/${slug}?username=${username}&sortOption=${sortOption}`,
        }),
        deleteReview: builder.mutation<MessageQueryResult, {id: NumberQueryArg}>({
            query: ({id}) => ({
                url: `review/${id}`,
                method: "DELETE",
            })
        }),
        editReview: builder.mutation<MessageQueryResult, EditReviewQueryArgs>({
            query: ({reviewId, text}) => ({
                url: `review/${reviewId}`,
                method: "PUT",
                body: {
                    newText: text
                }
            })
        }),
        likeReview: builder.mutation<MessageQueryResult, {id: NumberQueryArg}>({
            query: ({id}) => ({
                url: `review/like/${id}`,
                method: "POST",
            })
        }),
        dislikeReview: builder.mutation<MessageQueryResult, {id: NumberQueryArg}>({
            query: ({id}) => ({
                url: `review/dislike/${id}`,
                method: "POST",
            })
        }),
        getAccountInfo: builder.query<GetAccountInfoQueryResult, {selectedUser: StringQueryArg}>({
            query: ({selectedUser}) =>
                `account/info/${selectedUser}`
        })
    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
    useLogoutMutation,
    useCheckAuthQuery,
    useGetAccountGamesQuery,
    useAddGameToLibraryMutation,
    useAddGameToWishlistMutation,
    useRemoveFromLibraryMutation,
    useRemoveFromWishlistMutation,
    useCheckIsAddedQuery,
    useActivateAccountQuery,
    useAddReviewMutation,
    useGetReviewsQuery,
    useDeleteReviewMutation,
    useLikeReviewMutation,
    useDislikeReviewMutation,
    useEditReviewMutation,
    useGetAccountInfoQuery
} = igdbAPI;
