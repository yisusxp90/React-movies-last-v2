import React from 'react';
import './Error404.scss';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div className="error-404">
            <h1>Error 404</h1>
            <h2>Pagina no Encontrada</h2>
            <Link to="/">
                <h3>Volver al Inicio</h3>
            </Link>
        </div>
    );
};

export default Error404;