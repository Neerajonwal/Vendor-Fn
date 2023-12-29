import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home/Home'
import Login from '../components/Auth/Login'
import BettingGame from '../components/Game/Index'
import Signup from '../components/Auth/Signup'
import GameList from '../components/Game/GameList'

export default function AllRoutes() {
  return (
   <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path ='/signup' element={<Signup/>} />
        <Route path='/game' element={<BettingGame />} />

        <Route path='/game-list' element={<GameList />} />
        
    </Routes>
   </>
  )
}
