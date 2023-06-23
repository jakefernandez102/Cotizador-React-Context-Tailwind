import { Fragment } from 'react';

import { MARCAS, PLANES, YEARS } from '../constants';
import useCotizador from '../hooks/useCotizador';
import { Error } from './Error';

export const Formulario = () => {
  const { handleChangeDatos, datos, error, setError, cotizarSeguro } =
    useCotizador();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(datos).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError(false);

    cotizarSeguro();
  };

  return (
    <>
      {error && <Error />}

      <form action="">
        <div className="my-5">
          <label
            htmlFor=""
            className="block mb-3 font-bold text-gray-400 uppercase"
          >
            Marca:
          </label>
          <select
            default="1"
            name="marca"
            className="w-full p-3 bg-white border border-gray-200"
            onChange={(e) => handleChangeDatos(e)}
            value={datos.marca}
          >
            <option value="0">-- Seleccione Marca --</option>
            {MARCAS.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="my-5">
          <label
            htmlFor=""
            className="block mb-3 font-bold text-gray-400 uppercase"
          >
            Año:
          </label>
          <select
            default="1"
            name="year"
            className="w-full p-3 bg-white border border-gray-200"
            onChange={(e) => handleChangeDatos(e)}
            value={datos.year}
          >
            <option value="0">-- Seleccione Año --</option>
            {YEARS.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="my-5">
          <label
            htmlFor=""
            className="block mb-3 font-bold text-gray-400 uppercase"
          >
            Elige un Plan:
          </label>
          <div className="flex gap-3 items-center">
            {PLANES.map((plan) => (
              <Fragment key={plan.id}>
                <label htmlFor="plan">{plan.nombre}</label>
                <input
                  type="radio"
                  name="plan"
                  value={plan.id}
                  onChange={(e) => handleChangeDatos(e)}
                />
              </Fragment>
            ))}
          </div>
        </div>
        <input
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white cursor-pointer p-3 uppercase font-bold"
          value={"Cotizar"}
          onClick={(e) => handleSubmit(e)}
        />
      </form>
    </>
  );
};
