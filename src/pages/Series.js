import React, {useState, useEffect} from 'react'
import {Row, Col, Input} from 'antd'
import config  from '../utils/constanst' 
import { Loading } from '../components/Loading/Loading'
import { MovieCatalog } from '../components/MovieCatalog/MovieCatalog'
import { PaginationMovies } from '../components/Pagination'
import  Search  from '../pages/search/search'
import { ConsoleSqlOutlined } from '@ant-design/icons'

export const Series = () => {
  
  const [serieList, setserieList] = useState([])
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    (async () =>{
      const response = await fetch(`${config.URL_API}/tv/popular?api_key=${config.API_KEY}&language=es-ES&page=${page}`)
      const series = await response.json()
      setserieList(series)
    })()
  }, [page])
  
  const onChangePage = page =>{
    setPage(page)
  }

  const onChangeSearch = e =>{
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    (async () => {
      if(searchValue != ''){
        const response = await fetch(
          `${config.URL_API}/search/tv?api_key=${config.API_KEY}&language=es-ES&query=${searchValue}&page=1`
        );
        const movies = await response.json();
  
        setserieList(movies);
      }else{
        const response = await fetch(`${config.URL_API}/tv/popular?api_key=${config.API_KEY}&language=es-ES&page=${page}`)
        const series = await response.json()
        setserieList(series)
      }
    })();
  }, [searchValue]);
  
  
  return (
    <Row>
      <Col span="24" style={{ textAlign: "center", marginTop: 25 }}>
        <h1 style={{ fontSize: 35, fontWeight: "bold" }}>
          Series
        </h1>
      </Col>
      <Col span={12} className="search" >
          <h1>Buscar</h1>
      </Col>
      <Col span={12} className="search">
          <Input value={searchValue} onChange={onChangeSearch}></Input>
      </Col>
      {serieList.results ? (
        <Row>
          <Col span="24">
            <MovieCatalog movies={serieList} />
          </Col>
          <Col span="24">
            <PaginationMovies
              currentPage={serieList.page}
              totalItems={serieList.total_results}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      ) : (
        <Col span="24">
          <Loading />
        </Col>
      )}
    </Row>
  )
}
