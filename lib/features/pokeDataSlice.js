import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPokeData = createAsyncThunk(
  "pokedata/get",
  async (_, { getState }) => {
    const { pokeDataReducer } = getState();

    let urls = [];
    for (let id = pokeDataReducer.page; id < pokeDataReducer.page + 20; id++) {
      urls.push(`https://pokeapi.co/api/v2/pokemon/${id}`);
    }
    const requests = urls.map((url) => fetch(url));
    const responses = await Promise.all(requests);
    const errors = responses.filter((response) => !response.ok);
    if (errors.length > 0) {
      throw errors.map((response) => Error(response.statusText));
    }

    const json = responses.map((response) => response.json());
    const data = await Promise.all(json);
    return data.map((el) => ({
      stats: el.stats,
      types: el.types,
      id: el.id,
      name: el.name,
      imgUrl: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${el.id}.svg`,
    }));
  }
);

export const pokeDataSlice = createSlice({
  name: "pokeData",
  initialState: { data: [], page: 1, status: "idle", error: null },
  extraReducers(builder) {
    builder
      .addCase(fetchPokeData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokeData.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log("success", action.payload);
        state.data = [...state.data, ...action.payload];
        state.page += 20;
        // state.data = action.payload;
      })
      .addCase(fetchPokeData.rejected, (state, action) => {
        state.status = "failed";
        console.log("error", action.error);
        // state.error = action.error.message;
      });
  },
});

export const selectPokeData = (state) => state.pokeDataReducer;

export default pokeDataSlice.reducer;
