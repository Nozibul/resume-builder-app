import { createSlice } from "@reduxjs/toolkit";
import { findItemIndexFromArray } from "../../../utils/appHelpers"

// define initial-state
const initialState = {
    cvData: {
        personalInfo: {},
        experience: [],
        education: [],
        projectPortfolio: [],
        Skills: {
            listOfSkills: [],
            technologies: [],
        },
        certifications: [],
    },
    lastAttemptIndex: null,
    cvTemplateId: null,
};


export const cvSlice = createSlice({
    name: "cv",
    initialState,
    reducers: {
        // mark as initial state
        markAsInitialStateCvSlice: (state) => {
            return {
                ...state,
                cvData: {
                    personalInfo: {},
                    experience: [],
                    education: [],
                    projectPortfolio: [],
                    Skills: {
                        listOfSkills: [],
                        technologies: [],
                    },
                    certifications: [],
                    references: [],
                },
                lastAttemptIndex: null,
                cvTemplateId: null,
            };
        },

        storePersonalInfo: (state, action) => {
            // Store cv-personal info of user
            return {
                ...state,
                cvData: {
                    ...state.cvData,
                    personalInfo: action.payload.data,
                },
                lastAttemptIndex:
                    state.lastAttemptIndex !== null
                        ? action.payload.activeIndex > state.lastAttemptIndex
                            ? action.payload.activeIndex
                            : state.lastAttemptIndex
                        : action.payload.activeIndex,

                cvTemplateId: action.payload.cvTemplateId,
            };
        },

         /** Experience potion start here */
        storeExperience: (state, action) => {
            // store active index for skip method
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
            const findItemBeforePush = findItemIndexFromArray(state.cvData.experience, action.payload.data.id);

            if (findItemBeforePush === -1 || findItemBeforePush === null) {
                const data = [...state.cvData.experience];

                return {
                    ...state,
                    cvData: {
                        ...state.cvData,
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
                cvData: {
                    ...state.cvData,
                    experience: state.cvData.experience?.filter((item) => item.id !== action.payload),
                },
            };
        },

        editExperience: (state, action) => {
            const findItemIndex = state.cvData.experience.findIndex(
                (item) => item.id === parseInt(action.payload.data.id)
            );

            const copyData = [...state.cvData.experience];

            copyData[findItemIndex] = { ...action.payload.data };

            return {
                ...state,
                cvData: {
                    ...state.cvData,
                    experience: copyData,
                },
            };
        },

        
        /** Education potion start here */
        storeEducation: (state, action) => {
            // need to removed in production this approach
            const findItemBeforePush = findItemIndexFromArray(state.cvData.education, action.payload.data.id);

            if (findItemBeforePush === -1 || findItemBeforePush === null) {
                const data = [...state.cvData.education];

                return {
                    ...state,
                    cvData: {
                        ...state.cvData,
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
            const findItemIndex = state.cvData.education.findIndex(
                (item) => item.id === parseInt(action.payload.data.id)
            );

            const copyData = [...state.cvData.education];

            copyData[findItemIndex] = { ...action.payload.data };

            return {
                ...state,
                cvData: {
                    ...state.cvData,
                    education: copyData,
                },
            };
        },

        removedEducation: (state, action) => {
            return {
                ...state,
                cvData: {
                    ...state.cvData,
                    education: state.cvData.education?.filter((item) => item.id !== action.payload),
                },
            };
        },

        
        /** skill potion start here */
        storeTechnologies: (state, action) => {
            const findItemIndex = findItemIndexFromArray(state.cvData.Skills.technologies, action.payload.data.id);

            // item is found into root listOfSkills array, now update it
            if (findItemIndex === -1 || findItemIndex === null) {
                state.cvData.Skills.technologies = [...state.cvData.Skills.technologies, action.payload.data];
                state.lastAttemptIndex =
                    action.payload.activeIndex > state.lastAttemptIndex
                        ? action.payload.activeIndex
                        : state.lastAttemptIndex;
            }
        },

        updateTechnologies: (state, action) => {
            const findItemIndex = findItemIndexFromArray(state.cvData.Skills.technologies, action.payload.itemId);

            // item is found into root technologies array, now update it
            if (findItemIndex !== null && findItemIndex !== -1) {
                state.cvData.Skills.technologies[findItemIndex].name = action.payload.data;
            }
        },

        storeSkills: (state, action) => {
        
            state.cvData.Skills.listOfSkills = action.payload.data?.skill || [];
            state.cvData.Skills.technologies = action.payload.data?.technology || [];

            state.lastAttemptIndex =
                action.payload.activeIndex > state.lastAttemptIndex
                    ? action.payload.activeIndex
                    : state.lastAttemptIndex;
        
        },


        /** Certifications potion start here */
        storeCertifications: (state, action) => {
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
            const findItemBeforePush = findItemIndexFromArray(state.cvData.certifications, action.payload.data.id);

            if (findItemBeforePush === -1 || findItemBeforePush === null) {
                const data = [...state.cvData.certifications];
                return {
                    ...state,
                    cvData: {
                        ...state.cvData,
                        certifications: [...data, action.payload.data],
                    },

                    lastAttemptIndex:
                        action.payload.activeIndex > state.lastAttemptIndex
                            ? action.payload.activeIndex
                            : state.lastAttemptIndex,
                };
            }
        },

        removedCertification: (state, action) => {
            return {
                ...state,
                cvData: {
                    ...state.cvData,
                    certifications: state.cvData.certifications?.filter((item) => item.id !== action.payload),
                },
            };
        },

        editCertification: (state, action) => {
            const findItemIndex = state.cvData.certifications.findIndex(
                (item) => item.id === parseInt(action.payload.data.id)
            );

            const copyData = [...state.cvData.certifications];

            copyData[findItemIndex] = { ...action.payload.data };

            return {
                ...state,
                cvData: {
                    ...state.cvData,
                    certifications: copyData,
                },
            };
        },


        // Project store action method goes here
        storeProjects: (state, action) => {
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
            const findItemBeforePush = findItemIndexFromArray(state.cvData.projectPortfolio, action.payload.data.id);

            if (findItemBeforePush === -1 || findItemBeforePush === null) {
                const data = [...state.cvData.projectPortfolio];

                return {
                    ...state,
                    cvData: {
                        ...state.cvData,
                        projectPortfolio: [...data, action.payload.data],
                    },

                    lastAttemptIndex:
                        action.payload.activeIndex > state.lastAttemptIndex
                            ? action.payload.activeIndex
                            : state.lastAttemptIndex,
                };
            }
        },

        editProjects: (state, action) => {
            const findItemIndex = state.cvData.projectPortfolio.findIndex(
                (item) => item.id === parseInt(action.payload.data.id)
            );

            const copyData = [...state.cvData.projectPortfolio];

            copyData[findItemIndex] = { ...action.payload.data };

            return {
                ...state,
                cvData: {
                    ...state.cvData,
                    projectPortfolio: copyData,
                },
            };
        },

        removedProjects: (state, action) => {
            return {
                ...state,
                cvData: {
                    ...state.cvData,
                    projectPortfolio: state.cvData.projectPortfolio?.filter((item) => item.id !== action.payload),
                },
            };
        },
    },
});

export const {
    markAsInitialStateCvSlice,
    storePersonalInfo,
    storeExperience,
    storeEducation,
    storeSkills,
    storeTechnologies,
    storeCertifications,
    storeProjects,
  
    editExperience,
    editEducation,
    editProjects,
    editCertification,

    removedExperience,
    removedEducation,
    removedCertification,
    removedProjects,

    updateTechnologies,
} = cvSlice.actions;

export default cvSlice.reducer;