import { USER_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        login : builder.mutation({
            query  : (data) =>
           ({
                url : `${USER_URL}/auth`,
                method : 'POST' ,
                body : data, 
            }),
        }),
        register : builder.mutation({
            query  : (data) =>
           ({
                url : `${USER_URL}`, // just to user not to the register api like `${USER_URL}/register`
                method : 'POST' ,
                body : data, 
            }),
        }),
        logout : builder.mutation({
            query  : (data) =>
           ({
                url : `${USER_URL}/logout`,
                method : 'POST' ,
            }),
        })

    })
})

export const { useLoginMutation , useLogoutMutation  , useRegisterMutation } = usersApiSlice ;