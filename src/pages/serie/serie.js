import React, {useState,useEffect} from 'react'
import {Row, Col, Button } from 'antd'
import { useParams, userParams } from 'react-router-dom'
import moment from 'moment'
import useFetch from '../../hooks/useFetch'
import config  from '../../utils/constanst' 
import { Loading } from '../../components/Loading'
import { ModalVideo } from '../../components/ModalVideo/ModalVideo'
import "./serie.scss"
import { ConsoleSqlOutlined, PlayCircleOutlined  } from '@ant-design/icons';


export const Serie = () => {
  const {id } = useParams()
  const serieInfo = useFetch(`${config.URL_API}/tv/${id}?api_key=${config.API_KEY}&language=es-ES&page=1`)
  if(serieInfo.loading || !serieInfo.result) return <Loading/>

  return <RenderSerie serieInfo={serieInfo.result}/>
}

function RenderSerie(props) {
  const {
    serieInfo: { backdrop_path, poster_path }
  } = props;
  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div
      className="movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="movie__dark" />
      <Row>
        <Col span={8} offset={3} className="movie__poster">
          <PosterSerie image={poster_path} />
        </Col>
        <Col span={10} className="movie__info">
          <SerieInfo serieInfo={props.serieInfo} />
        </Col>
      </Row>
    </div>
  );
}

function PosterSerie(props) {
  const { image } = props;
  const posterPath = `https://image.tmdb.org/t/p/original${image}`;

  return <div style={{ backgroundImage: `url('${posterPath}')` }} />;
}

function SerieInfo(props){
  const { serieInfo: {id, original_name, release_date, overview, genres}} = props
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const videoSerie = useFetch(`${config.URL_API}/tv/${id}/videos?api_key=${config.API_KEY}&language=es-ES&page=1`)
  const openModal = () => setIsVisibleModal(true)
  const closeModal = () => setIsVisibleModal(false)

  const renderVideo = () => {
    if (videoSerie.result) {
      if (videoSerie.result.results.length > 0) {
        return (
          <>
            <Button icon={<PlayCircleOutlined/>} onClick={openModal}>
              Ver trailer
            </Button>
            <ModalVideo
              videoKey={videoSerie.result.results[0].key}
              videoPlatform={videoSerie.result.results[0].site}
              isOpen={isVisibleModal}
              close={closeModal}
            />
          </>
        );
      }
    }
  }
  
  return (
    <>
      <div className='movie__info-header'>
        <h1>
          {original_name}
        </h1>
        {renderVideo()}
      </div>
      <div className='movie__info-content'>
          <h3>General</h3>
          <p>{overview}</p>
          <h3>Generos</h3>
          <ul>
            {genres.map(gender =>(
              <li key={gender.id}>{gender.name}</li>
            ))}
          </ul>
      </div>
    </>
  )
}