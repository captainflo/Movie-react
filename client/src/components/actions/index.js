import keys from "../../config/keys";
import axios from "axios";
import { AUTH_USER, AUTH_ERROR, EDIT_USER, GET_MOVIES, MOVIES_ERROR, GET_MOVIE,  GET_SIMULAR_MOVIES} from "./types";
import * as JWT from "jwt-decode";

// Signup with Passport JWT
export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${keys.siteUrl}/signup`, formProps);
    localStorage.setItem("token", response.data.token);
    // then when you have the token decode it.
    let token = localStorage.token;
    if (token) {
      // Decode token
      token = JWT(token);
      // let token to variable data
      let data = token;
      data = {
        id: data.sub,
        email: data.email
      };
      const response = await axios.get(`/api/user/${data.id}`);
      dispatch({ type: AUTH_USER, payload: response.data });
      callback(); /* history callback */
    } else {
      token = null;
    }
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

// Signin with Passport JWT
export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(`${keys.siteUrl}/signin`, formProps);
    localStorage.setItem("token", response.data.token);
    // then when you have the token decode it.
    let token = localStorage.token;
    if (token) {
      // Decode token
      token = JWT(token);
      // let token to variable data
      let data = token;
      data = {
        id: data.sub,
        email: data.email
      };
      const response = await axios.get(`/api/user/${data.id}`);
      dispatch({ type: AUTH_USER, payload: response.data });
      callback(); /* history callback */
    } else {
      token = null;
    }
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
  }
};

// Signout User by Auth or Passport JWT
export const signout = () => async dispatch => {
  // Signout for Auth(Google, insta, linkedin, facebook)
  await axios.get("/api/logout");
  dispatch({ type: AUTH_USER, payload: "" });
  localStorage.removeItem("token");
  dispatch({ type: AUTH_ERROR, payload: "" });
};

// Fetch the user by Passport JWT 
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  let token = localStorage.token;
  if (token) {
    // Decode token
    token = JWT(token);
    // let token to variable data
    let data = token;
    data = {
      id: data.sub,
      email: data.email
    };
    const response = await axios.get(`/api/user/${data.id}`);
    dispatch({ type: AUTH_USER, payload: response.data });
  } else {
    token = null;
    dispatch({ type: AUTH_USER, payload: res.data });
  }
};

// Edit User 
export const editUser = (id, formValues, callback) => async dispatch => {
  try {
    dispatch({ type: AUTH_ERROR, payload: "" });
    const response = await axios.post(`/api/user/${id}`, formValues);
    dispatch({ type: EDIT_USER, payload: response.data });
    callback(); /* history callback */
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

// Edit delete 
export const deleteUser = (id, callback) => async dispatch => {
  await axios.delete(`/api/user/${id}`);
  dispatch({ type: EDIT_USER, payload: '' });
  localStorage.removeItem("token");
  callback(); /* history callback */
};

// ******************************** API MOVIES ************************************************* //

// Get All Movie by search
export const getMovies = (movie) => async dispatch => {
  try {
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=e5b611686829ce735cf695069e08bfa6&language=en-US&query=${movie}&page=1&include_adult=false`)
  dispatch({ type: GET_MOVIES, payload: response.data });
  } catch (e) {
    dispatch({ type: MOVIES_ERROR, payload: "error fetch movie" });
  }
};

// Show details Movie
export const showMovie = (id) => async dispatch => {
  const array = []
  try {
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=e5b611686829ce735cf695069e08bfa6&language=en-US`)
  const genres = response.data.genres
  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i].id;
    array.push(genre)
  }
  localStorage.setItem("movie", array)
  dispatch({ type: GET_MOVIE, payload: response.data });
  } catch (e) { 
    dispatch({ type: MOVIES_ERROR, payload: "error fetch movie" });
  }
};

// Simular Movie by genre
export const simularMoviesByGenre = (genres) => async dispatch => {
  try {
  const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=e5b611686829ce735cf695069e08bfa6&language=en-US&page=1&with_genres=${genres}`)
  dispatch({ type: GET_SIMULAR_MOVIES, payload: response.data });
  } catch (e) {
    dispatch({ type: MOVIES_ERROR, payload: "error fetch movie" });
  }
};








