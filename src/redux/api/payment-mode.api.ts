import { createApi } from '@reduxjs/toolkit/query/react';
import { IPaymentModeProps } from 'interface';
import { useBaseQuery } from 'utils';

const PaymentModeApi = createApi({
  baseQuery: useBaseQuery,
  reducerPath: 'paymentModeApi',
  tagTypes: ['paymentModeApi'],
  endpoints: ({ mutation, query }) => ({
    getPaymentMode: query<{ data: IPaymentModeProps[] }, void>({
      query: () => '/payment-mode',
      providesTags: ['paymentModeApi']
    }),
    getPaymentModeById: query<{ data: IPaymentModeProps }, string>({
      query: paymentModeId => `/payment-mode/${paymentModeId}`,
      providesTags: ['paymentModeApi']
    }),
    addPaymentMode: mutation<{ data: string }, IPaymentModeProps>({
      query: payload => {
        return {
          url: '/payment-mode',
          method: 'POST',
          body: {
            ...payload
          }
        };
      },
      invalidatesTags: ['paymentModeApi']
    }),
    updatePaymentMode: mutation<{ data: string }, IPaymentModeProps>({
      query: payload => {
        return {
          url: `/payment-mode/${payload.PaymentModeId}`,
          body: { ...payload },
          method: 'PUT'
        };
      },
      invalidatesTags: ['paymentModeApi']
    }),
    deletePaymentMode: mutation<{ data: string }, string>({
      query: paymentModeId => {
        return {
          url: `/payment-mode/${paymentModeId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['paymentModeApi']
    })
  })
});

export const PaymentModeApiReducer = PaymentModeApi.reducer;
export const PaymentModeApiMiddleware = PaymentModeApi.middleware;
export const {
  useAddPaymentModeMutation,
  useDeletePaymentModeMutation,
  useGetPaymentModeByIdQuery,
  useGetPaymentModeQuery,
  useLazyGetPaymentModeByIdQuery,
  useLazyGetPaymentModeQuery,
  useUpdatePaymentModeMutation
} = PaymentModeApi;
