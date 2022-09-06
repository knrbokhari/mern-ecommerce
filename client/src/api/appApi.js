import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// get Bearer token from Cookie
const token = `Bearer ${Cookies.get("token")}`;

// console.log(token);

// create the api
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/users/signup",
        method: "POST",
        body: user,
      }),
    }),

    login: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    // creating product
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        body: product,
        method: "POST",
        headers: { Authorization: token },
      }),
    }),

    // add to cart
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: "/products/add-to-cart",
        headers: { Authorization: token },
        body: cartInfo,
        method: "POST",
      }),
    }),

    // remove from cart
    removeFromCart: builder.mutation({
      query: (body) => ({
        url: "/products/remove-from-cart",
        headers: { Authorization: token },
        body,
        method: "POST",
      }),
    }),

    // increase cart
    increaseCartProduct: builder.mutation({
      query: (body) => ({
        url: "/products/increase-cart",
        headers: { Authorization: token },
        body,
        method: "POST",
      }),
    }),

    // decrease cart
    decreaseCartProduct: builder.mutation({
      query: (body) => ({
        url: "/products/decrease-cart",
        headers: { Authorization: token },
        body,
        method: "POST",
      }),
    }),

    // create order
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        headers: { Authorization: token },
        body,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useCreateProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useCreateOrderMutation,
} = appApi;

export default appApi;
