import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {HowLongToBeatResult, IUserQueryArgs, IUserQueryResult} from "../types/types";

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
        login: builder.mutation<IUserQueryResult, IUserQueryArgs>({
            query: ({email, password}) => ({
                url: "login",
                method: "POST",
                body: {
                    email,
                    password
                },
            }),
        }),
    }),
});

export const {
    useGetHowLongToBeatQuery,
    useLoginMutation,
} = igdbAPI;
