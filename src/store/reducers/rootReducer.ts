import { combineReducers } from "redux";
import { identityReducer } from "./identityReducer";

export const rootReducer = combineReducers({
    identity: identityReducer,
});

export type RootState = ReturnType<typeof rootReducer>;