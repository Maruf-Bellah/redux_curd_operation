import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBearerToken = () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTY2ZTY0OGE4ZDQ1Y2U4Y2YzZjBmNjkiLCJtZXJjaGFudCI6IjY1NjZlNjQ4YThkNDVjZThjZjNmMGY2NyIsImlhdCI6MTcwMTYxNjUyOSwiZXhwIjoxNzAxNjIwMTI5LCJ0eXBlIjoiQUNDRVNTIn0.5tD3Ho17DM4Y3wzksKbd8zO1qZzr4oi5lt5QIKwvsAI";
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://20.212.156.134:5050/api/v2",
    prepareHeaders: (headers) => {
      const token = getBearerToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // tagTypes: [ 'LeaveTypeList' ],
  endpoints: (builder) => ({
    GetLeave: builder.query({
      query: () => ({
        url: "incomes-expenses/sections/6566e648a8d45ce8cf3f0f6b?type=EXPENSE",
        method: "GET",
      }),
      // providesTags: [ 'LeaveTypeList' ]
    }),
    RemoveLeaveType: builder.mutation({
      query: (id) => ({
        url: `/incomes-expenses/sections/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LeaveTypeList"],
    }),
    AddLeave: builder.mutation({
      query: (data) => ({
        url: "/incomes-expenses/sections",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          let { data: addData } = await queryFulfilled;
          //   console.log(addData);
          dispatch(
            apiSlice.util.updateQueryData("GetLeave", undefined, (draft) => {
              draft?.push(addData);
            })
          );
        } catch (error) {
          // console.log(error);
        }
      },
    }),

    editLeave: builder.mutation({
      query: ({ postBody }) => ({
        url: `/incomes-expenses/sections/${postBody._id}`,
        method: "PATCH",
        body: postBody,
      }),
      invalidatesTags: ["LeaveTypeList"],
    }),
  }),
});

export const {
  useGetLeaveQuery,
  useAddLeaveMutation,
  useRemoveLeaveTypeMutation,
  useEditLeaveMutation,
} = apiSlice;
