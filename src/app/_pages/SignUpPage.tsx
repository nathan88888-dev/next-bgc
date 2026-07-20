import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useUser } from '@/app/context/UserContext';
import { Mail, Lock, AlertCircle, Chrome, Facebook, Users, User, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { isValidEmail, isPresent, minLength } from '@/utils/validators';
import { useI18nStore } from '@/stores/i18n';

// Custom Discord Icon since it's not in Lucide
function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 127.14 96.36"
      fill="currentColor"
      {...props}
    >
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22c.12-14.56-4.1-34.14-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
    </svg>
  );
}

export function SignUpPage() {
  const navigate = useNavigate();
  const { setRole } = useUser();
  const { t } = useI18nStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    location: false
  });
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    password: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const validateField = (name: string, value: string) => {
    let err = '';
    if (name === 'name') {
      if (!isPresent(value)) err = t('auth.messages.required', { field: t('auth.signup.name_label') });
    } else if (name === 'email') {
      if (!isPresent(value)) err = t('auth.messages.required', { field: t('auth.email') });
      else if (!isValidEmail(value)) err = t('validation.invalid_email');
    } else if (name === 'location') {
      if (!isPresent(value)) err = t('auth.messages.required', { field: t('auth.signup.location_label') });
    } else if (name === 'password') {
      if (!isPresent(value)) err = t('auth.messages.required', { field: t('auth.password') });
      else if (!minLength(value, 8)) err = t('auth.messages.min_length', { count: 8 });
    }
    setFieldErrors(prev => ({ ...prev, [name]: err }));
    return !err;
  };

  const handleBlur = (name: string, value: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Final validation
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isLocValid = validateField('location', formData.location);
    const isPassValid = validateField('password', formData.password);

    if (!isNameValid || !isEmailValid || !isLocValid || !isPassValid) {
      setTouched({ name: true, email: true, location: true, password: true });
      setError(t('auth.messages.check_form'));
      setLoading(false);
      return;
    }

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      
      // 0.3.7 Dicebear avatar generation
      // const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.name)}`;
      
      // 0.3.2 Email verification state
      setIsVerifying(true);
      toast.success(t('auth.signup.success'));
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`;
      setRole('user');
      setRole('user');
      toast.success(`${t('auth.auth.sign_up')} ${t('auth.messages.success').toLowerCase()}`);
      navigate('/groups');
    }, 1000);
  };

  if (isVerifying) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
            <Mail className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">{t('auth.signup.verify_email.title')}</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {t('auth.signup.verify_email.desc_p1')} <span className="font-bold text-gray-900">{formData.email}</span>{t('auth.signup.verify_email.desc_p2')}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => {
                setRole('user');
                toast.success(t('auth.signup.verify_email.simulated_success'));
                navigate('/groups');
              }}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-amber-200 text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 transition-all"
            >
              {t('auth.signup.verify_email.verified_btn')}
            </button>
            <button
              onClick={() => toast.info(t('auth.signup.verify_email.resend_success'))}
              className="w-full flex justify-center py-3 px-4 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 bg-white hover:bg-gray-50 transition-all"
            >
              {t('auth.signup.verify_email.resend_btn')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg transform -rotate-3">
            <Users className="w-7 h-7 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {t('auth.signup.title')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('auth.signup.signin_prompt')}{' '}
          <Link to="/signin" id="sign-in-link" className="font-medium text-amber-600 hover:text-amber-500">
            {t('auth.signup.signin_link')}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          
          {/* Social Login Buttons */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <span className="sr-only">{t('auth.signup.social_prefix')} Google</span>
                  <Chrome className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div>
                <button
                  onClick={() => handleSocialLogin('facebook')}
                  className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <span className="sr-only">{t('auth.signup.social_prefix')} Facebook</span>
                  <Facebook className="w-5 h-5 text-[#1877F2]" />
                </button>
              </div>

              <div>
                <button
                  onClick={() => handleSocialLogin('discord')}
                  className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  <span className="sr-only">{t('auth.signup.social_prefix')} Discord</span>
                  <DiscordIcon className="w-5 h-5 text-[#5865F2]" />
                </button>
              </div>
            </div>

            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t('auth.signup.continue_with')}</span>
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('auth.signup.name_label')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onBlur={() => handleBlur('name', formData.name)}
                  onChange={handleChange}
                  className={`block w-full pl-10 sm:text-sm rounded-md focus:ring-amber-500 focus:border-amber-500 py-2 border ${touched.name && fieldErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  placeholder={t('auth.signup.name_placeholder')}
                />
              </div>
              {touched.name && fieldErrors.name && (
                <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('auth.email')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onBlur={() => handleBlur('email', formData.email)}
                  onChange={handleChange}
                  className={`block w-full pl-10 sm:text-sm rounded-md focus:ring-amber-500 focus:border-amber-500 py-2 border ${touched.email && fieldErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  placeholder="you@example.com"
                />
              </div>
              {touched.email && fieldErrors.email && (
                <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                {t('auth.signup.location_label')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onBlur={() => handleBlur('location', formData.location)}
                  onChange={handleChange}
                  className={`block w-full pl-10 sm:text-sm rounded-md focus:ring-amber-500 focus:border-amber-500 py-2 border ${touched.location && fieldErrors.location ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  placeholder={t('auth.signup.location_placeholder')}
                />
              </div>
              {touched.location && fieldErrors.location && (
                <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.location}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" id="password-label" className="block text-sm font-medium text-gray-700">
                {t('auth.password')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onBlur={() => handleBlur('password', formData.password)}
                  onChange={handleChange}
                  className={`block w-full pl-10 sm:text-sm rounded-md focus:ring-amber-500 focus:border-amber-500 py-2 border ${touched.password && fieldErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  placeholder="••••••••"
                />
              </div>
              {touched.password && fieldErrors.password ? (
                <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-3 h-3" />
                  {fieldErrors.password}
                </p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">
                  {t('auth.signup.password_hint')}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? t('auth.signup.creating_acc') : t('auth.signup.submit_btn')}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            {t('auth.signup.legal_p1')}{' '}
            <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
              {t('auth.signup.legal_tos')}
            </a>{' '}
            {t('auth.signup.legal_p2')}{' '}
            <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
              {t('auth.signup.legal_privacy')}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}