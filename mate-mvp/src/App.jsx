import { useState } from "react";
import { MOCK_TEMA } from "./data/mockTema";
import JoinScreen from "./components/student/JoinScreen";
import QuizScreen from "./components/student/QuizScreen";
import MicroClassScreen from "./components/student/MicroClassScreen";
import MinigamePlaceholder from "./components/student/MinigamePlaceholder";
import ResultsScreen from "./components/student/ResultsScreen";
import TutorModeScreen from "./components/student/TutorModeScreen";
import { enviarResultado } from "./services/api";

export default function App() {
  const [step, setStep] = useState("INGRESO");
  const [student, setStudent] = useState(null);
  const [detectedErrors, setDetectedErrors] = useState([]);
  const [diagResults, setDiagResults] = useState([]);
  const [reevalResults, setReevalResults] = useState([]);

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
    setStep(failedErrors.length === 0 ? "RESULTADOS" : "MICROCLASE");
  };

  const handleReevalFinish = (answers) => {
    setReevalResults(answers);

    const diagCorrect = diagResults.filter((a) => a.isCorrect).length;
    const reevalCorrect = answers.filter((a) => a.isCorrect).length;

    enviarResultado({
      student_name: student.name,
      class_code: student.classCode,
      diag_errors: detectedErrors,
      score_before: Math.round((diagCorrect / diagResults.length) * 100),
      score_after: Math.round((reevalCorrect / answers.length) * 100),
      tutor_validated: false,
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

  const reevalQuestions = MOCK_TEMA.reevaluacion.filter((q) =>
    detectedErrors.includes(q.target_error)
  );

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
              {MOCK_TEMA.grado}
            </p>
            <h1 className="text-base font-bold leading-tight">
              {MOCK_TEMA.titulo}
            </h1>
          </div>
          <span className="bg-white/20 text-xs font-mono px-2.5 py-1 rounded-full">
            {student ? student.name : MOCK_TEMA.codigo_clase}
          </span>
        </header>

        {step === "INGRESO" && (
          <JoinScreen tema={MOCK_TEMA} onStart={handleStart} />
        )}

        {step === "DIAGNOSTICO" && (
          <QuizScreen
            key="diag"
            questions={MOCK_TEMA.diagnostico}
            mode="diagnostico"
            onFinish={handleDiagnosticFinish}
          />
        )}

        {step === "MICROCLASE" && (
          <MicroClassScreen
            detectedErrors={detectedErrors}
            microClases={MOCK_TEMA.micro_clases}
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
            microClases={MOCK_TEMA.micro_clases}
            onDone={resetAll}
          />
        )}
      </div>
    </div>
  );
}
