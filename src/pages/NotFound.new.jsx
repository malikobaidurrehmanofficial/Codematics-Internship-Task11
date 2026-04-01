import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button.new';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-white mb-2">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Button onClick={() => navigate('/')}>
            Go Home
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 text-6xl opacity-20">
          🎬
        </div>
      </div>
    </div>
  );
}
