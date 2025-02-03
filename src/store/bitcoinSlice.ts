import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Описываем доступные валюты
type Currency = "USD" | "EUR" | "GBP";

// Тип состояния
interface BitcoinState {
  prices: Record<Currency, number | null>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Начальное состояние
const initialState: BitcoinState = {
  prices: {
    USD: null,
    EUR: null,
    GBP: null,
  },
  status: "idle",
  error: null,
};

// Асинхронный thunk для загрузки курсов
export const fetchBitcoinPrices = createAsyncThunk<
  Record<Currency, number>,
  void
>("bitcoin/fetchPrices", async () => {
  const response = await fetch(
    "https://api.coindesk.com/v1/bpi/currentprice.json"
  );
  const data = await response.json();

  return {
    USD: data.bpi.USD.rate_float,
    EUR: data.bpi.EUR.rate_float,
    GBP: data.bpi.GBP.rate_float,
  };
});

const bitcoinSlice = createSlice({
  name: "bitcoin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBitcoinPrices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchBitcoinPrices.fulfilled,
        (state, action: PayloadAction<Record<Currency, number>>) => {
          state.status = "succeeded";
          state.prices = action.payload;
        }
      )
      .addCase(fetchBitcoinPrices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Ошибка загрузки";
      });
  },
});

export default bitcoinSlice.reducer;
