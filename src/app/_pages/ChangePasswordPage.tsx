import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '@/app/context/UserContext';
import { Lock, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useI18nStore } from '@/stores/i18n';

export function ChangePasswordPage() {
  const { t } = useI18nStore();
  const navigate = useNavigate();
  const { user } = useUser();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState({ currentPassword: false, newPassword: false, confirmPassword: false });
  const [fieldErrors, setFieldErrors] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateField = (name: string, value: string, otherValue?: string) => {
    let err = '';
    if (name === 'currentPassword') {
      if (!value) err = t('change_password.errors.current_required' as any);
    } else if (name === 'newPassword') {
      if (!value) err = t('change_password.errors.new_required' as any);
      else if (value.length < 8) err = t('change_password.errors.length');
    } else if (name === 'confirmPassword') {
      if (!value) err = t('change_password.errors.confirm_required' as any);
      else if (value !== (otherValue ?? newPassword)) err = t('change_password.errors.match');
    }
    setFieldErrors(prev => ({ ...prev, [name]: err }));
    return !err;
  };

  const handleBlur = (name: string, value: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isCurrentValid = validateField('currentPassword', currentPassword);
    const isNewValid = validateField('newPassword', newPassword);
    const isConfirmValid = validateField('confirmPassword', confirmPassword, newPassword);

    if (!isCurrentValid || !isNewValid || !isConfirmValid) {
      setTouched({ currentPassword: true, newPassword: true, confirmPassword: true });
      setError(t('change_password.errors.check_form' as any));
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(t('change_password.success'));
      navigate('/user-profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate('/user-profile')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('change_password.back_profile')}
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-amber-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{t('change_password.title')}</h1>
              <p className="text-gray-600 mt-2">
                {t('change_password.desc')}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('change_password.current_label')}
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onBlur={() => handleBlur('currentPassword', currentPassword)}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    if (touched.currentPassword) validateField('currentPassword', e.target.value);
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all ${touched.currentPassword && fieldErrors.currentPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  required
                />
                {touched.currentPassword && fieldErrors.currentPassword && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.currentPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('change_password.new_label')}
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onBlur={() => handleBlur('newPassword', newPassword)}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (touched.newPassword) validateField('newPassword', e.target.value);
                    if (touched.confirmPassword) validateField('confirmPassword', confirmPassword, e.target.value);
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all ${touched.newPassword && fieldErrors.newPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  required
                />
                {touched.newPassword && fieldErrors.newPassword ? (
                  <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.newPassword}</p>
                ) : (
                  <p className="mt-1 text-xs text-gray-500">
                    {t('change_password.new_hint')}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('change_password.confirm_label')}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onBlur={() => handleBlur('confirmPassword', confirmPassword)}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (touched.confirmPassword) validateField('confirmPassword', e.target.value, newPassword);
                  }}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all ${touched.confirmPassword && fieldErrors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  required
                />
                {touched.confirmPassword && fieldErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.confirmPassword}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-amber-600 text-white py-2.5 px-4 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t('change_password.updating')}
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      {t('change_password.update_btn')}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}