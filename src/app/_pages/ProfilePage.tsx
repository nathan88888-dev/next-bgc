import { useUser } from '@/app/context/UserContext';
import { useGroups } from '@/app/context/GroupContext';
import { User as UserIcon, Mail, Shield, MapPin, Calendar, Heart, Key, ChevronRight, Settings, Clock, AlertTriangle, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { BGCGroup } from '@/services/types';
import { Link } from 'react-router';
import { useI18nStore } from '@/stores/i18n';

function CompactGroupItem({ group, currentUserName }: { group: BGCGroup, currentUserName: string }) {
  const { t } = useI18nStore();
  const isPendingClaim = group.pendingOwnerId === currentUserName;
  const isRejected = group.status === 'rejected';
  const isPendingApproval = !group.isActive && !isRejected;

  return (
    <Link 
      to={`/groups/${group.location.state?.toLowerCase().replace(/ /g, '-') || 'unknown'}/${group.location.city?.toLowerCase().replace(/ /g, '-') || 'unknown'}/${group.slug}`}
      className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-amber-300 hover:shadow-sm transition-all group"
    >
      <img 
        src={group.coverImage} 
        alt={group.name} 
        className="w-12 h-12 rounded-lg object-cover bg-gray-100"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-gray-900 truncate group-hover:text-amber-600 transition-colors">
            {group.name}
          </h4>
          
          {isRejected && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-medium border border-red-200">
              <AlertTriangle className="w-3 h-3" />
              {t('profile.status.rejected')}
            </span>
          )}
          
          {isPendingApproval && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-medium border border-amber-200">
              <Clock className="w-3 h-3" />
              {t('profile.status.pending')}
            </span>
          )}

          {isPendingClaim && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs font-medium border border-purple-200">
              <BadgeCheck className="w-3 h-3" />
              {t('profile.status.claim_pending')}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{group.location.city}, {group.location.state}</span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500" />
    </Link>
  );
}

export function ProfilePage() {
  const { user, role, followedGroups } = useUser();
  const { groups } = useGroups();
  const { t } = useI18nStore();
  const [activeTab, setActiveTab] = useState<'groups' | 'followed'>('groups');

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('profile.access_denied')}</h2>
          <p className="text-gray-600">{t('profile.signin_prompt')}</p>
        </div>
      </div>
    );
  }

  const followedGroupsList = groups.filter(g => followedGroups.includes(g.id));
  
  // Show groups if:
  // 1. I am the organizer (and it's not a pending claim by someone else... wait, organizer changes on approval. So if I submitted it, I am organizer).
  // 2. I have a pending claim on it.
  const ownedGroups = groups.filter(g => 
    g.organizer === user.id || g.pendingOwnerId === user.id
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-amber-400 to-amber-600"></div>
          
          <div className="px-8 pb-8">
            <div className="relative flex items-end -mt-12 mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-white flex items-center justify-center text-gray-400">
                <UserIcon className="w-12 h-12" />
              </div>
              <div className="ml-6 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Shield className="w-4 h-4 text-amber-500" />
                  <span className="capitalize">{t(`nav.roles.${role}`)}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {/* User Info & Security Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                    {t('profile.contact_info')}
                  </h3>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{/* Fallback to unknown location since Profiles table doesn't have it */}
                        {t('profile.united_states')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span>{t('profile.joined_at', { date: (user as any).joinedDate || t('profile.default_joined_date') })}</span>
                    </div>
                  </div>
                </div>

                {/* Account Security */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                    {t('profile.account_security')}
                  </h3>
                  <div className="space-y-3">
                    <Link
                      to="/change-password"
                      className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-300 rounded-lg transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-md shadow-sm group-hover:text-amber-600">
                          <Key className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-amber-900">{t('profile.change_password')}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500" />
                    </Link>
                    <Link
                      to="/settings"
                      className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-300 rounded-lg transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-md shadow-sm group-hover:text-amber-600">
                          <Settings className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-amber-900">{t('profile.account_settings')}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tabs & Content */}
              <div className="pt-4">
                <div className="border-b border-gray-200 mb-6">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => setActiveTab('groups')}
                      className={`${
                        activeTab === 'groups'
                          ? 'border-amber-500 text-amber-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                    >
                      <UserIcon className="w-4 h-4" />
                      {t('profile.my_groups_tab')}
                    </button>
                    <button
                      onClick={() => setActiveTab('followed')}
                      className={`${
                        activeTab === 'followed'
                          ? 'border-amber-500 text-amber-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                    >
                      <Heart className="w-4 h-4" />
                      {t('profile.followed_groups_tab')}
                    </button>
                  </nav>
                </div>

                {activeTab === 'groups' ? (
                  <div className="space-y-4">
                    {ownedGroups.length > 0 ? (
                      <div className="grid gap-3">
                        {ownedGroups.map(group => (
                          <CompactGroupItem key={group.id} group={group} currentUserName={user.name} />
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <Shield className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">{t('profile.no_owned_groups')}</p>
                        <Link to="/submit-group" className="mt-4 inline-block px-4 py-2 text-sm text-amber-600 font-medium hover:text-amber-700">
                          {t('profile.submit_group')}
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {followedGroupsList.length > 0 ? (
                      <div className="grid gap-3">
                        {followedGroupsList.map(group => (
                          <CompactGroupItem key={group.id} group={group} currentUserName={user.name} />
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <Heart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">{t('profile.no_followed_groups')}</p>
                        <Link to="/groups" className="mt-4 inline-block px-4 py-2 text-sm text-amber-600 font-medium hover:text-amber-700">
                          {t('profile.browse_directory')}
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}