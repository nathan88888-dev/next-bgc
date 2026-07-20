import { useState } from 'react';
import { Link } from 'react-router';
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { authService } from '@/services/authService';
import { isValidEmail, isPresent } from '@/utils/validators';
import { useI18nStore } from '@/stores/i18n';

export function ForgotPasswordPage() {
  const { t } = useI18nStore();
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [fieldError, setFieldError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateField = (value: string) => {
    let err = '';
    if (!isPresent(value)) err = t('auth.messages.required', { field: t('auth.email') });
    else if (!isValidEmail(value)) err = t('validation.invalid_email');
    setFieldError(err);
    return !err;
  };

  const handleBlur = () => {
    setTouched(true);
    validateField(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!validateField(email)) {
        setTouched(true);
        setLoading(false);
        return;
      }

      const { error: resetError } = await authService.resetPasswordForEmail(email);
      if (resetError) throw resetError;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || t('auth.signup.forgot_password.error_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {t('auth.signup.forgot_password.title')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('auth.signup.forgot_password.desc')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          {success ? (
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('auth.signup.forgot_password.success_title')}</h3>
              <p className="text-sm text-gray-500 mb-6">
                {t('auth.signup.forgot_password.success_desc')} <span className="font-semibold text-gray-900">{email}</span>.
              </p>
              <Link
                to="/signin"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 transition-colors"
              >
                {t('auth.signup.forgot_password.back_to_signin')}
              </Link>
            </div>
          ) : (
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
                    value={email}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (touched) validateField(e.target.value);
                    }}
                    className={`block w-full pl-10 sm:text-sm rounded-md focus:ring-amber-500 focus:border-amber-500 py-2 border ${touched && fieldError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder="you@example.com"
                  />
                </div>
                {touched && fieldError && (
                  <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldError}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? t('auth.signup.forgot_password.sending') : t('auth.signup.forgot_password.submit_btn')}
                </button>
              </div>

              <div className="text-center">
                <Link
                  to="/signin"
                  className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-500"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('auth.signup.forgot_password.back_to_signin')}
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
