import { combineReducers } from 'redux';
import marvel from './marvelReducer';

const rootReducer = combineReducers({
    marvel
});

export default rootReducer;