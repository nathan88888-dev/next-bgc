"use client";

import { Link, useLocation, useNavigate } from 'react-router';
import { Users, MapPin, Menu, ChevronDown, LogOut, User, Settings, Shield } from 'lucide-react';
import { useState } from 'react';
import { useUser, UserRole } from '@/app/context/UserContext';
import { config } from '@/services/config';
import { useI18nStore, Locale } from '@/stores/i18n';
import { Languages } from 'lucide-react';

export function Navigation() {
  const { t, locale, setLocale } = useI18nStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { role, setRole, user } = useUser();

  const changeLanguage = (lng: string) => {
    setLocale(lng as Locale);
    setLangOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: t('nav.home'), icon: Users },
    { path: '/groups', label: t('nav.directory'), icon: MapPin },
  ];

  const RoleSimulator = () => (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200 mr-4">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('nav.roles.view_as')}</span>
      <div className="relative">
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value as UserRole)}
          className="appearance-none bg-transparent border-none text-sm font-medium text-slate-900 focus:ring-0 cursor-pointer pr-4 pl-1"
        >
          <option value="guest">{t('nav.roles.guest')}</option>
          <option value="user">{t('nav.roles.user')}</option>
          <option value="moderator">{t('nav.roles.moderator')}</option>
          <option value="admin">{t('nav.roles.admin')}</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </div>
      </div>
    </div>
  );

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900 hidden sm:block">BGC Directory</span>
            <span className="text-xl font-semibold text-gray-900 sm:hidden">BGC</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`w-28 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    active
                      ? 'bg-amber-50 text-amber-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section: Simulator & Auth */}
          <div className="hidden md:flex items-center">
            {/* Language Selector */}
            <div className="relative mr-4">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                title="Change Language"
              >
                <Languages className="w-5 h-5 text-gray-500" />
                <span className="uppercase text-xs font-bold text-gray-500">{locale}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                  <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-100">
                    <button onClick={() => changeLanguage('en')} className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 ${locale === 'en' ? 'text-amber-600 font-semibold bg-amber-50' : 'text-gray-700'}`}>English</button>
                    <button onClick={() => changeLanguage('es')} className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 ${locale === 'es' ? 'text-amber-600 font-semibold bg-amber-50' : 'text-gray-700'}`}>Español</button>
                    <button onClick={() => changeLanguage('zh')} className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 ${locale === 'zh' ? 'text-amber-600 font-semibold bg-amber-50' : 'text-gray-700'}`}>简体中文</button>
                    <button onClick={() => changeLanguage('ja')} className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 ${locale === 'ja' ? 'text-amber-600 font-semibold bg-amber-50' : 'text-gray-700'}`}>日本語</button>
                  </div>
                </>
              )}
            </div>
            {/* Role Simulator */}
            {config.useMock && <RoleSimulator />}

            {role === 'guest' ? (
              <Link 
                to="/signin"
                className="w-32 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium inline-block text-center"
              >
                {t('nav.login')}
              </Link>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-right hidden lg:block">
                    <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                    <div className="text-xs text-gray-500">{role === 'admin' ? t('nav.roles.administrator') : t('nav.roles.member')}</div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 border border-amber-200">
                    <User className="w-5 h-5" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setProfileOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 animate-in fade-in zoom-in-95 duration-100">
                      <div className="px-4 py-3 border-b border-gray-100 lg:hidden">
                        <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                        <div className="text-xs text-gray-500">{user?.email}</div>
                      </div>
                      
                      <Link to="/user-profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <User className="w-4 h-4" />
                        {t('nav.profile')}
                      </Link>
                      
                      {role === 'admin' && (
                        <Link to="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          <Shield className="w-4 h-4" />
                          {t('nav.admin_dashboard')}
                        </Link>
                      )}
                      
                      <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Settings className="w-4 h-4" />
                        {t('nav.settings')}
                      </Link>
                      
                      <div className="border-t border-gray-100 my-1"></div>
                      
                      <button 
                        onClick={() => {
                          setProfileOpen(false);
                          setRole('guest');
                          if (window.history.length > 1) {
                            navigate(-1);
                          } else {
                            navigate('/', { replace: true });
                          }
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('nav.logout')}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {/* Mobile Language Selector */}
            <div className="mb-4 pb-4 border-b border-gray-100">
               <div className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Select Language:</div>
               <div className="grid grid-cols-2 gap-2">
                 <button onClick={() => changeLanguage('en')} className={`px-4 py-2 text-xs rounded-lg font-bold border ${locale === 'en' ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>ENGLISH</button>
                 <button onClick={() => changeLanguage('es')} className={`px-4 py-2 text-xs rounded-lg font-bold border ${locale === 'es' ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>ESPAÑOL</button>
                 <button onClick={() => changeLanguage('zh')} className={`px-4 py-2 text-xs rounded-lg font-bold border ${locale === 'zh' ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>中文</button>
                 <button onClick={() => changeLanguage('ja')} className={`px-4 py-2 text-xs rounded-lg font-bold border ${locale === 'ja' ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-gray-50 text-gray-600 border-gray-100'}`}>日本語</button>
               </div>
            </div>

            {/* Mobile Role Simulator */}
            {config.useMock && (
              <div className="mb-4 pb-4 border-b border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">{t('nav.roles.view_as')}</span>
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-lg">
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="bg-transparent border-none text-sm font-medium text-slate-900 focus:ring-0 p-0"
                  >
                    <option value="guest">{t('nav.roles.guest')}</option>
                    <option value="user">{t('nav.roles.user')}</option>
                    <option value="moderator">{t('nav.roles.moderator')}</option>
                    <option value="admin">{t('nav.roles.admin')}</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                      active
                        ? 'bg-amber-50 text-amber-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t border-gray-200 space-y-2">
                {role === 'guest' ? (
                  <Link 
                    to="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium block text-center"
                  >
                    {t('nav.login')}
                  </Link>
                ) : (
                  <>
                     <div className="flex items-center gap-3 px-4 py-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 border border-amber-200">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user?.name}</div>
                        <div className="text-xs text-gray-500">{user?.email}</div>
                      </div>
                    </div>
                    <Link to="/user-profile" className="w-full flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                      <User className="w-5 h-5" />
                      {t('nav.profile')}
                    </Link>
                    {role === 'admin' && (
                      <Link to="/admin" className="w-full flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                        <Shield className="w-5 h-5" />
                        {t('nav.admin_dashboard')}
                      </Link>
                    )}
                    <Link to="/settings" className="w-full flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
                      <Settings className="w-5 h-5" />
                      {t('nav.settings')}
                    </Link>
                    <button 
                      onClick={() => {
                        setRole('guest');
                        setMobileMenuOpen(false);
                        if (window.history.length > 1) {
                          navigate(-1);
                        } else {
                          navigate('/', { replace: true });
                        }
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <LogOut className="w-5 h-5" />
                      {t('nav.logout')}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}