const fs = require('fs');
const path = require('path');

/**
 * Genera un archivo .arff con una sola instancia basada en los datos del formulario.
 * @param {Object} datos - Datos del formulario
 * @param {string} ruta - Ruta donde guardar el .arff
 */
function generarARFF(datos, ruta) {
  const {
    edadPersona,
    tieneMascotasPrevias,
    tipoCasa,
    prefiereGatosActivos,
    peso,
    raza,
    sexoGato,
    comportamiento,
    estaVacunado,
    tamaño
    // Nota: adoptara no se incluye en la predicción, solo es '?'.
  } = datos;

  // Validar campos requeridos
  const camposObligatorios = [
    edadPersona,
    tieneMascotasPrevias,
    tipoCasa,
    prefiereGatosActivos,
    peso,
    raza,
    sexoGato,
    comportamiento,
    estaVacunado,
    tamaño
  ];

  if (camposObligatorios.some(campo => campo === undefined || campo === "")) {
    console.error("❌ Error: Todos los campos deben estar completos.");
    return;
  }

  // Limpieza de valores (quita tildes y convierte a minúsculas)
  const quitarTildes = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const limpiar = (valor) => quitarTildes(valor.toString().trim().toLowerCase());

  const lineaDatos = [
    edadPersona,
    tieneMascotasPrevias,
    tipoCasa,
    prefiereGatosActivos,
    peso,
    raza,
    sexoGato,
    comportamiento,
    estaVacunado,
    tamaño,
    '?' // Clase a predecir
  ].map(limpiar).join(',');

  // Contenido ARFF
  const contenido = `@RELATION adopcion

@ATTRIBUTE edadPersona NUMERIC
@ATTRIBUTE tieneMascotasPrevias {si,no}
@ATTRIBUTE tipoCasa {departamento,casa}
@ATTRIBUTE prefiereGatosActivos {si,no}
@ATTRIBUTE peso NUMERIC
@ATTRIBUTE raza {persian,siames,comun,exotico,otro}
@ATTRIBUTE sexoGato {macho,hembra}
@ATTRIBUTE comportamiento {tranquilo,jugueton,timido,agresivo}
@ATTRIBUTE estaVacunado {si,no}
@ATTRIBUTE tamaño {pequeno,mediano,grande}
@ATTRIBUTE adoptara {si,no}

@DATA
${lineaDatos}
`;

  try {
    fs.writeFileSync(ruta, contenido.trim(), 'utf8');
    console.log(`✅ Archivo ARFF generado: ${ruta}`);
  } catch (error) {
    console.error("❌ Error al generar el archivo ARFF:", error);
  }
}

module.exports = { generarARFF };
