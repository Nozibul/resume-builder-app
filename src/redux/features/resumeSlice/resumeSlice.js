import { createSlice } from "@reduxjs/toolkit";
import { findItemIndexFromArray } from "../../../app-helpers/AppHelpers";


// define initial-state
const initialState = {
    resumeData: {
        personalInfo: {},
        experience: [],
        education: [],
        Skills: {
            listOfSkills: [],
            technologies: [],
        },
    },
    lastAttemptIndex: null,
    resumeTemplateId: null,
};

export const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: {
        // mark as initial state
        markAsInitialStateResumeSlice: (state, action) => {
            return {
                ...state,
                resumeData: {
                    personalInfo: {},
                    experience: [],
                    education: [],
                    Skills: {
                        listOfSkills: [],
                        technologies: [],
                    },
                },
                lastAttemptIndex: null,
                resumeTemplateId: null,
            };
        },
        storePersonalInfo: (state, action) => {
            // Store cv-personal info of user
            return {
                ...state,
                resumeData: {
                    ...state.resumeData,
                    personalInfo: action.payload.data,
                },
                lastAttemptIndex:
                    state.lastAttemptIndex !== null
                        ? action.payload.activeIndex > state.lastAttemptIndex
                            ? action.payload.activeIndex
                            : state.lastAttemptIndex
                        : action.payload.activeIndex,
                resumeTemplateId: action.payload.resumeTemplateId,
            };
        },
        storeExperience: (state, action) => {
            if (!Object.values(action.payload.data)?.length) {
                return {
                    ...state,

                    lastAttemptIndex:
                        action.payload.activeIndex > state.lastAttemptIndex
                            ? action.payload.activeIndex
                            : state.lastAttemptIndex,
                };
            }

            // need to removed in production this approach
            const findItemBeforePush = findItemIndexFromArray(state.resumeData.experience, action.payload.data.id);

            if (findItemBeforePush === -1 || findItemBeforePush === null) {
                const data = [...state.resumeData.experience];
                return {
                    ...state,
                    resumeData: {
                        ...state.resumeData,
                        experience: [...data, action.payload.data],
                    },

                    lastAttemptIndex:
                        action.payload.activeIndex > state.lastAttemptIndex
                            ? action.payload.activeIndex
                            : state.lastAttemptIndex,
                };
            }
        },
        removedExperience: (state, action) => {
            return {
                ...state,
                resumeData: {
                    ...state.resumeData,
                    experience: state.resumeData.experience?.filter((item) => item.id !== action.payload),
                },
            };
        },
        editExperience: (state, action) => {
            const findItemIndex = state.resumeData.experience.findIndex(
                (item) => item.id === parseInt(action.payload.data.id)
            );

            const copyData = [...state.resumeData.experience];

            copyData[findItemIndex] = { ...action.payload.data };

            return {
                ...state,
                resumeData: {
                    ...state.resumeData,
                    experience: copyData,
                },
            };
        },

        storeEducation: (state, action) => {
            // need to removed in production this approach
            const findItemBeforePush = findItemIndexFromArray(state.resumeData.education, action.payload.data.id);

            if (findItemBeforePush === -1 || findItemBeforePush === null) {
                const data = [...state.resumeData.education];

                return {
                    ...state,
                    resumeData: {
                        ...state.resumeData,
                        education: [...data, action.payload.data],
                    },

                    lastAttemptIndex:
                        action.payload.activeIndex > state.lastAttemptIndex
                            ? action.payload.activeIndex
                            : state.lastAttemptIndex,
                };
            }
        },

        editEducation: (state, action) => {
            const findItemIndex = state.resumeData.education.findIndex(
                (item) => item.id === parseInt(action.payload.data.id)
            );

            const copyData = [...state.resumeData.education];

            copyData[findItemIndex] = { ...action.payload.data };

            return {
                ...state,
                resumeData: {
                    ...state.resumeData,
                    education: copyData,
                },
            };
        },

        removedEducation: (state, action) => {
            return {
                ...state,
                resumeData: {
                    ...state.resumeData,
                    education: state.resumeData.education?.filter((item) => item.id !== action.payload),
                },
            };
        },


        storeSkills: (state, action) => {
            state.resumeData.Skills.listOfSkills = action.payload.data?.skill || [];
            state.resumeData.Skills.technologies = action.payload.data?.technology || [];

            state.lastAttemptIndex =
                action.payload.activeIndex > state.lastAttemptIndex
                    ? action.payload.activeIndex
                    : state.lastAttemptIndex;
        },

    },
});

export const {
    markAsInitialStateResumeSlice,
    storePersonalInfo,
    storeExperience,
    storeEducation,
    storeSkills,
    storeCertifications,
    storeAwards,
    storePublications,
    storeReferences,
    removedExperience,
    editExperience,
    editEducation,
    removedEducation,
} = resumeSlice.actions;

export default resumeSlice.reducer;
