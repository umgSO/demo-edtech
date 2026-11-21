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

  useEffect(() => {
    async function cargar() {
      try {
        const data = await obtenerTema();
        if (data) {
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
    detectedErrors.includes(
      q.target_error || q.error_id || q.error_objetivo || q.error
    )
  );
  const reevalQuestions =
    filtradas.length > 0 ? filtradas : (tema.reevaluacion || []).slice(0, 3);

  return (
    <div className="min-h-screen bg-selva-900 text-hueso flex justify-center font-texto">
      <div className="w-full max-w-2xl min-h-screen bg-selva-900 flex flex-col shadow-xl">
        <header
          className={`sticky top-0 z-10 px-5 py-4 flex items-center justify-between gap-3 text-selva-900 transition-colors ${
            step === "TUTOR_CASA" ? "bg-quetzal" : "bg-zorro"
          }`}
        >
          <div onClick={resetAll} className="cursor-pointer min-w-0">
            <p className="text-xs font-semibold opacity-80">
              {tema.grado} · Grupo Zorro
            </p>
            <h1 className="font-titulo text-lg sm:text-xl font-bold leading-tight truncate">
              {tema.titulo}
            </h1>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="bg-selva-900/15 text-selva-900 text-xs font-mono font-semibold px-3 py-1 rounded-full">
              {student ? student.name : tema.codigo_clase}
            </span>
            <span className="text-2xl leading-none" aria-hidden="true">
              🦊
            </span>
          </div>
        </header>

        {!temaActivo && step === "INGRESO" ? (
          <div className="flex-1 p-6 flex flex-col justify-center items-center text-center gap-3">
            <div className="bg-selva-800 border border-selva-700 rounded-2xl p-6 max-w-md w-full space-y-3">
              <p className="font-titulo text-xl font-bold text-hueso">
                Clase aún no habilitada
              </p>
              <p className="text-sm text-musgo">
                Espera a que tu docente active el tema de hoy en su panel.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 w-full bg-zorro hover:brightness-110 text-selva-900 px-5 py-3 rounded-xl font-bold text-sm transition cursor-pointer"
              >
                Verificar de nuevo
              </button>
            </div>
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
