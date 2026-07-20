import { useUser, User, UserRole, UserStatus } from '@/app/context/UserContext';
import { useGroups } from '@/app/context/GroupContext';
import { Shield, Users, CheckCircle2, UserPlus, Clock, XCircle, Check, Flag, MessageSquare, Search, Trash2, Edit, Ban, Unlock, User as UserIcon, Mail, Lock, AlertCircle, Chrome, Facebook, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { BGCGroup, Report } from '@/services/types';
import { useI18nStore } from '@/stores/i18n';

export function AdminDashboardPage() {
  const { role, users, updateUser, deleteUser, banUser, unbanUser } = useUser();
  const { groups, reports, approveGroup, rejectGroup, approveClaim, rejectClaim, updateReportStatus, deleteGroup } = useGroups();
  const navigate = useNavigate();
  const { t } = useI18nStore();
  
  const [activeTab, setActiveTab] = useState<'approvals' | 'claims' | 'reports' | 'groups' | 'users'>('approvals');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Edit User Modal State
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  
  // Rejection Modal State
  const [rejectingItem, setRejectingItem] = useState<{ id: string, type: 'group' | 'claim' } | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);

  // Derived lists
  const pendingGroups = groups.filter((g: BGCGroup) => !g.isActive && g.status !== 'rejected');
  const pendingClaims = groups.filter((g: BGCGroup) => g.pendingOwnerId);
  const pendingReports = reports.filter((r: Report) => r.status === 'pending');


  // Filtered Lists for Management Tabs
  const filteredGroups = groups.filter((g: BGCGroup) => 
    (g.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
    (g.location?.city?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );


  const filteredUsers = users.filter(u => 
    (u.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
    (u.email?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleEditGroup = (groupId: string) => {
    navigate(`/submit-group?edit=true&groupId=${groupId}`);
  };

  const handleDeleteGroup = (groupId: string) => {
    if (confirm(t('admin.confirms.delete_group'))) {
      deleteGroup(groupId);
      toast.success(t('admin.messages.group_deleted'));
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditUserModalOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id, {
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        status: editingUser.status
      });
      setIsEditUserModalOpen(false);
      setEditingUser(null);
      toast.success(t('admin.messages.user_updated'));
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm(t('admin.confirms.delete_user'))) {
      deleteUser(userId);
      toast.success(t('admin.messages.user_deleted'));
    }
  };

  const handleToggleBanUser = (user: User) => {
    if (user.status === 'banned') {
      unbanUser(user.id);
      toast.success(t('admin.messages.user_unbanned', { name: user.name }));
    } else {
      if (confirm(t('admin.confirms.ban_user', { name: user.name }))) {
        banUser(user.id);
        toast.error(t('admin.messages.user_banned', { name: user.name }));
      }
    }
  };

  const openRejectionModal = (id: string, type: 'group' | 'claim') => {
    setRejectingItem({ id, type });
    setRejectionReason('');
    setIsRejectionModalOpen(true);
  };

  const handleConfirmRejection = () => {
    if (!rejectingItem) return;
    
    if (rejectingItem.type === 'group') {
      rejectGroup(rejectingItem.id);
      toast.error(t('admin.messages.group_rejected'));
    } else {
      rejectClaim(rejectingItem.id);
      toast.error(t('admin.messages.claim_rejected'));
    }
    
    setIsRejectionModalOpen(false);
    setRejectingItem(null);
  };

  if (role !== 'admin') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('admin.access_denied_title')}</h2>
          <p className="text-gray-600">{t('admin.access_denied_text')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('admin.title')}</h1>
            <p className="text-gray-600">{t('admin.subtitle')}</p>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
            {t('admin.access_badge')}
          </span>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {[
                { id: 'approvals', label: t('admin.tabs.pending'), icon: Clock, count: pendingGroups.length, color: 'amber' },
                { id: 'claims', label: t('admin.tabs.claims'), icon: UserPlus, count: pendingClaims.length, color: 'purple' },
                { id: 'reports', label: t('admin.tabs.reports'), icon: Flag, count: pendingReports.length, color: 'red' },
                { id: 'groups', label: t('admin.tabs.groups'), icon: Users, count: groups.length, color: 'blue' },
                { id: 'users', label: t('admin.tabs.users'), icon: Shield, count: users.length, color: 'green' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSearchQuery('');
                  }}
                  className={`flex-1 min-w-[160px] py-4 px-4 text-center border-b-2 font-medium text-sm flex items-center justify-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? `border-${tab.color}-500 text-${tab.color}-600`
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`bg-${tab.color}-100 text-${tab.color}-800 py-0.5 px-2 rounded-full text-xs ml-1`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-0">
            {/* Search Bar for Management Tabs */}
            {(activeTab === 'groups' || activeTab === 'users') && (
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder={t('admin.search_placeholder', { tab: activeTab })}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            )}

            {activeTab === 'approvals' && (
              <div className="divide-y divide-gray-100">
                {pendingGroups.length > 0 ? (
                  pendingGroups.map(group => (
                    <div key={group.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <img 
                          src={group.coverImage} 
                          alt={group.name} 
                          className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 text-lg">{(group as any).name}</h3>
                          <p className="text-sm text-gray-500 mb-1">{(group as any).location.city}, {(group as any).location.state}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{t('admin.submitted_by')}: {(group as any).organizer}</span>
                            <span>•</span>
                            <span>{new Date().toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => window.open(`/groups/${group.id}`, '_blank')}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          {t('admin.actions.review')}
                        </button>
                        <button 
                          onClick={() => openRejectionModal(group.id, 'group')}
                          className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          {t('admin.actions.reject')}
                        </button>
                        <button 
                          onClick={() => approveGroup(group.id)}
                          className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          {t('admin.actions.approve')}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{t('admin.empty.approvals')}</h3>
                    <p className="text-gray-500 mt-1">{t('admin.empty.approvals_text')}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'claims' && (
              <div className="divide-y divide-gray-100">
                {pendingClaims.length > 0 ? (
                  pendingClaims.map(group => (
                    <div key={group.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <img 
                          src={group.coverImage} 
                          alt={group.name} 
                          className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 text-lg">{group.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500">{t('admin.current_owner')}: {(group as any).isClaimed ? (group as any).organizer : t('admin.unclaimed')}</span>
                            <span className="text-gray-300">→</span>
                            <span className="text-sm font-medium text-purple-700">{t('admin.claimant')}: {(group as any).pendingOwnerId}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => openRejectionModal(group.id, 'claim')}
                          className="px-4 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          {t('admin.actions.reject')}
                        </button>
                        <button 
                          onClick={() => approveClaim(group.id, (group as any).pendingOwnerId!)}
                          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          {t('admin.actions.approve')}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-50 mb-4">
                      <UserPlus className="w-8 h-8 text-purple-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{t('admin.empty.claims')}</h3>
                    <p className="text-gray-500 mt-1">{t('admin.empty.claims_text')}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="divide-y divide-gray-100">
                {pendingReports.length > 0 ? (
                  pendingReports.map(report => (
                    <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-red-100 text-red-600 rounded-lg mt-1">
                            <Flag className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-gray-900 text-lg">{report.reason}</h3>
                              <span className="text-sm text-gray-400">•</span>
                              <Link to={`/groups/${(report as any).groupId}`} className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                                {(report as any).groupName}
                              </Link>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{t('admin.reporter')}: {report.reporterEmail || t('admin.anonymous')}</span>
                              <span>•</span>
                              <span>{report.date ? new Date(report.date).toLocaleDateString() : t('admin.no_date')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => updateReportStatus(report.id, 'dismissed')}
                            className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            {t('admin.actions.ignore')}
                          </button>
                          <button 
                            onClick={() => updateReportStatus(report.id, 'resolved')}
                            className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            {t('admin.actions.resolve')}
                          </button>
                        </div>
                      </div>
                      
                      <div className="ml-14 p-4 bg-gray-50 rounded-lg text-gray-700 text-sm border border-gray-100 flex gap-3">
                        <MessageSquare className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <p>{report.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{t('admin.empty.reports')}</h3>
                    <p className="text-gray-500 mt-1">{t('admin.empty.reports_text')}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'groups' && (
              <div className="divide-y divide-gray-100">
                {filteredGroups.length > 0 ? (
                   filteredGroups.map(group => (
                    <div key={group.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <img 
                          src={group.coverImage} 
                          alt={group.name} 
                          className="w-12 h-12 rounded-lg object-cover bg-gray-200"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{(group as any).name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{(group as any).location.city}, {(group as any).location.state}</span>
                            <span>•</span>
                            <span className={(group as any).isActive ? 'text-green-600' : 'text-amber-600'}>
                             {(group as any).isActive ? t('admin.group_status_active') : t('admin.group_status_pending')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditGroup(group.id)}
                            className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title={t('admin.tooltips.edit_group')}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteGroup(group.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title={t('admin.tooltips.delete_group')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-gray-500">
                    {t('admin.empty.no_groups')}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div className="divide-y divide-gray-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(userItem => (
                    <div key={userItem.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          <UserIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{userItem.name || 'No Name'}</h3>
                            {userItem.status === 'banned' && (
                              <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full font-medium">{t('admin.user_badge_banned')}</span>
                            )}
                            {userItem.role === 'admin' && (
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">{t('admin.user_badge_admin')}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{userItem.email || 'No Email'}</p>
                        </div>
                      </div>
                          <button 
                            onClick={() => handleEditUser(userItem)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title={t('admin.tooltips.edit_user')}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleToggleBanUser(userItem)}
                            className={`p-2 rounded-lg transition-colors ${
                              userItem.status === 'banned' 
                                ? 'text-green-600 hover:bg-green-50' 
                                : 'text-orange-600 hover:bg-orange-50'
                            }`}
                            title={userItem.status === 'banned' ? t('admin.tooltips.unban_user') : t('admin.tooltips.ban_user')}
                          >
                            {userItem.status === 'banned' ? <Unlock className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(userItem.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title={t('admin.tooltips.delete_user')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-gray-500">
                    {t('admin.empty.no_users')}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {isEditUserModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">{t('admin.edit_user_title')}</h2>
              <button 
                onClick={() => setIsEditUserModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveUser}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.name_label')}</label>
                  <input
                    type="text"
                    required
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.email_label')}</label>
                  <input
                    type="email"
                    required
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.role_label')}</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                  >
                    <option value="guest">{t('admin.user_role_guest')}</option>
                    <option value="user">{t('admin.user_role_user')}</option>
                    <option value="admin">{t('admin.user_role_admin')}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('admin.status_label')}</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as UserStatus })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                  >
                    <option value="active">{t('admin.user_status_active')}</option>
                    <option value="banned">{t('admin.user_status_banned')}</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsEditUserModalOpen(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {t('admin.actions.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  {t('admin.actions.save_changes')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Rejection Reason Modal */}
      {isRejectionModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{t('admin.rejection_modal_title')}</h2>
            <p className="text-sm text-gray-500 mb-6">
              {t('admin.rejection_modal_text', { type: rejectingItem?.type || '' })}
            </p>
            
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder={t('admin.rejection_modal_placeholder')}
              className="w-full h-32 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-50 resize-none text-sm font-medium"
            />

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setIsRejectionModalOpen(false)}
                className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                {t('admin.actions.cancel')}
              </button>
              <button
                onClick={handleConfirmRejection}
                disabled={!rejectionReason.trim()}
                className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-all disabled:opacity-50"
              >
                {t('admin.actions.confirm_rejection')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}