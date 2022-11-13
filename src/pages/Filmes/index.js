import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './filmes.css';
import {toast} from 'react-toastify'

import api from '../../services/api';

function Filmes(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [filme , setFilmess] = useState ({});
    const [loading , setLoading] = useState (true);


    useEffect(()=>{
        async function loadFilm(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "e4c9ea19f9fb2a8ff3aa321f10389680",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilmess(response.data);
                setLoading(false);
                console.log(response.data)
            })
            .catch(()=>{
                navigate("/", {replace: true});
                return;
            })
        }

        loadFilm();



    }, [navigate, id]);

    function SalvarFilme (){
        const minhalista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhalista) || [];

        const hasFilme = filmesSalvos.some((filmesSa) => filmesSa.id === filme.id)


        if(hasFilme){
            toast.warn("Esse filme ja esta na lista");           
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso");
    }

    if(loading){
        return(
            <div className="carregando-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }
    
    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average}</strong>

            <div className="area-botao">

                <button onClick={SalvarFilme}>Salvar</button>
                <button>

                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>

                </button>
            </div>
        </div>
    );
}

export default Filmes;