import React, { useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
function Posts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState(["12", "123"]);
  const obtenerPosts = async () => {
    try {
      /* Aca usamos una ruta relativa, gracias a la variable de entorno */
      const { data } = await clienteAxios(
        "/api/posts?includeUser=true&includeTags=true&includeCategory=true&paginate=true"
      );
      /* Seteamos las categorias */
      setPosts(data.data);
    } catch (error) {
      /* para debugear */
      console.error(error);
    }
  };
  useEffect(() => {
    obtenerPosts();
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
            {/* Iterando las categorias que tienen como atributos, descripcion nombre y estado  */}
            <div className="bg-zinc-700 p-5 rounded">
              <div className="flex justify-between">
                <h1 className="text-3xl text-white font-bold">Posts</h1>{" "}
                <button className="text-sm rounded p-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold">
                  Crear Publicación
                </button>
              </div>
            </div>
            <div className="text-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
              {/* Aca viene el contenido de la tabla */}
              Aquí se renderiza la tabla, la tabla que mostrará los posts, no la
              tabla de tu ex.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Posts;
