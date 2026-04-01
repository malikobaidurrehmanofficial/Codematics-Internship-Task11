import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { signInWithEmail, signInWithGoogle } from '../services/authService';
import { setUser } from '../store/authSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const user = await signInWithEmail(formData.email, formData.password);
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }));
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const user = await signInWithGoogle();
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      }));
      navigate('/');
    } catch (err) {
      setError(err.message || 'Google sign-in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center px-4 py-12 pt-24">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-[#E50914] mb-3">MOVIX</h1>
          <p className="text-gray-400 text-lg">Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  disabled={isLoading}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-gray-900 text-gray-400 text-sm">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            type="button"
            variant="secondary"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full"
          >
            Google
          </Button>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#E50914] hover:text-[#F5051D] font-semibold transition">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-400">Or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-primary-light font-medium">
              Sign up
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/50 rounded text-blue-300 text-sm">
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <p>Email: demo@example.com</p>
          <p>Password: demo123456</p>
        </div>
      </div>
    </div>
  );
}
