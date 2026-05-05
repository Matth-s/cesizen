import { CheckCircle } from "lucide-react";

type ChoiceDiagCardProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

const ChoiceDiagCard = ({ label, selected, onClick }: ChoiceDiagCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
        selected
          ? "border-teal-500 bg-teal-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300"
      } `}
    >
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full border ${
          selected
            ? "border-teal-500 bg-teal-500 text-white"
            : "border-gray-300"
        } `}
      >
        {selected && (
          <CheckCircle className="h-5 w-5 text-white" aria-hidden="true" />
        )}
      </div>

      <span className="text-sm font-medium text-gray-800">{label}</span>
    </button>
  );
};

export default ChoiceDiagCard;
