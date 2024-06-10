import useSWR from "swr";
import React, { useState } from "react";
import useStudent from "../hooks/useStudent";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import clienteAxios from "../config/axios";


function Dashboard() {
  const fetcher = () => clienteAxios('/api/tags').then(data =>  data.data.data)
  const {data: tags, error, isLoading} = useSWR('/api/tags',fetcher,{
    refreshInterval : 1000
  })

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { categorias } = useStudent();
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Contenido, iterando Tags*/}
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="bg-zinc-700 p-5 rounded">
              <div className="flex justify-between">
                <h1 className="text-3xl text-white font-bold">Tags</h1>
                <button className="text-sm rounded p-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold">
                  Crear Publicación
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
              {tags?.map((tag) => (
                <div key={tag.id} className="bg-white rounded-lg shadow-md p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{tag.name}</h2>
                  <p className="text-gray-700 mt-2">{tag.description ?? "Sin Descripción"}</p>
                  <p className="text-gray-700 mt-2">{tag.status}</p>
                  <div className="flex justify-end mt-4">
                    <button className="text-sm rounded p-2 bg-red-500 hover:bg-red-700 text-white font-bold">
                      Eliminar
                    </button>
                    <button className="text-sm rounded p-2 bg-indigo-500 hover:bg-indigo-700 ml-2 font-bold text-white">
                      Editar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
