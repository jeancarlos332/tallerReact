import React from 'react'
import { nanoid } from 'nanoid'
import { firebase } from '../firebase'

const Main = () => {
    const [deporte, setDeporte] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')
    const [tipo, setTipo] = React.useState('')
    const [numero_jugadores, setNumeroJugadores] = React.useState('')
    const [cancha, setCancha] = React.useState('')
    const [tiempo_por_partido, setTiempoPorPartido] = React.useState([])
    const [color_uniforme, setColorUniforme] = React.useState([])
    const [listaDeportes, setListaDeportes] = React.useState([])
    const [id, setId] = React.useState('')
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const db = firebase.firestore()
                const data = await db.collection('deportes').get()
                const arrayData = data.docs.map(item => (
                    {
                        id: item.id, ...item.data()
                    }
                ))
                setListaDeportes(arrayData)

            } catch (error) {
                console.log(error)
            }
        }

        obtenerDatos();
    })


    const guardarDeportes = async (e) => {
        e.preventDefault()

        if (!deporte.trim()) {
            setError('Digite el deporte')
            return
        }
        if (!descripcion.trim()) {
            setError('Digite la descripción')
            return
        }
        if (!tipo.trim()) {
            setError('Digite el tipo')
            return
        }
        if (!numero_jugadores.trim()) {
            setError('Digite el número de jugadores')
            return
        }
        if (!cancha.trim()) {
            setError('Digite la cancha')
            return
        }
        if (!tiempo_por_partido.trim()) {
            setError('Digite el tiempo por partido')
            return
        }
        if (!color_uniforme.trim()) {
            setError('Digite el color del uniforme')
            return
        }

        try {
            const db = firebase.firestore()
            const nuevoDeporte = {
                nombre: deporte,
                descripcion: descripcion,
                tipo: tipo,
                numero_jugadores: numero_jugadores,
                cancha: cancha,
                tiempo_por_partido: tiempo_por_partido,
                color_uniforme: color_uniforme
            }

            await db.collection('deportes').add(nuevoDeporte)

            setListaDeportes([
                ...listaDeportes,
                {
                    id: nanoid(),
                    nombre: deporte,
                    descripcion: descripcion,
                    tipo: tipo,
                    numero_jugadores: numero_jugadores,
                    cancha: cancha,
                    tiempo_por_partido: tiempo_por_partido,
                    color_uniforme: color_uniforme
                }
            ])

            e.target.reset()
            setDeporte('')
            setDescripcion('')
            setTipo('')
            setNumeroJugadores('')
            setCancha('')
            setTiempoPorPartido('')
            setColorUniforme('')
            setError(null)
        } catch (error) {
            console.log(error)
        }

    }

    const editar = item => {
        setDeporte(item.nombre)
        setDescripcion(item.descripcion)
        setTipo(item.tipo)
        setNumeroJugadores(item.numero_jugadores)
        setCancha(item.cancha)
        setTiempoPorPartido(item.tiempo_por_partido)
        setColorUniforme(item.color_uniforme)
        setModoEdicion(true)
        setId(item.id)
    }
    const editarDeportes = async e => {
        e.preventDefault()

        if (!deporte.trim()) {
            setError('Digite el deporte')
            return
        }
        if (!descripcion.trim()) {
            setError('Digite la descripción')
            return
        }
        if (!tipo.trim()) {
            setError('Digite el tipo')
            return
        }
        if (!numero_jugadores.trim()) {
            setError('Digite el número de jugadores')
            return
        }
        if (!cancha.trim()) {
            setError('Digite la cancha')
            return
        }
        if (!tiempo_por_partido.trim()) {
            setError('Digite el tiempo por partido')
            return
        }
        if (!color_uniforme.trim()) {
            setError('Digite el color del uniforme')
            return
        }

        try {
            const db = firebase.firestore()
            await db.collection('deportes').doc(id).update({
                nombre: deporte,
                descripcion: descripcion,
                tipo: tipo,
                numero_jugadores: numero_jugadores,
                cancha: cancha,
                tiempo_por_partido: tiempo_por_partido,
                color_uniforme: color_uniforme
            })
            const arrayEditado = listaDeportes.map(
                item => item.id === id ? {
                    id: id, nombre: deporte, descripcion: descripcion, tipo: tipo,
                    numero_jugadores: numero_jugadores,
                    cancha: cancha,
                    tiempo_por_partido: tiempo_por_partido,
                    color_uniforme: color_uniforme
                } : item
            )

            setListaDeportes(arrayEditado)
            setDeporte('')
            setDescripcion('')
            setTipo('')
            setNumeroJugadores('')
            setCancha('')
            setTiempoPorPartido('')
            setColorUniforme('')
            setModoEdicion(false)
            setError(null)

        } catch (error) {
            console.log(error)
        }

    }

    const eliminar = async id => {
        try {
            const db = firebase.firestore()
            await db.collection('deportes').doc(id).delete()
            const aux = listaDeportes.filter(item => item.id !== id)
            setListaDeportes(aux)
        } catch (error) {
            console.log(error)
        }


    }

    const cancelar = () => {
        setModoEdicion(false)
        setDeporte('')
        setDescripcion('')
        setTipo('')
        setNumeroJugadores('')
        setCancha('')
        setTiempoPorPartido('')
        setColorUniforme('')
        setId('')
        setError(null)
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>CRUD DEPORTES</h1>
            <hr />
            <div className='row'>
                <div className='col-8'>
                    <h4 className='text-center'>Listado de Deportes</h4>
                    <ul className='list-group'>
                        {
                            listaDeportes.map(item => (
                                <li className='list-group-item' key={item.id}>
                                    <span className='lead'>{item.nombre}-{item.descripcion}-{item.descripcion}-{item.tipo}-{item.numero_jugadores}-{item.cancha}-{item.tiempo_por_partido}-{item.color_uniforme}</span>
                                    <button className='btn btn-danger btn-sm float-end mx-2' onClick={() => eliminar(item.id)}>
                                        Eliminar
                                    </button>
                                    <button className='btn btn-warning btn-sm float-end' onClick={() => editar(item)}>
                                        Editar
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='col-4'>
                    <h4 className='text-center'>
                        {
                            modoEdicion ? 'Editar Deportes' : 'Agregar Deportes'
                        }
                    </h4>
                    <form onSubmit={modoEdicion ? editarDeportes : guardarDeportes}>
                        {
                            error ? <span className='text-danger'>{error}</span> : null
                        }
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese deporte'
                            onChange={(e) => setDeporte(e.target.value)}
                            value={deporte}
                        />
                        <input
                            className='form-control mb-2'
                            placeholder='Ingrese descripción'
                            type="text"
                            onChange={(e) => setDescripcion(e.target.value)}
                            value={descripcion}
                        />
                        <input
                            className='form-control mb-2'
                            placeholder='Ingrese tipo'
                            type="text"
                            onChange={(e) => setTipo(e.target.value)}
                            value={tipo}
                        />
                        <input
                            className='form-control mb-2'
                            placeholder='Ingrese número de jugadores'
                            type="text"
                            onChange={(e) => setNumeroJugadores(e.target.value)}
                            value={numero_jugadores}
                        />
                        <input
                            className='form-control mb-2'
                            placeholder='Ingrese cancha'
                            type="text"
                            onChange={(e) => setCancha(e.target.value)}
                            value={cancha}
                        />
                        <input
                            className='form-control mb-2'
                            placeholder='Ingrese tiempo por partido'
                            type="text"
                            onChange={(e) => setTiempoPorPartido(e.target.value)}
                            value={tiempo_por_partido}
                        />
                        <input
                            className='form-control mb-2'
                            placeholder='Ingrese color uniforme'
                            type="text"
                            onChange={(e) => setColorUniforme(e.target.value)}
                            value={color_uniforme}
                        />

                        {
                            modoEdicion ?
                                (
                                    <>
                                        <button
                                            className='btn btn-warning btn-block'
                                            type='submit'
                                        >Editar</button>
                                        <button
                                            className='btn btn-dark btn-block mx-2'
                                            onClick={() => cancelar()}
                                        >Cancelar</button>
                                    </>
                                )
                                :

                                <button
                                    className='btn btn-primary btn-block'
                                    type='submit'
                                >Agregar</button>

                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Main