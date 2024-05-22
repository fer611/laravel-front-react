import React from 'react'
import { toast } from 'react-toastify';
import { createContext, useState, useEffect } from 'react'
import clienteAxios from '../config/axios';

const StudentContext = createContext();

const StudentProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    /* Modal */
    const [modal, setModal] = useState(false);
    /* Producto a poner en el modal, al ser un objeto inicia vacio */
    const [producto, setProducto] = useState({});
    /* Definiendo el array para almacenar los pedidos */
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState([0])

    /* Cada que pedido cambie esta funcion se ejecuta */
    useEffect(() => {
        /* Calculamos con la funcion .reduce */
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad)
            + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    /* Para obtener las categorias de la API */
    const obtenerCategorias = async () => {
        
        try {
            /* Aca usamos una ruta relativa, gracias a la variable de entorno */
            const { data } = await clienteAxios(`${import.meta.env.VITE_API_URL}/api/categories`)
            /* Seteamos las categorias */
            setCategorias(data.data)
            /* seteamos la categoria inicial */
            setCategoriaActual(data.data[0])
        } catch (error) {
            /* para debugear */
            console.error(error)
        }
    }

    useEffect(() => {
        obtenerCategorias();
    }, [])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }

    /* Evento para mostrar y quitar el modal */
    const handleClickModal = () => {
        setModal(!modal)
    }

    /* Evento para asignar el producto del componente al modal */
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleAgregarPedido = ({ categoria_id, ...producto }) => {
        /* El some comprueba si ya esta en el pedido */
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            /* map retorna un array nuevo que lo estamos modificando , no modifica el original, sino el nuevo */
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.
                id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado Correctamente')
        } else {
            /* Tomar una copia del array pedido y agregamos el nuevo producto */
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }
    }
    const handleEditarCantidad = id => {
        /* Obteniendo el array del producto a editar */
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        /* Actualizamos el producto */
        setProducto(productoActualizar)
        setModal(!modal);
    }

    const HandleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminado del pedido')
    }

    const handleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN');

        try {
            const { data } = await clienteAxios.post('/api/pedidos', {
                /* Pasando la variable total */
                total,
                /* Renombrando el array de productos 'pedido' para pasarlo al backend */
                /* Con .map retornamos un nuevo arreglo solo con los atributos id del producto y su cantidad
                para el pedido, para optimizarlo */
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                }),
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            /* message es lo que devolvemos del backend */
            toast.success(data.message);
            setTimeout(() => {
                /* Despues de 1 segundo vaciamos el array de los productos */
                setPedido([])
            }, 1000);

            /* Cerrar la sesion del usuario, una vez realizado el pedido */
            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN');
                logout();
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    /* para completar un pedido */
    const handleClickCompletarPedido = async id => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            /* con put, en el backend automaticamente llamara a la funcion update */
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        } catch (error) {
            /* para debugear */
            console.log(error)
        }
    }

    /* Para inactivar un producto, marcar como agotado */
    const handleClickProductoAgotado = async id => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            /* con put, en el backend automaticamente llamara a la funcion update */
            await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        } catch (error) {
            /* para debugear */
            console.log(error)
        }
    }

    return (
        <StudentContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                HandleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}
        >{children}</StudentContext.Provider>
    );
}

export {
    StudentProvider
}
export default StudentContext