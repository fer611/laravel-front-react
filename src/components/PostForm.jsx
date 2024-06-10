import React, { useState, useEffect } from "react";
import axios from "axios";

const loadScript = (url) =>
  new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    user_id: "",
    category_id: "",
    tags: [],
    image: null, // Añadido para manejar la imagen
  });

  const [errors, setErrors] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0],
    }));
  };

  const handleTagChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagAdd = () => {
    if (tagInput.trim() !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        tags: [...prevFormData.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleTagRemove = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tags: prevFormData.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = CKEDITOR.instances.content.getData();
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: content,
    }));

    // Crear un FormData para enviar la imagen junto con otros datos
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("content", content);
    data.append("user_id", formData.user_id);
    data.append("category_id", formData.category_id);
    data.append("image", formData.image);
    formData.tags.forEach((tag, index) => {
      data.append(`tags[${index}]`, tag);
    });

    try {
      const backendUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${backendUrl}/api/posts`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Formulario enviado exitosamente:", response.data);
      setSuccessMessage(response.data.message);
      setErrors(null);
    } catch (error) {
      if (error.response) {
        console.error("Error en la respuesta del servidor:", error.response.data);
        setErrors(error.response.data.errors);
        setSuccessMessage(null);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
      } else {
        console.error("Error al configurar la petición:", error.message);
      }
    }
  };

  useEffect(() => {
    loadScript("https://cdn.ckeditor.com/4.16.0/standard/ckeditor.js").then(() => {
      CKEDITOR.replace("content");
    });
  }, []);

  return (
    <div>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              {errors && (
                <div className="mb-4">
                  {Object.keys(errors).map((key) => (
                    <div key={key} className="text-red-500">
                      {errors[key].map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-4 text-green-800 bg-green-200 border border-green-300 rounded">
                  <p>{successMessage}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label className="text-xl text-gray-600">
                    Título <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xl text-gray-600">Descripción</label>
                  <br />
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="(Opcional)"
                  />
                </div>

                <div className="mb-8">
                  <label className="text-xl text-gray-600">
                    Contenido <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <textarea
                    name="content"
                    id="content"
                    className="border-2 border-gray-500 w-full p-2"
                    value={formData.content}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="text-xl text-gray-600">
                    Usuario <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="user_id"
                    id="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xl text-gray-600">
                    Categoría <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="category_id"
                    id="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xl text-gray-600">
                    Imagen <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    type="file"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xl text-gray-600">
                    Etiquetas <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="tags"
                    id="tags"
                    value={tagInput}
                    onChange={handleTagChange}
                    placeholder="Ingrese etiqueta y presione Añadir"
                  />
                  <button
                    type="button"
                    onClick={handleTagAdd}
                    className="ml-2 p-2 bg-blue-500 text-white hover:bg-blue-400"
                  >
                    Añadir
                  </button>
                </div>

                <div className="mb-4">
                  {formData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(index)}
                        className="ml-2 text-red-500"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex p-1">
                  <select
                    className="border-2 border-gray-300 border-r p-2"
                    name="action"
                  >
                    <option>Guardar y Publicar</option>
                    <option>Guardar Borrador</option>
                  </select>
                  <button
                    role="submit"
                    className="p-3 bg-blue-500 text-white hover:bg-blue-400"
                    required
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
