import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import marvel from "./marvelReducer";

const rootReducer = combineReducers({
  marvel,
  form: reduxFormReducer,
});

export default rootReducer;
