import React from 'react';
import './Loading.scss';
import { Spin } from 'antd';

const Loading = () => {
    return (
        <div className="loading">
            <Spin size="large" />
        </div>
    );
};

export default Loading;