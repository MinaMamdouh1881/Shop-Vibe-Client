import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  PRODUCT,
  GENDER,
  WOMENCATEGORIES,
  MENCATEGORIES,
} from '../../types/productsType';
const baseUrl = import.meta.env.VITE_BASE_URL;

type PRODUCTRES = {
  success: boolean;
  products: PRODUCT[];
};

export const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/products` }),
  endpoints: (builder) => ({
    getFeaturedMen: builder.query<PRODUCTRES | void, undefined>({
      query: () => ({
        url: '/getfeaturedman',
      }),
    }),
    getFeaturedWomen: builder.query<PRODUCTRES | void, undefined>({
      query: () => ({
        url: '/getfeaturedwoman',
      }),
    }),
    getBestSalesMen: builder.query<PRODUCTRES | void, undefined>({
      query: () => ({
        url: '/getbestsalesman',
      }),
    }),
    getBestSalesWomen: builder.query<PRODUCTRES | void, undefined>({
      query: () => ({
        url: '/getbestsaleswoman',
      }),
    }),
    getNewArrival: builder.query<PRODUCTRES | void, undefined>({
      query: () => ({
        url: '/getNewArrival',
      }),
    }),
    getProductById: builder.query<
      {
        success: boolean;
        product: PRODUCT;
      } | void,
      { id: string }
    >({
      query: ({ id }: { id: string }) => ({
        url: `/product/${id}`,
      }),
    }),
    getProducts: builder.query<
      PRODUCTRES | void,
      { gender: GENDER; category?: WOMENCATEGORIES | MENCATEGORIES }
    >({
      query: ({
        gender,
        category,
      }: {
        gender: GENDER;
        category: WOMENCATEGORIES | MENCATEGORIES;
      }) => ({
        url: `${
          category
            ? `/getProducts/${gender}?category=${category}`
            : `/getProducts/${gender}`
        }`,
      }),
    }),
  }),
});

export const {
  useGetBestSalesMenQuery,
  useGetFeaturedMenQuery,
  useGetBestSalesWomenQuery,
  useGetFeaturedWomenQuery,
  useGetProductByIdQuery,
  useGetProductsQuery,
  useGetNewArrivalQuery,
} = productsApi;
