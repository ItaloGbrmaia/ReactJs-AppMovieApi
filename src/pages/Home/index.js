import { useEffect, useState } from 'react'
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

// URL DA API : https://api.themoviedb.org/3/movie/now_playing?api_key=e4c9ea19f9fb2a8ff3aa321f10389680&language=pt-BR
function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoding ] = useState (true, []);

    useEffect(()=>{
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params:{
                    api_key: "e4c9ea19f9fb2a8ff3aa321f10389680",
                    language: "pt-BR",
                    page: 1,

                }
            });

            //console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0,10));
            setLoding(false);
            console.log(response);
        }

        loadFilmes();
    }, []);

    if(loading){
        return(
            <div className="loading">
                Carregando filmes....
            </div>
        )

    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((film) => {
                    return(
                        <article key={film.id}>
                            <strong>{film.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} alt={film.title}/>
                            <Link to={`/filmes/${film.id}`}>Acessar o filme</Link>
                        </article>
                    )
                })}
            </div>
            <dic></dic>
        </div>
    );
}

export default Home;