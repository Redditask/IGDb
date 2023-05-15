import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {
    HowLongToBeatResult,
    LoginQueryArgs,
    LoginQueryResult,
    RegistrationQueryArgs,
    RegistrationQueryResult
} from "../types/types";

export const igdbAPI = createApi({
    reducerPath: "idbgAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env["REACT_APP_IGDB_API_URL"]}`,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getHowLongToBeat: builder.query<HowLongToBeatResult, {gameName: string}>({
            query: ({gameName}) =>
                `howLongToBeat?game=${gameName}`,
        }),
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
        })
    }),
});

export const {
    useGetHowLongToBeatQuery,
    useLoginMutation,
    useRegistrationMutation
} = igdbAPI;
