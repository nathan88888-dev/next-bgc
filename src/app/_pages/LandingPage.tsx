import { Link } from 'react-router';
import { Users, MapPin, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { useI18nStore } from '@/stores/i18n';

export function LandingPage() {
  const { t } = useI18nStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative min-h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1759868937448-423d3c7c8133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2FyZCUyMGdhbWUlMjBncm91cCUyMGNhc3VhbHxlbnwxfHx8fDE3NjkxMzU2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="People playing board games"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{t('landing.pill_badge')}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {t('landing.headline_1')}
              <br />
              <span className="text-amber-400">{t('landing.headline_2')}</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10 drop-shadow-md">
              {t('landing.subtext')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/groups"
                className="px-8 py-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>{t('landing.find_groups_btn')}</span>
              </Link>
              <Link
                to="/submit-group"
                className="px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg border-2 border-gray-200 shadow-lg"
              >
                {t('landing.submit_group_btn')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('landing.features.location.title')}</h3>
            <p className="text-gray-600">{t('landing.features.location.desc')}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('landing.features.preferences.title')}</h3>
            <p className="text-gray-600">{t('landing.features.preferences.desc')}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('landing.features.verified.title')}</h3>
            <p className="text-gray-600">{t('landing.features.verified.desc')}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl p-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">500+</div>
              <div className="text-gray-600">{t('landing.stats.groups')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">50+</div>
              <div className="text-gray-600">{t('landing.stats.cities')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">10K+</div>
              <div className="text-gray-600">{t('landing.stats.members')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-amber-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.cta.title')}</h2>
          <p className="text-xl text-amber-50 mb-8 max-w-2xl mx-auto">{t('landing.cta.text')}</p>
          <Link
            to="/groups"
            className="inline-block px-8 py-4 bg-white text-amber-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg shadow-lg"
          >
            {t('landing.cta.btn')}
          </Link>
        </div>
      </div>
    </div>
  );
}