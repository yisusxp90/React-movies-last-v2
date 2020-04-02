import React, {Fragment, useState} from 'react';
import './Movie.scss';
import {Row, Col, Button, Avatar} from 'antd';
import {Link, useParams} from 'react-router-dom';
import moment from 'moment';
import useFetch from "../../hooks/useFetch";
import {API_KEY, URL_API} from "../../utils/constants";
import Loading from "../../components/loading/Loading";
import {List} from "antd/lib/list";
import ModalVideo from "../../components/modalVideo/ModalVideo";
import { StepForwardOutlined } from '@ant-design/icons';

const Movie = () => {

    const { id } = useParams();

    const movie = useFetch(`${URL_API}/movie/${id}?api_key=${API_KEY}&language=es-ES&page=1`);

    if(movie.loading || !movie.result) {
        return <Loading/>;
    }

    return (
        <RenderMovie movie={movie.result}/>
    );
};

export default Movie;

const RenderMovie = (props) => {

    const { movie: {title, backdrop_path, poster_path}} = props;

    const backDropPath = `https://image.tmdb.org/t/p/original/${backdrop_path}`;

    return (
        <div className="movie" style={{ backgroundImage: `url('${backDropPath}')` }}>

            <div className="movie__dark">
            </div>

            <Row>
                <Col span={8} offset={3} className="movie__poster">
                    <PosterMovie
                        image={poster_path}
                    />
                </Col>

                <Col span={10} className="movie__info">
                    <MovieInfo
                        movieInfo={props.movie}
                    />
                </Col>
            </Row>
        </div>
    );
};

const PosterMovie = (props) => {

    const { image } = props;
    const posterPath = `https://image.tmdb.org/t/p/original/${image}`;

    return (
        <div style={{backgroundImage: `url('${posterPath}')`}}>
        </div>
    );
};

const MovieInfo = (props) => {

    const { movieInfo: { id, title, release_date, overview, genres } } = props;

    const [isVisibleModal, setIsVisbleModal] = useState(false);

    const videoMovie = useFetch(`${URL_API}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);

    const openModal = () => {
        setIsVisbleModal(true);
    };

    const closeModal = () => {
        setIsVisbleModal(false);
    };

    // ver si la pelicula tiene video
    const renderVideo = () => {
        if(videoMovie.result){
            if(videoMovie.result.results.length > 0) {
                return (
                    <Fragment>
                        <Button type="primary" shape="circle" icon={<StepForwardOutlined />} onClick={openModal}>Ver trailer</Button>

                        <ModalVideo
                            videoKey={videoMovie.result.results[0].key}
                            videoPlatform={videoMovie.result.results[0].site}
                            isOpen={isVisibleModal}
                            close={closeModal}
                        />
                    </Fragment>
                );
            }
        }
    };

    return (
        <Fragment>
            <div className="movie__info-header">
                <h1>{title} <span>{moment(release_date, 'YYYY-MM-DD').format('YYYY')}</span></h1>

                {renderVideo()}

            </div>

            <div className="movie__info-content">
                <h3>General</h3>
                <p>{overview}</p>

                <h3>Generos</h3>
                <ul>
                    {genres.map(gender => (
                        <li key={gender.id}>{gender.name}</li>
                    ))}
                </ul>
            </div>
        </Fragment>
    );
};