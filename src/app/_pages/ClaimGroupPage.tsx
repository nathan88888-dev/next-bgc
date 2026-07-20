import { useState, useEffect } from 'react';
import { Upload, Search, X, FileText, Mail, Shield } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router';
import { useUser } from '@/app/context/UserContext';
import { useGroups } from '@/app/context/GroupContext';
import { useI18nStore } from '@/stores/i18n';

export function ClaimGroupPage() {
  const { t } = useI18nStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { role, user } = useUser();
  const { groups, claimGroup } = useGroups();
  const groupIdFromUrl = searchParams.get('groupId');
  const selectedGroupData = groups.find((g) => g.id === (groupIdFromUrl || ''));

  useEffect(() => {
    if (role === 'guest') {
      navigate('/signin');
    }
  }, [role, navigate]);
  
  const [formData, setFormData] = useState({
    selectedGroup: groupIdFromUrl || '',
    relationship: '',
    relationshipOther: '',
    additionalDetails: '',
    verificationFile: null as File | null,
    groupEmail: '',
    agreement: false,
    noteToAdmin: '',
  });

  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>(''); // 'image' or 'document'
  const [searchQuery, setSearchQuery] = useState('');

  // Get only unclaimed groups
  const unclaimedGroups = groups.filter((group) => !group.isClaimed);

  // Filter groups based on search query
  const filteredGroups = searchQuery
    ? unclaimedGroups.filter(
        (group) =>
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.location.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : unclaimedGroups;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, verificationFile: file });
      
      if (file.type.startsWith('image/')) {
        setFileType('image');
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setFileType('document');
        setFilePreview(file.name);
      }
    }
  };

  const removeFile = () => {
    setFormData({ ...formData, verificationFile: null });
    setFilePreview(null);
    setFileType('');
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && formData.selectedGroup) {
      // In a real app, we would upload the file and send all the form data to the backend.
      // For this demo, we just trigger the context action.
      claimGroup(formData.selectedGroup, user.name); 
      setIsSubmitted(true);
      // Success alert is handled by the result page
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('claim_group_page.messages.success_title')}</h2>
          <p className="text-gray-600 mb-8">
            {t('claim_group_page.messages.success_desc', { 
                group: selectedGroupData?.name || '',
                email: user?.email || ''
             })}
          </p>
          <button
            onClick={() => navigate('/profile')}
            className="w-full py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-all shadow-lg shadow-amber-200"
          >
            {t('claim_group_page.messages.success_btn')}
          </button>
          <p className="mt-6 text-sm text-gray-400">
            {t('claim_group_page.messages.resend', { 
                btn: ""
             })} <button key="resend" className="text-amber-600 font-bold hover:underline">{t('claim_group_page.messages.resend_btn')}</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {t('claim_group_page.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('claim_group_page.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Section 1: Link to Group */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              1. {t('claim_group_page.sections.link.title')}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t('claim_group_page.sections.link.search_label')}
                </label>
                <div className="relative mb-3">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('claim_group_page.sections.link.search_placeholder')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <select
                  required
                  value={formData.selectedGroup}
                  onChange={(e) => setFormData({ ...formData, selectedGroup: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                >
                  <option value="">{t('claim_group_page.sections.link.select_placeholder')}</option>
                  {filteredGroups.length > 0 ? (
                    filteredGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name} - {group.location.city}, {group.location.state}
                      </option>
                    ))
                  ) : (
                    <option disabled>{t('admin.empty.no_groups')}</option>
                  )}
                </select>
              </div>

              {/* Show selected group info */}
              {selectedGroupData && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex gap-4">
                    <img
                      src={selectedGroupData.coverImage}
                      alt={selectedGroupData.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{selectedGroupData.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{selectedGroupData.description}</p>
                      <p className="text-sm text-gray-500">
                        {selectedGroupData.location.city}, {selectedGroupData.location.state}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Ownership Proof */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              2. {t('claim_group_page.sections.proof.title')}
            </h2>

            <div className="space-y-6">
              <p className="text-sm text-gray-600">
                {t('claim_group_page.sections.proof.desc')}
              </p>

              {/* Relationship */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t('claim_group_page.sections.proof.role_label')}
                </label>
                <select
                  required
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                >
                  <option value="">{t('claim_group_page.sections.proof.role_select')}</option>
                  <option value="Founder">{t('nav.roles.founder')}</option>
                  <option value="Organizer">{t('nav.roles.organizer')}</option>
                  <option value="Admin">{t('nav.roles.admin')}</option>
                  <option value="Moderator">{t('nav.roles.moderator')}</option>
                  <option value="Member">{t('nav.roles.member')}</option>
                  <option value="Other">{t('enums.group_type.Other')}</option>
                </select>
                
                {formData.relationship === 'Other' && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {t('admin.reason')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.relationshipOther}
                      onChange={(e) => setFormData({ ...formData, relationshipOther: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="e.g. Event Coordinator, Regional Manager"
                    />
                  </div>
                )}
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t('claim_group_page.sections.proof.profile_label')}
                </label>
                <textarea
                  required
                  value={formData.additionalDetails}
                  onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={t('claim_group_page.sections.proof.profile_desc')}
                />
              </div>

              {/* Proof of Relationship */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {t('claim_group_page.sections.proof.screenshot_label')}
                </label>
                <p className="text-sm text-gray-500 mb-3">
                  {t('claim_group_page.sections.proof.screenshot_desc')}
                </p>
                {filePreview ? (
                  <div className="relative">
                    {fileType === 'image' ? (
                      <img
                        src={filePreview}
                        alt="Verification proof"
                        className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
                      />
                    ) : (
                      <div className="flex items-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <FileText className="w-8 h-8 text-amber-500 mr-3" />
                        <span className="font-medium text-gray-900 truncate">{filePreview}</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={removeFile}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 hover:bg-gray-50 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">{t('claim_group_page.sections.proof.upload_text')}</span>
                    <span className="text-xs text-gray-400 mt-1">{t('claim_group_page.sections.proof.upload_subtext')}</span>
                    <input
                      type="file"
                      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      required
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Verification Agreement */}
          <div className="mb-10">
            <div className="space-y-6 mb-10">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">{t('submit_group.sections.note.note_label')}</label>
                <textarea
                  value={formData.noteToAdmin}
                  onChange={(e) => setFormData({ ...formData, noteToAdmin: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder={t('submit_group.sections.note.note_placeholder')}
                />
              </div>

              {/* 2.3.5 CAPTCHA Placeholder */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">{t('submit_group.sections.security.title')}</label>
                <div className="w-full h-[74px] bg-gray-50 border border-gray-200 rounded-xl flex items-center px-4 gap-4 group hover:border-amber-500 transition-all cursor-pointer">
                  <div className="w-8 h-8 rounded-full border-4 border-amber-500 border-t-transparent animate-spin opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-700">{t('submit_group.sections.security.provider')}</p>
                    <p className="text-xs text-gray-500">{t('submit_group.sections.security.verifying')}</p>
                  </div>
                  <Shield className="w-5 h-5 text-gray-300" />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              3. {t('claim_group_page.sections.agreement.title')}
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreement"
                  required
                  checked={formData.agreement}
                  onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
                  className="mt-1 w-5 h-5 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="agreement" className="text-sm text-gray-700">
                  {t('claim_group_page.sections.agreement.checkbox_text')}
                </label>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>{t('claim_group_page.sections.agreement.next_title')}</strong> {t('claim_group_page.sections.agreement.next_text')}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {t('claim_group_page.actions.cancel')}
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
            >
              {t('claim_group_page.actions.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}