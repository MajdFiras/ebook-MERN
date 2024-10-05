import React from 'react'
import { useParams } from 'react-router-dom';

const Payment = () => {
  const {id} = useParams()
  return (
    <>
     {id ? <h1>You Buy a book with id {id}</h1> : <h1>You buy from the localstorage</h1>}
    </>
  )
}

export default Payment