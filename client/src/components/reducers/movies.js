import { GET_MOVIES, MOVIES_ERROR,  GET_MOVIE, GET_SIMULAR_MOVIES,GET_CAST, GET_ACTOR, GET_MOVIE_BY_ACTOR} from '../actions/types';
const INITIAL_STATE = {
    movies: '',
    movie: '',
    moviesByActor:'',
    casts:'',
    actor:'',
    simularMovie: '',
    errorMessage: ''
};

export default function(state = INITIAL_STATE, action){
    switch (action.type) {
        case  GET_MOVIES:
            return {...state, movies: action.payload || false};
        case  GET_MOVIE:
            return {...state, movie: action.payload || false};
        case GET_ACTOR:
            return {...state, actor: action.payload || false};
        case GET_MOVIE_BY_ACTOR:
            return {...state, moviesByActor: action.payload || false};
        case GET_CAST:
            return {...state, casts: action.payload || false};
        case  GET_SIMULAR_MOVIES:
            return {...state, simularMovie: action.payload || false};
        case MOVIES_ERROR:
            return {...state, errorMessage: action.payload};
        default:
            return state
    }
}