import axios from "axios";

// BASE DA URL : https://api.themoviedb.org/3/
// URL DA API : https://api.themoviedb.org/3/movie/now_playing?api_key=e4c9ea19f9fb2a8ff3aa321f10389680&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;