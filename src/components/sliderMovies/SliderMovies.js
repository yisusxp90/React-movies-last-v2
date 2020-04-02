import React from 'react';
import './SliderMovies.scss';
import { Carousel, Button } from 'antd';
import { Link } from 'react-router-dom';
import Loading from "../loading/Loading";

const SliderMovies = (props) => {

    const { movies } = props;

    if(movies.loading || !movies.result) {
        return <Loading/>;
    }

    const { results } = movies.result;
    return (
        <Carousel autoplay className="slider-movies">
            {results.map(movie => (
                <Movie
                    key={movie.id}
                    movie={movie}
                />
            ))}
        </Carousel>
    );
};

export default SliderMovies;

const Movie = (props) => {

    const {movie: {id, backdrop_path, title, overview}} = props;

    const backDropPath = `https://image.tmdb.org/t/p/w500/${backdrop_path}`;

    return (
        <div className="slider-movies__movie" style={{backgroundImage: `url('${backDropPath}')`}}>
            <div className="slider-movies__movie-info">
                <div>
                    <h2>{title}</h2>
                    <p>{overview}</p>
                    <Link to={`/movie/${id}`}>
                        <Button type="primary">Ver mas...</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};







