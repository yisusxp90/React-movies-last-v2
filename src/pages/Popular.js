import React, {useEffect, useState} from 'react';
import { Row, Col } from 'antd';
import { URL_API, API_KEY } from "../utils/constants";
import Footer from "../components/footer/Footer";
import Loading from "../components/loading/Loading";
import MovieCatalog from "../components/movieCatalog/MovieCatalog";
import PaginationComponent from "../components/pagination/PaginationComponent";

const Popular = () => {

    const [movieList, setMovieList] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        (async () => {
            const resp = await fetch(`${URL_API}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`);
            const movies = await resp.json();
            setMovieList(movies);
        })();
    }, [page]);

    const onChangePage = (page) => {
        setPage(page);
    };

    return (
        <Row>
            <Col span={24} style={{textAlign: "center", marginTop: 25,}}>
                <h1 style={{ fontSize: 35, fontWeight: "bold"}}>Peliculas Populares</h1>
            </Col>

            {movieList.results ? (
                    <Row>

                        <Col span={24} style={{display: 'contents'}}>
                            <MovieCatalog
                                movies={movieList}
                            />
                        </Col>

                        <Col span={24}>
                            <PaginationComponent
                                currentPage={movieList.page}
                                totalItems={movieList.total_results}
                                onChangePage={onChangePage}
                            />
                        </Col>

                    </Row>
                ) :
                <Col span={24}>
                    <Loading/>
                </Col>
            }



            <Col span={24}>
                <Footer/>
            </Col>
        </Row>
    );
};

export default Popular;