import React , {useState, useEffect}from 'react'
import './search.scss'
import {Row, Col, Input} from 'antd'
import queryString from 'query-string'
import { MovieCatalog } from '../../components/MovieCatalog/MovieCatalog'
import config from '../../utils/constanst'
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function Search(props){
  const { history} = props
  let location = useLocation()
  const [movieList, setMovieList] = useState([])
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${config.URL_API}/search/movie?api_key=${config.API_KEY}&language=es-ES&query=${searchValue}&page=1`
      );
      const movies = await response.json();

      setMovieList(movies);
    })();
  }, [searchValue]);

  const onChangeSearch = e =>{
    setSearchValue(e.target.value)
  }

  return (
    <Row>
      <Col span={12} className="search" >
          <h1>Buscar</h1>
      </Col>
      <Col span={12} className="search">
          <Input value={searchValue} onChange={onChangeSearch}></Input>
      </Col>
      {movieList.results && (
        <Col>
          <MovieCatalog movies={movieList} />
        </Col>
      )}
    </Row>
  )
}


function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
      {...props}
      router={{ location, navigate, params }}
      />
      );
    }
    
    return ComponentWithRouterProp;
}

  export default withRouter(Search);