import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'antd';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { URL_API, API_KEY } from "../../utils/constants";
import './Search.scss';
import MovieCatalog from "../../components/movieCatalog/MovieCatalog";
import Footer from "../../components/footer/Footer";

const Search = (props) => {

    const { location, history } = props;
    const [movieList, setMovieList] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {

        (async () => {
            const searchValue = queryString.parseUrl(location.search);
            const { s } = searchValue.query;
            if(s){
                const resp = await fetch(`${URL_API}/search/movie?api_key=${API_KEY}&language=es-ES&query=${s}&page=1`);
                const movies = await resp.json();
                setMovieList(movies);
                setSearchValue(s);
            }
        })();


    }, [location.search]);

    const handleChangeSearch = (e) => {
        const urlParams = queryString.parse(location.search);
        urlParams.s = e.target.value;
        history.push(`?${queryString.stringify(urlParams)}`);
        setSearchValue(e.target.value);
    };

    return (
        <Row>
            <Col span={12} offset={6} className="search">
                <h1>Busca tu pelicula</h1>
                <Input value={searchValue} onChange={handleChangeSearch}/>
            </Col>

            {
                movieList.results &&
                    (
                        <Row>
                            <Col span={24} style={{display: 'contents'}}>
                                <MovieCatalog movies={movieList}/>
                            </Col>
                        </Row>
                    )
            }

            <Col span={24}>
                <Footer/>
            </Col>
        </Row>
    );
};

export default withRouter(Search);