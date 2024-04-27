import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cvSlice from "./features/cvSlice/cvSlice"
import resumeSlice from "./features/resumeSlice/resumeSlice"
import { useMemo } from "react";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import globalSlice from "./features/globalSlice";
import customSlice from "./features/customSlice";
import counterSlice from "./features/counterSlice";

// To avoid error (redux-persist failed to create sync storage)
const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

// store for persist config
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

// combine reducers
const rootReducer = combineReducers({
    // authReducers,
    counterSlice,
    cvSlice,
    resumeSlice,
    globalSlice,
    customSlice,
});

// persist config
const persistConfig = {
    key: "root",
    version: 1,
    storage,
    // There is an issue in the source code of redux-persist (default setTimeout does not cleaning)
    timeout: null,
    /* if you do not want to persist this part of the state */
    blacklist: ["counterSlice", "authReducers", "customSlice"],
};

// Function to create the persisted reducer with updated persistConfig
// const createPersistedReducer = (blacklist = []) => {
//     return persistReducer(
//         {
//             ...persistConfig,
//             blacklist: ["counterSlice", "authReducers", ...blacklist],
//         },
//         rootReducer
//     );
// };

// we put global store into this
let store;

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// making store with the help of configureStore
function makeStore(initialState = {}) {
    // configure store
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
                immutableCheck: false,
            }),
        //.concat(logger),
    });
}

// initialize store
export const initializeStore = (preloadedState) => {
    let _store = store ?? makeStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = makeStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === "undefined") return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

// memorize version of global store
export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}

