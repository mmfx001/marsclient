import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const response = await fetch('http://localhost:5001/oquvchi');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data[0]; // Faqat birinchi o'quvchini qaytarish
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    coin: 2000,
    ism: '',
    parol: '',
    liga: '',
    oxirgitashrif: '',
    davomat: 0,
    xp: 0,
    guruh: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    updateCoin: (state, action) => {
      state.coin = action.payload;
    },
    resetCoin: (state) => {
      state.coin = 2000;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        const user = action.payload;
        state.ism = user.ism;
        state.parol = user.parol;
        state.liga = user.liga;
        state.oxirgitashrif = user.oxirgitashrif;
        state.coin = parseInt(user.coin);
        state.davomat = parseInt(user.davomat);
        state.xp = parseInt(user.xp);
        state.guruh = user.guruh;
        state.status = 'succeeded';
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectUserCoin = (state) => state.user.coin;
export const { updateCoin, resetCoin } = userSlice.actions;
export default userSlice.reducer;
