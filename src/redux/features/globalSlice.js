import { createSlice } from "@reduxjs/toolkit";

// define initial-state
const initialState = {
    isLoggedIn: false,
    isAdVisible: false,
    cvIdFromApi: null,
    cvGetPersonalInfoId: null,
    resumeIdFromApi: null,
    resumeGetPersonalInfoId: null,
    // store alert box button type
    cvDraftAlertText: "",
    resumeDraftAlertText: "",
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        storeCvDraftAlertTxt: (state, action) => {
            state.cvDraftAlertText = action.payload;
        },
        storeResumeDraftAlertTxt: (state, action) => {
            state.resumeDraftAlertText = action.payload;
        },
        storeLoggedInStatus: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        storeAdVisibleStatus: (state, action) => {
            state.isAdVisible = action.payload;
        },
        storeCVId: (state, action) => {
            //destruct property from payload
            const { cvId = null, personalInfoId = null } = action.payload;

            state.cvIdFromApi = cvId;
            state.cvGetPersonalInfoId = personalInfoId;
        },
        storeResumeId: (state, action) => {
            //destruct property from payload
            const { resumeId = null, personalInfoId = null } = action.payload;

            state.resumeIdFromApi = resumeId;
            state.resumeGetPersonalInfoId = personalInfoId;
        },
        makeInitialStateGlobalSlice: (state, action) => {
            // state.isLoggedIn = false;
            // state.isAdVisible = true;
            state.cvIdFromApi = null;
            state.resumeIdFromApi = null;
            state.cvGetPersonalInfoId = null;
            state.resumeGetPersonalInfoId = null;
            state.cvDraftAlertText = "";
            state.resumeDraftAlertText = "";
        },
        markInitialStateForCV: (state, action) => {
            state.cvIdFromApi = null;
            state.cvGetPersonalInfoId = null;
            state.cvDraftAlertText = "";
        },
        markInitialStateForResume: (state, action) => {
            state.resumeIdFromApi = null;
            state.resumeGetPersonalInfoId = null;
            state.resumeDraftAlertText = "";
        },
    },
});

export const {
    storeLoggedInStatus,
    storeAdVisibleStatus,
    storeCVId,
    storeResumeId,
    makeInitialStateGlobalSlice,
    storeCvDraftAlertTxt,
    storeResumeDraftAlertTxt,
    markInitialStateForCV,
    markInitialStateForResume,
} = globalSlice.actions;

export default globalSlice.reducer;
