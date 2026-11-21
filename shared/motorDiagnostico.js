export function compararAntesDespues(resultadoAntes, resultadoDespues) {
  return {
    porcentajeAntes: resultadoAntes.porcentaje,
    porcentajeDespues: resultadoDespues.porcentaje,
    mejora: resultadoDespues.porcentaje - resultadoAntes.porcentaje,
    erroresSuperados: resultadoAntes.erroresDetectados.filter(
      (err) => !resultadoDespues.erroresDetectados.includes(err)
    ),
    erroresPendientes: resultadoDespues.erroresDetectados
  };
}