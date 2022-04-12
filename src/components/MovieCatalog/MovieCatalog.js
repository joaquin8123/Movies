import React from 'react'
import {Link} from 'react-router-dom'
import { Col, Card, Icon, Row } from 'antd'
import './MovieCatalog.scss'
import {EyeOutlined } from '@ant-design/icons'


export const MovieCatalog = (props) => {
  const { movies: { results }} = props;
  return(
    <Row>
      {results.map(movie => {
        if(!movie.poster_path) return
        return (
        <Col key={movie.id} className="movie-catalog">
          <MovieCard movie={movie} type={props.type} />
        </Col>
        )}
      )}
    </Row>
  )
  
}

function MovieCard(props) {
  const {
    movie: { id, title, poster_path, type}
  } = props;
  const { Meta } = Card;
  const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;
  let link
  props.type == 'movie' ? link = "/movie": link = "/serie" 
  return (
    <Link to={`${link}/${id}`}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={title} src={posterPath} />}
        actions={[<EyeOutlined/>]}
      >
        <Meta title={title} />
      </Card>
    </Link>
  );
}