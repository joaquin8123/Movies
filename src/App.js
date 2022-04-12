import { Button, Tooltip } from 'antd';
import { Layout } from 'antd'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
//Pages
import { Home } from './pages/Home'
import { Error404 }  from './pages/error404'
import { Movie } from './pages/movie/movie';
import { Serie } from './pages/serie/serie';
import { Movies } from './pages/Movies'
import { Series } from './pages/Series'
import Search  from './pages/search'
import {MenuTop } from './components/MenuTop'
import { Footer } from './components/Footer/Footer';

export default function App() {
  const { Header, Content } = Layout
  return (
    <Router>
      <Layout>
        <Header style={{zIndex: 1}}>
          <MenuTop/>
        </Header>
        <Content>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/movie/:id" element={<Movie />} />
            <Route exact path="/serie/:id" element={<Serie />} />
            <Route exact path="/movies" element={<Movies />} />
            <Route exact path="/series" element={<Series />} />
            <Route path="*" element={<Error404/>}/>
          </Routes>
        </Content>
        <Footer/>
      </Layout>
    </Router>
  );
}
