import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import NewMovies from "./pages/New-movies";
import Popular from "./pages/Popular";
import Search from "./pages/search/Search";
import Movie from "./pages/movie/Movie";
import Error404 from "./pages/error404/Error404";
import MenuTop from "./components/menu/MenuTop";

function App() {

    const { Header, Content } = Layout;

    return (
        <Layout>
            <Router>
                <Header style={{zIndex: 1}}>
                    <MenuTop/>
                </Header>
                <Content>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/new-movies" component={NewMovies} />
                        <Route exact path="/popular" component={Popular} />
                        <Route exact path="/search" component={Search} />
                        <Route exact path="/movie" component={Movie} />
                        <Route exact path="/movie/:id" component={Movie} />
                        <Route exact path="*" component={Error404} />
                    </Switch>
                </Content>
            </Router>
        </Layout>
    );
}

export default App;
