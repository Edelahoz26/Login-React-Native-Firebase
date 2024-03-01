import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';


//este hooks accede a nuestro contexto, extraer el value y devolverlo
export default () => useContext(AuthContext)