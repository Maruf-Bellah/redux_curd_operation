import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBearerToken = () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTY2ZTY0OGE4ZDQ1Y2U4Y2YzZjBmNjkiLCJtZXJjaGFudCI6IjY1NjZlNjQ4YThkNDVjZThjZjNmMGY2NyIsImlhdCI6MTcwMTUyOTcwNywiZXhwIjoxNzAxNTMzMzA3LCJ0eXBlIjoiQUNDRVNTIn0.k0xDdMI7Hw-XU45k8GlJt_CfQakjr4dGk3KazGpDafc";
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
        url: `/LeaveTypeDelete/${id}`,
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

    // editLeave: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/LeaveTypeUpdate/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["LeaveTypeList"],
    // }),
  }),
});

export const {
  useGetLeaveQuery,
  useAddLeaveMutation,
  useRemoveLeaveTypeMutation,
  //   useEditLeaveMutation,
} = apiSlice;
