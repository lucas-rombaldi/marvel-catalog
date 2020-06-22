import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import marvel from "./marvelReducer";
import tour from "./tourReducer";

const rootReducer = combineReducers({
  marvel,
  tour,
  form: reduxFormReducer,
});

export default rootReducer;
