import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="text-8xl sm:text-9xl font-black text-gradient mb-4">404</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text mb-3">
          Page Not Found
        </h1>
        <p className="text-text-muted text-sm mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/')} size="lg">
          <Home className="h-4 w-4" />
          Go Home
        </Button>
      </div>
    </div>
  );
}
