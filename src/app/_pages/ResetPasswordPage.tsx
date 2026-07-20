import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { Lock, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { authService } from '@/services/authService';
import { toast } from 'sonner';
import { useI18nStore } from '@/stores/i18n';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const { t } = useI18nStore();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState({ password: false, confirmPassword: false });
  const [fieldErrors, setFieldErrors] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateField = (name: string, value: string, otherValue?: string) => {
    let err = '';
    if (name === 'password') {
      if (!value) err = t('auth.messages.required', { field: t('auth.password') });
      else if (value.length < 8) err = t('auth.messages.min_length', { count: 8 });
    } else if (name === 'confirmPassword') {
      if (!value) err = t('auth.messages.required', { field: t('profile.confirm_password') });
      else if (value !== (otherValue ?? password)) err = t('change_password.errors.match');
    }
    setFieldErrors(prev => ({ ...prev, [name]: err }));
    return !err;
  };

  const handleBlur = (name: string, value: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const isPassValid = validateField('password', password);
      const isConfirmValid = validateField('confirmPassword', confirmPassword, password);

      if (!isPassValid || !isConfirmValid) {
        setTouched({ password: true, confirmPassword: true });
        setError(t('auth.messages.check_form'));
        setLoading(false);
        return;
      }
      const { error: updateError } = await authService.updatePassword(password);
      if (updateError) throw updateError;
      setSuccess(true);
      toast.success(t('change_password.success'));
      
      // Auto redirect to signin after 3 seconds
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
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
          {t('auth.signup.reset_password.title')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('auth.signup.reset_password.desc')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          {success ? (
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('auth.signup.reset_password.success_title')}</h3>
              <p className="text-sm text-gray-500 mb-6">
                {t('auth.signup.reset_password.success_desc')}
              </p>
              <Link
                to="/signin"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 transition-colors"
              >
                {t('auth.signup.reset_password.btn_signin')}
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t('profile.new_password')}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onBlur={() => handleBlur('password', password)}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (touched.password) validateField('password', e.target.value);
                    }}
                    className={`block w-full pl-10 pr-10 sm:text-sm rounded-md focus:ring-amber-500 focus:border-amber-500 py-2 border ${touched.password && fieldErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder={t('auth.signup.reset_password.placeholder_min', { count: 8 })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {touched.password && fieldErrors.password && (
                  <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  {t('profile.confirm_password')}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onBlur={() => handleBlur('confirmPassword', confirmPassword)}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (touched.confirmPassword) validateField('confirmPassword', e.target.value, password);
                    }}
                    className={`block w-full pl-10 pr-10 sm:text-sm rounded-md focus:ring-amber-500 focus:border-amber-500 py-2 border ${touched.confirmPassword && fieldErrors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder={t('auth.signup.reset_password.placeholder_repeat')}
                  />
                </div>
                {touched.confirmPassword && fieldErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? t('auth.signup.reset_password.updating') : t('auth.signup.reset_password.submit_btn')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
