import React from 'react'
import { Registration } from './Registration'
import { useNavigate } from 'react-router'
import {useAnimalContext} from "../../Context/AnimalContext"

export const RegistrationContainer = () => {
    const navigate = useNavigate()
    const user = localStorage.getItem("user")
    const {login} = useAnimalContext()
    return user ? navigate("/") : (
    <Registration login={login}/>
  )
}
