import React from 'react'
import './MenuTop.scss'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/img/logo.svg'

export const MenuTop = () => {
  return (
    <div className='menu-top'>
      <div className='menu-top__logo'>
        <Logo/>
      </div>
      <Menu
        theme="dark"
        mode='horizontal' 
        defaultSelectedKeys={"1"} 
        style={{ lineHeight: "64px", width: 256 }}
      >
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/movies">Peliculas</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/series">Series</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}
