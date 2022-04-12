import React from 'react'
import { Spin } from 'antd'
import './Loading.scss'


export const Loading = () => {
  return (
    <div className='loading'>
      <Spin size='large'/>
    </div>
  )
}
