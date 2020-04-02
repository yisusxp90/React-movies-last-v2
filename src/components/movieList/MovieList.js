import React from 'react';
import './MovieList.scss';
import { List, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import Loading from "../loading/Loading";
import { RightCircleOutlined } from '@ant-design/icons';

const MovieList = (props) => {

    const { movies, title } = props;

    if(movies.loading || !movies.result) {
        return <Loading/>
    }

    return (
        <List
            className="movie-List"
            size="default"
            header={<h2>{title}</h2>}
            bordered
            dataSource={movies.result.results}
            renderItem={movie => <RenderMovie movie={movie} />}
        >

        </List>
    );
};

export default MovieList;

const RenderMovie = (props) => {

    const { movie: {id, title, poster_path} } = props;
    const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;

    return (
        <List.Item className="movie-List__item">
            <List.Item.Meta
                avatar={<Avatar src={posterPath}/>}
                title={<Link to={`/movie/${id}`}>{title}</Link>}
            />
            <Link to={`/movie/${id}`}>
                <Button type="primary" shape="circle" icon={<RightCircleOutlined />}/>
            </Link>
        </List.Item>
    );
};