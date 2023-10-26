import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {IGameCard, IPlatform} from "../types/data";
import {
    AddGameReviewQueryArgs,
    EditGameReviewQueryArgs, GetAccountReviewsQueryArgs,
    GetGameReviewsQueryArgs, LoginQueryArgs,
    NumberQueryArg, RegistrationQueryArgs,
    StringQueryArg
} from "../types/queries/args";
import {
    CheckIsAddedQueryResult, GetAccountGamesQueryResult,
    GetAccountInfoQueryResult,
    GetGameReviewsQueryResult, GetAccountReviewsQueryResult, LoginQueryResult,
    MessageQueryResult, RegistrationQueryResult
} from "../types/queries/results";

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
        addReview: builder.mutation<MessageQueryResult, AddGameReviewQueryArgs>({
            query: ({slug, text, rating}) => ({
                url: `review/${slug}`,
                method: "POST",
                body: {
                    text,
                    rating
                },
            })
        }),
        getReviews: builder.query<GetGameReviewsQueryResult, GetGameReviewsQueryArgs>({
            query: ({slug, username, sortOption}) =>
                `reviews/${slug}?username=${username}&sortOption=${sortOption}`,
        }),
        getAccountReviews: builder.query<GetAccountReviewsQueryResult, GetAccountReviewsQueryArgs>({
           query: ({username, viewer, sortOption}) =>
                `account/reviews/${username}?viewer=${viewer}&sortOption=${sortOption}`,
        }),
        deleteReview: builder.mutation<MessageQueryResult, {id: NumberQueryArg}>({
            query: ({id}) => ({
                url: `review/${id}`,
                method: "DELETE",
            })
        }),
        editReview: builder.mutation<MessageQueryResult, EditGameReviewQueryArgs>({
            query: ({reviewId, text, rating}) => ({
                url: `review/${reviewId}`,
                method: "PUT",
                body: {
                    newText: text,
                    newRating: rating
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
        }),
        updateUserPlatforms: builder.mutation<void, IPlatform []>({
            query: (platforms) => ({
                url: `account/info/platforms`,
                method: "PUT",
                body: {
                    platforms
                },
            })
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
    useGetAccountInfoQuery,
    useUpdateUserPlatformsMutation,
    useGetAccountReviewsQuery
} = igdbAPI;
