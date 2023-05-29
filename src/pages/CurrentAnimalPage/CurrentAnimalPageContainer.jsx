import React, { useEffect, useState } from 'react'
import {CurrentAnimalPage} from './CurrentAnimalPage'
import { useAnimalContext } from '../../Context/AnimalContext'
import { useSearchParams } from 'react-router-dom'

export const CurrentAnimalPageContainer = () => {
  const [animal, setAnimal] = useState()
  const {animalsData} = useAnimalContext();
  const [searchParams, setSearchParams] = useSearchParams({ category: 'all' })
  
  useEffect(()=>{
    console.log(searchParams.get("id"))
  }, [searchParams])

  return (
    <CurrentAnimalPage animal={animal}/>
  )
}
