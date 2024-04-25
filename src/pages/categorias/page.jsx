import React, { useState, useEffect } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Tabla from './Tabla';
import TablaData from './TablaData';

function Page() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]); // Estado para almacenar los datos

  const obtenerCategorias = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/categorias');
      const data = await res.json();
      console.log(data);
      setData(data); // Almacenar los datos en el estado local
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);
  return (

    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            Hola desde Categorias
          </div>
          <div className='container mx-auto'>
            <Tabla data={data} />
          </div>

          <div className='container mx-auto'>
            <TablaData data={data} />
          </div>
        </main>


      </div>
    </div>
  );
}

export default Page;