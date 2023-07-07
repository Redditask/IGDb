import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {
    AccountGamesQueryResult, ActivateQueryResult, CheckIsAddedQueryResult,
    IGameCard, LinkQueryArg,
    LoginQueryArgs,
    LoginQueryResult,
    RegistrationQueryArgs,
    RegistrationQueryResult, SlugQueryArg
} from "../types/types";

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
            query: ()=>
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
        removeFromWishlist: builder.mutation<void, {slug: SlugQueryArg}>({
           query: ({slug}) => ({
               url: `wishlist/${slug}`,
               method: "DELETE",
           })
        }),
        removeFromLibrary: builder.mutation<void, {slug: SlugQueryArg}>({
            query: ({slug}) => ({
                url: `library/${slug}`,
                method: "DELETE",
            })
        }),
        checkIsAdded: builder.query<CheckIsAddedQueryResult, {slug: SlugQueryArg}>({
           query: ({slug}) =>
               `check/${slug}`,
        }),
        activateAccount: builder.query<ActivateQueryResult, {link: LinkQueryArg}>({
            query: ({link}) =>
                `activate/${link}`
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
    useActivateAccountQuery
} = igdbAPI;
