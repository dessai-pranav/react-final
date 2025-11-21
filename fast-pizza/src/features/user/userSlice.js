import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding.js";
import {action} from "../order/CreateOrder.jsx";

// 1) Get browser geolocation
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// 2) Thunk for fetching user's address
export const fetchAddress = createAsyncThunk(
    "user/fetchAddress",
    async function () {
      const positionObj = await getPosition();

      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };

      const addressObj = await getAddress(position);
      const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

      return { position, address };
    }
);

// 3) Initial state
const initialState = {
  username: "pranav",
  status: "idle",
  position: {},
  address: "",
  error: ''
};

// 4) Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },

  // FIXED SYNTAX
  extraReducers: (builder) => {
    builder
        .addCase(fetchAddress.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchAddress.fulfilled, (state, action) => {
          state.status = "idle";
          state.position = action.payload.position;
          state.address = action.payload.address;
        })
        .addCase(fetchAddress.rejected, (state) => {
          state.status = "error";
          state.error = 'there was an errorr';
        });
  },
});

// 5) Exports
export const { updateName } = userSlice.actions;
export default userSlice.reducer;
