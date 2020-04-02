import React, {Fragment} from 'react';
import useFetch from "../hooks/useFetch";
import SliderMovies from "../components/sliderMovies/SliderMovies";
import {API_KEY, URL_API} from "../utils/constants";
import MovieList from "../components/movieList/MovieList";
import { Row, Col } from 'antd';
import Footer from "../components/footer/Footer";

const Home = () => {

    const newMovies = useFetch(`${URL_API}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`);

    const popularMovies = useFetch(`${URL_API}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`);

    const topRatedMovies = useFetch(`${URL_API}/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=1`);

    return (
        <Fragment>
            <SliderMovies
                movies={newMovies}
            />
            <Row>
                <Col span={12}>
                    <MovieList
                        movies={popularMovies}
                        title="Peliculas Populares"
                    />
                </Col>

                <Col span={12}>
                    <MovieList
                        movies={topRatedMovies}
                        title="Top Mejores Peliculas Puntuadas"
                    />
                </Col>
            </Row>

            <Footer/>

        </Fragment>
    );
};

export default Home;