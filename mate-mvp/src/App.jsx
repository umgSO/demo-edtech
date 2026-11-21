import { useState, useEffect } from "react";
import { obtenerTema, guardarResultado } from "./shared/apiService";
import { MOCK_TEMA } from "./data/mockTema";
import JoinScreen from "./components/student/JoinScreen";
import QuizScreen from "./components/student/QuizScreen";
import MicroClassScreen from "./components/student/MicroClassScreen";
import MinigamePlaceholder from "./components/student/MinigamePlaceholder";
import ResultsScreen from "./components/student/ResultsScreen";
import TutorModeScreen from "./components/student/TutorModeScreen";

export default function App() {
  const [tema, setTema] = useState(MOCK_TEMA);
  const [temaActivo, setTemaActivo] = useState(true);
  const [step, setStep] = useState("INGRESO");
  const [student, setStudent] = useState(null);
  const [detectedErrors, setDetectedErrors] = useState([]);
  const [diagResults, setDiagResults] = useState([]);
  const [reevalResults, setReevalResults] = useState([]);

  // Carga el tema desde el backend de P1 (con respaldo offline automático)
  useEffect(() => {
    async function cargar() {
      try {
        const data = await obtenerTema();
        if (data) {
          // Soporta si P1 devuelve { activo, tema: {...} } o el JSON directo con campo activo
          const temaReal = data.tema || data;
          if (temaReal.diagnostico) setTema(temaReal);
          if (typeof data.activo === "boolean") setTemaActivo(data.activo);
        }
      } catch (err) {
        console.warn("Usando tema local:", err);
      }
    }
    cargar();
  }, []);

  const handleStart = (studentData) => {
    setStudent(studentData);
    setStep("DIAGNOSTICO");
  };

  const handleDiagnosticFinish = (answers) => {
    const failedErrors = [
      ...new Set(
        answers.filter((a) => !a.isCorrect && a.errorId).map((a) => a.errorId)
      ),
    ];
    setDiagResults(answers);
    setDetectedErrors(failedErrors);

    if (failedErrors.length === 0) {
      // Si sacó 100% en el diagnóstico, guarda directo
      guardarResultado({
        estudiante: student.name,
        antes: 100,
        despues: 100,
        errores_antes: [],
        errores_despues: [],
      });
      setStep("RESULTADOS");
    } else {
      setStep("MICROCLASE");
    }
  };

  const handleReevalFinish = async (answers) => {
    setReevalResults(answers);

    const diagCorrect = diagResults.filter((a) => a.isCorrect).length;
    const reevalCorrect = answers.filter((a) => a.isCorrect).length;

    const erroresDespues = [
      ...new Set(
        answers.filter((a) => !a.isCorrect && a.errorId).map((a) => a.errorId)
      ),
    ];

    // Envía el resultado con el formato exacto de Persona 1
    await guardarResultado({
      estudiante: student.name,
      antes: Math.round((diagCorrect / diagResults.length) * 100),
      despues: Math.round((reevalCorrect / answers.length) * 100),
      errores_antes: detectedErrors,
      errores_despues: erroresDespues,
    });

    setStep("RESULTADOS");
  };

  const resetAll = () => {
    setStep("INGRESO");
    setStudent(null);
    setDetectedErrors([]);
    setDiagResults([]);
    setReevalResults([]);
  };

  const filtradas = (tema.reevaluacion || []).filter((q) =>
    detectedErrors.includes(q.target_error || q.error_id || q.error_objetivo || q.error)
  );
  const reevalQuestions =
    filtradas.length > 0 ? filtradas : (tema.reevaluacion || []).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center font-sans">
      <div className="w-full max-w-md min-h-screen bg-slate-50 shadow-xl flex flex-col">
        <header
          className={`text-white px-5 py-4 flex items-center justify-between transition-colors ${
            step === "TUTOR_CASA" ? "bg-indigo-700" : "bg-blue-600"
          }`}
        >
          <div onClick={resetAll} className="cursor-pointer">
            <p className="text-xs uppercase tracking-wider opacity-80 font-semibold">
              {tema.grado}
            </p>
            <h1 className="text-base font-bold leading-tight">{tema.titulo}</h1>
          </div>
          <span className="bg-white/20 text-xs font-mono px-2.5 py-1 rounded-full">
            {student ? student.name : tema.codigo_clase}
          </span>
        </header>

        {!temaActivo && step === "INGRESO" ? (
          <div className="flex-1 p-6 flex flex-col justify-center items-center text-center gap-3">
            <p className="text-lg font-bold text-slate-800">
              Clase aún no habilitada
            </p>
            <p className="text-sm text-slate-600">
              Espera a que tu docente active el tema de hoy en su panel.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm"
            >
              Verificar de nuevo
            </button>
          </div>
        ) : (
          <>
            {step === "INGRESO" && (
              <JoinScreen tema={tema} onStart={handleStart} />
            )}

            {step === "DIAGNOSTICO" && (
              <QuizScreen
                key="diag"
                questions={tema.diagnostico}
                mode="diagnostico"
                onFinish={handleDiagnosticFinish}
              />
            )}

            {step === "MICROCLASE" && (
              <MicroClassScreen
                detectedErrors={detectedErrors}
                microClases={tema.micro_clases}
                onFinish={() => setStep("MINIJUEGO")}
              />
            )}

            {step === "MINIJUEGO" && (
              <MinigamePlaceholder onFinish={() => setStep("REEVALUACION")} />
            )}

            {step === "REEVALUACION" && (
              <QuizScreen
                key="reeval"
                questions={reevalQuestions}
                mode="reevaluacion"
                onFinish={handleReevalFinish}
              />
            )}

            {step === "RESULTADOS" && (
              <ResultsScreen
                student={student}
                diagResults={diagResults}
                reevalResults={reevalResults}
                onGoTutor={() => setStep("TUTOR_CASA")}
                onReset={resetAll}
              />
            )}

            {step === "TUTOR_CASA" && (
              <TutorModeScreen
                detectedErrors={detectedErrors}
                microClases={tema.micro_clases}
                onDone={resetAll}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
