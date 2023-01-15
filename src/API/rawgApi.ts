import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const rawgApi = createApi({
    reducerPath: "rawgApi",
    baseQuery: fetchBaseQuery({baseUrl: `https://api.rawg.io/api/`}),
    endpoints: (builder) => ({
        getAllGames: builder.query<any, number>({
            query: (page) => `games?key=${process.env["REACT_APP_API_KEY"]}&page=${page}`,
        }),
    }),
});

export const {useGetAllGamesQuery} = rawgApi;
