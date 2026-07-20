import { Link } from 'react-router';
import { Ghost, Home, Search, ArrowLeft } from 'lucide-react';
import { useI18nStore } from '@/stores/i18n';

export function NotFoundPage() {
  const { t } = useI18nStore();
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="text-[200px] font-black tracking-tighter">404</span>
          </div>
          <div className="relative flex justify-center">
            <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center animate-bounce">
              <Ghost className="w-16 h-16 text-amber-600" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
          {t('not_found.title')}
        </h1>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          {t('not_found.desc')}
        </p>

        <div className="grid grid-cols-1 gap-4">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 text-white rounded-2xl font-bold shadow-lg shadow-amber-200 hover:bg-amber-600 transition-all hover:-translate-y-1 active:scale-95"
          >
            <Home className="w-5 h-5" />
            {t('not_found.back_home')}
          </Link>
          
          <Link
            to="/directory"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-200 transition-all"
          >
            <Search className="w-5 h-5 text-amber-500" />
            {t('not_found.browse_directory')}
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('not_found.go_back')}
          </button>
        </div>
      </div>
    </div>
  );
}
