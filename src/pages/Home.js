import React from 'react'
import { Row, Col } from 'antd'
import useFetch from '../hooks/useFetch'
import { SliderMovies } from '../components/SliderMovies/SliderMovies'
import config  from '../utils/constanst'
import { MovieCatalog } from '../components/MovieCatalog/MovieCatalog'
import { Loading } from '../components/Loading'

export const Home = () => {
  
  const newMovies = useFetch(`${config.URL_API}/movie/now_playing?api_key=${config.API_KEY}&language=es-ES&page=1`)
  let popularMovies = useFetch(`${config.URL_API}/movie/popular?api_key=${config.API_KEY}&language=es-ES&page=1`)
  let TopRatedMovies = useFetch(`${config.URL_API}/movie/top_rated?api_key=${config.API_KEY}&language=es-ES&page=1`)
  let resultsPopulates = {}
  let resultsTopRated = {}
  if(popularMovies.result)  resultsPopulates.results = popularMovies.result.results.slice(0,7)
  if(TopRatedMovies.result) resultsTopRated.results = TopRatedMovies.result.results.slice(0,7)
    
  
  return (
    <>
      <SliderMovies movies={newMovies}></SliderMovies>
      {popularMovies.result && TopRatedMovies.result ? (
        <Row>
          <Col span="24">
            <h1>Peliculas Populares</h1>
            <MovieCatalog movies={resultsPopulates} type="movie"/>
          </Col>
          <Col span="24">
            <h1>Top Mejores Peliculas</h1>
            <MovieCatalog movies={resultsTopRated} type="movie"/>
          </Col>
        </Row>
      ) : (
        <Col span="24">
          <Loading />
        </Col>
      )}
    </>
  )
}
