import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {
    IGameCard, IGameReview
} from "../types/data";
import {
    AccountGamesQueryResult,
    ActivateQueryResult,
    AddReviewQueryArgs,
    AddReviewQueryResult,
    CheckIsAddedQueryResult, GetReviewsQueryArgs,
    GetReviewsQueryResult, IdQueryArg,
    LinkQueryArg,
    LoginQueryArgs,
    LoginQueryResult,
    RegistrationQueryArgs,
    RegistrationQueryResult, RemoveReviewQueryResult,
    SlugQueryArg
} from "../types/queries";

export const igdbAPI = createApi({
    reducerPath: "idbgAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env["REACT_APP_IGDB_API_URL"]}`,
        prepareHeaders: (headers) => {
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
        getAccountGames: builder.query<AccountGamesQueryResult, {}>({
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
        removeFromWishlist: builder.mutation<void, { slug: SlugQueryArg }>({
            query: ({slug}) => ({
                url: `wishlist/${slug}`,
                method: "DELETE",
            })
        }),
        removeFromLibrary: builder.mutation<void, { slug: SlugQueryArg }>({
            query: ({slug}) => ({
                url: `library/${slug}`,
                method: "DELETE",
            })
        }),
        checkIsAdded: builder.query<CheckIsAddedQueryResult, { slug: SlugQueryArg }>({
            query: ({slug}) =>
                `check/${slug}`,
        }),
        activateAccount: builder.query<ActivateQueryResult, { link: LinkQueryArg }>({
            query: ({link}) =>
                `activate/${link}`,
        }),
        addReview: builder.mutation<AddReviewQueryResult, AddReviewQueryArgs>({
            query: ({slug, text}) => ({
                url: `review/${slug}`,
                method: "POST",
                body: {
                    text
                },
            })
        }),
        getReviews: builder.query<GetReviewsQueryResult, GetReviewsQueryArgs>({
            query: ({slug, username}) =>
                `reviews/${slug}?username=${username}`,
        }),
        deleteReview: builder.mutation<RemoveReviewQueryResult, {id: IdQueryArg}>({
            query: ({id}) => ({
                url: `review/${id}`,
                method: "DELETE",
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
    useDeleteReviewMutation
} = igdbAPI;
