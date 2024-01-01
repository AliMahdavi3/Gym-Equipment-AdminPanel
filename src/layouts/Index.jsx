import React from 'react'
import Header from './header/Header'
import SideBar from './sidebar/SideBar'
import Content from '../pages/Content'

const Index = () => {
  return (
    <main>
      <Header />
      <SideBar />
      <section>
        <Content />
      </section>
    </main>
  )
}

export default Index
