type FormSuccessProps = {
  message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-green-100 text-center text-green-700 border border-green-400 px-4 py-2 rounded-lg text-sm mt-2">
      {message}
    </div>
  );
};

export default FormSuccess;
