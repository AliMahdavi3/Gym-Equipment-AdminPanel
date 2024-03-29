import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Articles from './articles/Articles'
import Product from './products/Product'
import BestSelling from './bestSelling/BestSelling'
import EquippedGym from './equippedGym/EquippedGym'
import Dashboard from './dashboard/Dashboard'
import Question from './questions/Question'
import Comments from './comments/Comments'

const Content = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/articles' element={<Articles/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/bestSelling' element={<BestSelling/>}/>
      <Route path='/equippedGym' element={<EquippedGym/>}/>
      <Route path='/question' element={<Question/>}/>
      <Route path='/comments' element={<Comments/>}/>
    </Routes>
  )
}

export default Content
