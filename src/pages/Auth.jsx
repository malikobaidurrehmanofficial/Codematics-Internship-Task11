import { Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import MovixButton from '../components/ui/MovixButton';
import {
  serializeUser,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
} from '../services/authService';
import { setUser } from '../store/authSlice';

const inputClassName =
  'h-[52px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 pl-12 text-white outline-none transition placeholder:text-gray-500 focus:border-[#E50914]/50 focus:bg-black/45';

export default function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const [mode, setMode] = useState('signin');
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (currentUser) {
    return <Navigate replace to="/" />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const firebaseUser =
        mode === 'signin'
          ? await signInWithEmail(formData.email, formData.password)
          : await signUpWithEmail(formData.email, formData.password, formData.displayName);

      dispatch(setUser(serializeUser(firebaseUser)));
      navigate('/');
    } catch (submitError) {
      setError(submitError.message || 'Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      const firebaseUser = await signInWithGoogle();
      dispatch(setUser(serializeUser(firebaseUser)));
      navigate('/');
    } catch (submitError) {
      setError(submitError.message || 'Google sign-in failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-app relative overflow-hidden px-6 pb-24 pt-28 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_22%)]" />

      <div className="relative max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1.05fr,0.95fr]">
        <section className="surface-card border-app rounded-[32px] border p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
          <p className="text-muted text-sm uppercase tracking-[0.45em]">Movix Access</p>
          <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            {mode === 'signin' ? 'Sign in for a richer movie night.' : 'Create your Movix profile.'}
          </h1>
          <p className="text-muted mt-5 max-w-xl text-base leading-8">
            Save titles, jump back into the cinematic catalog, and keep your next watchlist ready every time you open Movix.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="surface-soft border-app rounded-2xl border p-4">
              <p className="text-muted text-xs uppercase tracking-[0.35em]">Sync</p>
              <p className="text-app mt-3">Carry your list across sessions.</p>
            </div>
            <div className="surface-soft border-app rounded-2xl border p-4">
              <p className="text-muted text-xs uppercase tracking-[0.35em]">Save</p>
              <p className="text-app mt-3">Bookmark the next title before you forget it.</p>
            </div>
            <div className="surface-soft border-app rounded-2xl border p-4">
              <p className="text-muted text-xs uppercase tracking-[0.35em]">Return</p>
              <p className="text-app mt-3">Jump right back into the Movix shelf.</p>
            </div>
          </div>

          <div className="mt-10 rounded-[28px] border border-[#E50914]/15 bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.22),transparent_38%),rgba(0,0,0,0.2)] p-6">
            <p className="text-sm uppercase tracking-[0.32em] text-[#FF9DA3]">Why Movix</p>
            <p className="mt-3 text-lg leading-8 text-white">
              Built for dark rooms, big screens, and movie browsing that feels premium instead of disposable.
            </p>
          </div>
        </section>

        <section className="surface-card border-app rounded-[32px] border p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-10">
          <div className="surface-soft border-app flex rounded-full border p-1">
            <button
              className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition ${
                mode === 'signin' ? 'bg-[#E50914] text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setMode('signin')}
              type="button"
            >
              Sign In
            </button>
            <button
              className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition ${
                mode === 'signup' ? 'bg-[#E50914] text-white' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setMode('signup')}
              type="button"
            >
              Create Account
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-white">
              {mode === 'signin' ? 'Welcome back to Movix.' : 'Start saving with Movix.'}
            </h2>
              <p className="text-muted mt-3">
              {mode === 'signin'
                ? 'Use your email or continue with Google.'
                : 'Create a profile and build your own cinematic queue.'}
            </p>
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-[#E50914]/30 bg-[#E50914]/10 px-4 py-3 text-sm text-[#FFB9BE]">
              {error}
            </div>
          ) : null}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {mode === 'signup' ? (
              <label className="block">
                <span className="mb-2 block text-sm text-gray-400">Display Name</span>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <input
                    className={inputClassName}
                    name="displayName"
                    onChange={handleChange}
                    placeholder="How should Movix greet you?"
                    required
                    value={formData.displayName}
                  />
                </div>
              </label>
            ) : null}

            <label className="block">
              <span className="mb-2 block text-sm text-gray-400">Email</span>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  className={inputClassName}
                  name="email"
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={formData.email}
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-gray-400">Password</span>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  className={inputClassName}
                  minLength={6}
                  name="password"
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  required
                  type="password"
                  value={formData.password}
                />
              </div>
            </label>

            <div className="pt-2">
              <MovixButton className="w-full" disabled={isSubmitting} size="lg" type="submit">
                {isSubmitting
                  ? 'Please wait...'
                  : mode === 'signin'
                    ? 'Enter Movix'
                    : 'Create Account'}
              </MovixButton>
            </div>
          </form>

          <div className="text-muted my-6 flex items-center gap-3 text-sm">
            <span className="h-px flex-1 bg-white/10" />
            Or continue with
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <MovixButton
            className="w-full"
            disabled={isSubmitting}
            onClick={handleGoogle}
            size="lg"
            variant="secondary"
          >
            Continue with Google
          </MovixButton>

          <p className="text-muted mt-6 text-sm">
            By continuing, you agree to keep Movix dark, cinematic, and unmistakably not a generic template.
          </p>

          <p className="text-muted mt-8 text-sm">
            Want to browse first?{' '}
            <Link className="text-white transition hover:text-[#FF6B75]" to="/">
              Return to Movix home
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
