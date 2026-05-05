type DiagnosticProgressStatusProps = {
  currentIndex: number;
  answerTotal: number;
};

const DiagnosticProgressStatus = ({
  currentIndex,
  answerTotal,
}: DiagnosticProgressStatusProps) => {
  const width = (currentIndex / answerTotal) * 100;

  return (
    <div className="w-full">
      <p className="mb-3 text-center">
        Question {currentIndex} sur {answerTotal}
      </p>

      <div className="h-1.5 w-full overflow-hidden rounded-sm bg-white">
        <span
          className="block h-full bg-black transition-all duration-300"
          style={{ width: `${width}%` }}
        ></span>
      </div>
    </div>
  );
};

export default DiagnosticProgressStatus;
