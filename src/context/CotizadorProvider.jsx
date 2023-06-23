/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

import { calcularMarca, calcularPlan, formatearDinero, obtenerDiferenciaYear } from '../helpers';

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });

  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(0);
  const [cargando, setCargando] = useState(false);

  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const cotizarSeguro = () => {
    //Base
    let resultado = 2000;

    //Obtener diferencia de años
    const diferencia = obtenerDiferenciaYear(datos.year);

    //Se resta 3% por cada año anterior
    resultado -= (diferencia * 3 * resultado) / 100;

    //se suma porcentaje dependiendo del tipo de carro
    //Europeo 30%
    //Americano 15%
    //Asiatico 5%
    resultado *= calcularMarca(datos.marca);

    //incrementa el tipo de seguro
    //basico 20%
    //Completo 50%
    resultado *= calcularPlan(datos.plan);
    // resultado = resultado.toFixed(2);

    //formatear Dinero
    resultado = formatearDinero(resultado);
    setCargando(true);
    setTimeout(() => {
      setResultado(resultado);
      setCargando(false);
    }, 1500);
  };
  return (
    <CotizadorContext.Provider
      value={{
        datos,
        handleChangeDatos,
        error,
        setError,
        cotizarSeguro,
        resultado,
        cargando,
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;
