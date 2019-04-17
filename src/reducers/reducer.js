import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducers = {
    form: formReducer     // <---- Mounted at 'form'
};
const rootReducers = combineReducers(reducers);
export default rootReducers;
