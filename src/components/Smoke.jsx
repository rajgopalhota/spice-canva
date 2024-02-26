import React from 'react'
import smoke from '../assets/smoke.gif'

export default function Smoke() {
  return (
    <div className='smokeBox'>
      <img src={smoke} className='smokeEffect'/>
    </div>
  )
}
