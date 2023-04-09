import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {HowLongToBeatResult} from "../types/types";

export const igdbAPI = createApi({
    reducerPath: "idbgAPI",
    baseQuery: fetchBaseQuery({baseUrl: `http://localhost:5000/api/`}),
    endpoints: (builder) => ({
        getHowLongToBeat: builder.query<HowLongToBeatResult, {gameName: string}>({
            query: ({gameName}) =>
                `howLongToBeat?game=${gameName}`,
        }),
    }),
});

export const {
  useGetHowLongToBeatQuery,
} = igdbAPI;
