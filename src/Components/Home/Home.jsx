import React, { useEffect, useState } from 'react'
import "./Home.scss";
import axios from "axios";
import { Link } from 'react-router-dom';

const apiKey = "8e7bb9acec249c100fa651278e9d0c14";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";
// https://api.themoviedb.org/3/genre/movie/list?api_key=8e7bb9acec249c100fa651278e9d0c14&language=hindi&page=1\
// https://api.themoviedb.org/3/discover/movie?api_key=8e7bb9acec249c100fa651278e9d0c14&with_genres=12&include_adult=true&language=en-US&page=1&region=IN
// https://api.themoviedb.org/3/genre/movie/list?api_key=8e7bb9acec249c100fa651278e9d0c14&language=hindi&page=1\


const Card = ({img}) => (
    <img className="card" src={img} alt="Cover" />
)

const Row = ({title,arr=[]}) => (
    <div className='row'>
      <h2>{title}</h2>
      <div>
        {
          arr.map((item,index) => (
            <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
          ))
        }
      </div>
    </div>
)

const Home = () => {
  const [upcomingMovies,setUpcomingMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
      const fetchUpcoming = async () =>{
        const {data:{ results }} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
          setUpcomingMovies(results);
      };
      const fetchNowPlaying = async () =>{
        const {data:{ results }} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
          setNowPlayingMovies(results);
      };
      const fetchPopular = async () =>{
        const {data:{ results }} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
          setPopularMovies(results);
      };
      const fetchTopRated = async () =>{
        const {data:{ results }} = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
          setTopRatedMovies(results);
      };
      const getAllGenre = async () =>{
        const {data:{ genres }} = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
          setGenre(genres);
          console.log(genres);
      };
      fetchUpcoming();
      fetchNowPlaying();
      fetchPopular();
      fetchTopRated();
      getAllGenre();
  }, [])
  

  return (
    <section className="home">
      <div className="banner" style={{
        backgroundImage: popularMovies[0]
        ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
        : "rgb(16, 16, 16)",
      }}>
        
      </div>
      <Row title={"Upcoming"} arr={upcomingMovies}/>
      <Row title={"Now Playing"} arr ={nowPlayingMovies}/>
      <Row title={"Popular"} arr={popularMovies}/>
      <Row title={"Top Rated"} arr={topRatedMovies}/>

      <div className="genreBox">
        {
          genre.map((item) => (
            <Link key={item.id} to={`/genre/${item.id}`}>
              {item.name}
            </Link>
          ))
        }
      </div>
    </section>
  )
}

export default Home;