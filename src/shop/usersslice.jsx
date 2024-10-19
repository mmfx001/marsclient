import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// O'quvchilar ma'lumotlarini API'dan fetch qilish
export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const response = await fetch('https://shoopjson-2.onrender.com/api/oquvchi');  // O'quvchilar ma'lumotlari joylashgan URL
  const data = await response.json();            // JSON formatdagi ma'lumotlarni olamiz
  return data[0];                                // Dastlab birinchi o'quvchini olish
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
    status: 'idle',      // Ma'lumot olish holati
    error: null          // Xatoliklar uchun
  },
  reducers: {
    updateCoin: (state, action) => {
      state.coin = action.payload;  // Foydalanuvchining coin miqdorini yangilash
    },
    resetCoin: (state) => {
      state.coin = 2000;            // Coinni dastlabki holatiga qaytarish
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';   // Ma'lumotlar yuklanayotganini ko'rsatish
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        const user = action.payload;
        state.ism = user.ism;
        state.parol = user.parol;
        state.liga = user.liga;
        state.oxirgitashrif = user.oxirgitashrif;
        state.coin = parseInt(user.coin);       // Coin qiymatini stringdan raqamga aylantirish
        state.davomat = parseInt(user.davomat);
        state.xp = parseInt(user.xp);
        state.guruh = user.guruh;
        state.status = 'succeeded';             // Ma'lumot muvaffaqiyatli yuklandi
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';    // Xatolik yuz berganini ko'rsatish
        state.error = action.error.message;
      });
  }
});

// Foydalanuvchining coin miqdorini olish uchun selector
export const selectUserCoin = (state) => state.user.coin;

export const { updateCoin, resetCoin } = userSlice.actions;
export default userSlice.reducer;
