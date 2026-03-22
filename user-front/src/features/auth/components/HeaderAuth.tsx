import { Heart } from 'lucide-react';

const HeaderAuth = () => {
  return (
    <div className="p-2 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Heart className="w-7 h-7 text-white" aria-hidden="true" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">CESIZen</h1>
      <p className="text-base text-gray-700 mt-2">
        Votre bien-être mental au quotidien
      </p>
    </div>
  );
};

export default HeaderAuth;
