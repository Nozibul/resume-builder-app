import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    templateInitialLoader: true,
};

export const customSlice = createSlice({
    name: "custom",
    initialState,
    reducers: {
        startLoaderMethod: (state, action) => {
            state.templateInitialLoader = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { startLoaderMethod } = customSlice.actions;

export default customSlice.reducer;
