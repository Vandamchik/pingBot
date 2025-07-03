import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { apiHelper } from '../../helpers/apiHelper';

export const sendPing = createAsyncThunk(
  'ping/sendPing',
  async (payload = {}, thunkAPI) => {
    try {
        const data = await apiHelper('/ping', {
          method: 'POST', 
          body: payload 
        })

        console.log('response', data);

        return data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const pingSlice = createSlice({
  name: 'ping',
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    resetPing: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPing.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(sendPing.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(sendPing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error';
      });
  },
});

export const { resetPing } = pingSlice.actions;
export const pingReducer = pingSlice.reducer;
