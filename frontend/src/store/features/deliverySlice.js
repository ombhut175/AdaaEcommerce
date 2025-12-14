import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deliveryApi } from '../../services/api';

export const fetchDeliveries = createAsyncThunk(
  'delivery/fetchDeliveries',
  async (filter) => {
    const response = await deliveryApi.getDeliveries(filter);
    return response;
  }
);

export const updateDeliveryStatus = createAsyncThunk(
  'delivery/updateStatus',
  async ({ orderId, action }) => {
    let response;
    switch (action) {
      case 'delivered':
        response = await deliveryApi.markDelivered(orderId);
        break;
      case 'pickup-return':
        response = await deliveryApi.markPickedUpForReturn(orderId);
        break;
      case 'pickup-exchange':
        response = await deliveryApi.markPickedUpForExchange(orderId);
        break;
      case 'cancel':
        response = await deliveryApi.cancelDelivery(orderId);
        break;
      default:
        throw new Error('Invalid action');
    }
    return response;
  }
);

const deliverySlice = createSlice({
  name: 'delivery',
  initialState: {
    deliveries: [],
    status: 'idle',
    error: null,
    selectedDelivery: null,
  },
  reducers: {
    setSelectedDelivery: (state, action) => {
      state.selectedDelivery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deliveries = action.payload;
      })
      .addCase(fetchDeliveries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch deliveries';
      })
      .addCase(updateDeliveryStatus.fulfilled, (state, action) => {
        const index = state.deliveries.findIndex(d => d.id === action.payload.id);
        if (index !== -1) {
          state.deliveries[index] = action.payload;
        }
      });
  },
});

export const { setSelectedDelivery } = deliverySlice.actions;
export const selectDeliveries = (state) => state.delivery.deliveries;
export const selectDeliveryStatus = (state) => state.delivery.status;
export const selectDeliveryError = (state) => state.delivery.error;
export const selectSelectedDelivery = (state) => state.delivery.selectedDelivery;

export default deliverySlice.reducer;