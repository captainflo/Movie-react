import { combineReducers } from 'redux';
import auth from './auth';
import movies from './movies'
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: auth,
    form: formReducer,
    movies: movies
});