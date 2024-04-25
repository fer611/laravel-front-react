import React from 'react'
import DataTable from 'react-data-table-component';
export default function TablaData({ data }) {
    const columns = [
        {
            name: 'nombre', selector: row => row.nombre,
            sortable: true
        },
        { name: 'descripcion', selector: row => row.descripcion, sortable: true },
        { name: 'estado', selector: row => row.estado, sortable: true },]
    const datos = data.map(item => ({
        nombre: item.nombre,
        descripcion: item.descripcion,
        estado: item.estado
    }));


    return (
        <>
            <input type="text" />
            <DataTable
                columns={columns}
                data={datos}
                selectableRows
                pagination
                fixedHeader
                paginationPerPage={2}
                onSelectedRowsChange={data => console.log(data)}
            />
        </>
    )
}
