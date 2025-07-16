import React from 'react'
import { useLocation } from 'react-router-dom'

export default function EachProfile() {

    const location = useLocation();
    const id = location.state?.id;

  return (
    <div>
      {console.log(id)}
    </div>
  )
}
