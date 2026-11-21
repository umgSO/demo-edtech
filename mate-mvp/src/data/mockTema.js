export const MOCK_TEMA = {
  tema_id: "mat_1b_ecuaciones",
  grado: "1.º Básico (CNB)",
  titulo: "Ecuaciones lineales (ax + b = c)",
  codigo_clase: "MATE-1B",

  // 6 preguntas diagnósticas (cada distractor mapea a un error real)
  diagnostico: [
    {
      id: "d1",
      enunciado: "2x - 4 = 10",
      opciones: [
        { texto: "x = 3", correcta: false, error_id: "err_signo" },
        { texto: "x = 7", correcta: true, error_id: null },
        { texto: "x = 12", correcta: false, error_id: "err_coeficiente" },
        { texto: "x = -5", correcta: false, error_id: "err_termino" },
      ],
    },
    {
      id: "d2",
      enunciado: "3x + 6 = 18",
      opciones: [
        { texto: "x = 4", correcta: true, error_id: null },
        { texto: "x = 8", correcta: false, error_id: "err_signo" },
        { texto: "x = 9", correcta: false, error_id: "err_coeficiente" },
        { texto: "x = 2", correcta: false, error_id: "err_termino" },
      ],
    },
    {
      id: "d3",
      enunciado: "4x - 8 = 16",
      opciones: [
        { texto: "x = 20", correcta: false, error_id: "err_coeficiente" },
        { texto: "x = 2", correcta: false, error_id: "err_signo" },
        { texto: "x = 6", correcta: true, error_id: null },
        { texto: "x = -4", correcta: false, error_id: "err_termino" },
      ],
    },
    {
      id: "d4",
      enunciado: "2x + 4 = 12",
      opciones: [
        { texto: "x = 2", correcta: false, error_id: "err_termino" },
        { texto: "x = 6", correcta: false, error_id: "err_coeficiente" },
        { texto: "x = 8", correcta: false, error_id: "err_signo" },
        { texto: "x = 4", correcta: true, error_id: null },
      ],
    },
    {
      id: "d5",
      enunciado: "5x - 10 = 15",
      opciones: [
        { texto: "x = 5", correcta: true, error_id: null },
        { texto: "x = 1", correcta: false, error_id: "err_signo" },
        { texto: "x = 20", correcta: false, error_id: "err_coeficiente" },
        { texto: "x = -3", correcta: false, error_id: "err_termino" },
      ],
    },
    {
      id: "d6",
      enunciado: "3x + 3 = 18",
      opciones: [
        { texto: "x = 7", correcta: false, error_id: "err_signo" },
        { texto: "x = 3", correcta: false, error_id: "err_termino" },
        { texto: "x = 5", correcta: true, error_id: null },
        { texto: "x = 12", correcta: false, error_id: "err_coeficiente" },
      ],
    },
  ],

  // 3 micro-clases + práctica guiada + guía para tutor en casa
  micro_clases: {
    err_signo: {
      nombre_corto: "Cambio de signo al despejar",
      titulo: "El puente cambia el signo",
      explicacion:
        "Una ecuación es una balanza. Cuando un número cruza el signo igual (=), cambia a su operación opuesta: lo que resta pasa a sumar, y lo que suma pasa a restar.",
      pasos_visuales: [
        "2x - 4 = 10",
        "2x = 10 + 4   (el -4 cruzó como +4)",
        "2x = 14  →  x = 7",
      ],
      practica_guiada: {
        pregunta: "En 3x - 5 = 10, ¿cómo queda el primer paso al mover el -5?",
        opciones: [
          { texto: "3x = 10 + 5", correcta: true },
          { texto: "3x = 10 - 5", correcta: false },
        ],
        pista: "Fíjate en el signo del 5: estaba restando, así que al cruzar el igual debe sumar.",
      },
      guia_tutor_casa: {
        pregunta_para_tutor:
          "Pídele que te explique con sus palabras por qué el -4 se vuelve +4 cuando cruza al otro lado del igual.",
        que_buscar:
          "Que mencione que cambia de operación (de resta a suma) para mantener la ecuación en equilibrio.",
        pista_si_se_traba:
          "Léele esto: 'Imagina una balanza. Si quitas 4 de un lado, tienes que compensar sumando 4 del otro lado para que siga igualada'.",
      },
    },

    err_coeficiente: {
      nombre_corto: "Despeje del número que multiplica a x",
      titulo: "El número pegado a la x divide",
      explicacion:
        "Cuando ves 3x, el 3 está multiplicando a la x. Para dejar sola a la x, ese número NO se resta: pasa al otro lado dividiendo.",
      pasos_visuales: [
        "3x = 15",
        "x = 15 ÷ 3   (el 3 multiplicaba, pasa a dividir)",
        "x = 5",
      ],
      practica_guiada: {
        pregunta: "Si ya llegaste a 4x = 20, ¿cómo despejas la x?",
        opciones: [
          { texto: "x = 20 - 4", correcta: false },
          { texto: "x = 20 ÷ 4", correcta: true },
        ],
        pista: "Recuerda: 4x significa '4 veces x'. Lo contrario de multiplicar es dividir.",
      },
      guia_tutor_casa: {
        pregunta_para_tutor:
          "Pregúntale: si 4 cuadernos iguales cuestan Q20, ¿qué operación hace para saber el precio de 1 cuaderno?",
        que_buscar:
          "Que responda 'dividir 20 entre 4' y conecte eso con despejar 4x = 20.",
        pista_si_se_traba:
          "Léele esto: 'Si restaras 20 - 4 dirías que cada cuaderno cuesta Q16, pero 4 cuadernos costarían Q64. Por eso se divide'.",
      },
    },

    err_termino: {
      nombre_corto: "Mezclar términos con x y números sueltos",
      titulo: "Peras con peras, números con números",
      explicacion:
        "No puedes sumar o restar un término que tiene x con un número suelto (2x + 4 NO es 6x). Primero mueve el número suelto al otro lado del igual.",
      pasos_visuales: [
        "2x + 4 = 12   (NO sumes 2 + 4)",
        "2x = 12 - 4   (mueve el 4 primero)",
        "2x = 8  →  x = 4",
      ],
      practica_guiada: {
        pregunta: "En 2x + 5 = 11, ¿cuál es el paso correcto?",
        opciones: [
          { texto: "Sumar 2x + 5 para tener 7x = 11", correcta: false },
          { texto: "Dejar 2x y pasar el 5 restando (2x = 11 - 5)", correcta: true },
        ],
        pista: "El 2x representa cajas cerradas y el 5 son monedas sueltas: no se pueden juntar en un solo número.",
      },
      guia_tutor_casa: {
        pregunta_para_tutor:
          "Pregúntale por qué en '2x + 4' no se puede simplemente sumar 2 + 4 para poner 6x.",
        que_buscar:
          "Que explique que el 2 va pegado a una incógnita (valor desconocido) y el 4 es un número independiente.",
        pista_si_se_traba:
          "Léele esto: 'Es como tener 2 bolsas de dulces más 4 dulces sueltos: no tienes 6 bolsas, primero separas los sueltos'.",
      },
    },
  },

  // 6 preguntas nuevas de reevaluación (2 por cada tipo de error)
  reevaluacion: [
    {
      id: "r1",
      target_error: "err_signo",
      enunciado: "2x - 6 = 12",
      opciones: [
        { texto: "x = 3", correcta: false, error_id: "err_signo" },
        { texto: "x = 9", correcta: true, error_id: null },
        { texto: "x = 16", correcta: false, error_id: "err_coeficiente" },
        { texto: "x = -3", correcta: false, error_id: "err_termino" },
      ],
    },
    {
      id: "r2",
      target_error: "err_signo",
      enunciado: "4x + 8 = 24",
      opciones: [
        { texto: "x = 8", correcta: false, error_id: "err_signo" },
        { texto: "x = 12", correcta: false, error_id: "err_coeficiente" },
        { texto: "x = 4", correcta: true, error_id: null },
        { texto: "x = 2", correcta: false, error_id: "err_termino" },
      ],
    },
    {
      id: "r3",
      target_error: "err_coeficiente",
      enunciado: "6x = 24",
      opciones: [
        { texto: "x = 18", correcta: false, error_id: "err_coeficiente" },
        { texto: "x = 4", correcta: true, error_id: null },
        { texto: "x = 30", correcta: false, error_id: "err_coeficiente" },
        { texto: "x = 3", correcta: false, error_id: "err_coeficiente" },
      ],
    },
    {
      id: "r4",
      target_error: "err_coeficiente",
      enunciado: "4x - 4 = 20",
      opciones: [
        { texto: "x = 20", correcta: false, error_id: "err_coeficiente" },
        { texto: "x = 4", correcta: false, error_id: "err_signo" },
        { texto: "x = 6", correcta: true, error_id: null },
        { texto: "x = 28", correcta: false, error_id: "err_coeficiente" },
      ],
    },
    {
      id: "r5",
      target_error: "err_termino",
      enunciado: "3x + 6 = 27",
      opciones: [
        { texto: "x = 3", correcta: false, error_id: "err_termino" },
        { texto: "x = 11", correcta: false, error_id: "err_signo" },
        { texto: "x = 18", correcta: false, error_id: "err_coeficiente" },
        { texto: "x = 7", correcta: true, error_id: null },
      ],
    },
    {
      id: "r6",
      target_error: "err_termino",
      enunciado: "2x + 2 = 16",
      opciones: [
        { texto: "x = 7", correcta: true, error_id: null },
        { texto: "x = 4", correcta: false, error_id: "err_termino" },
        { texto: "x = 9", correcta: false, error_id: "err_signo" },
        { texto: "x = 12", correcta: false, error_id: "err_coeficiente" },
      ],
    },
  ],
};