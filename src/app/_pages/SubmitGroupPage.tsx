import { useState, useEffect } from 'react';
import { Upload, X, Loader2, MapPin, Globe, Lock, Link, Plus, Trash2, Mail, MessageCircle, Facebook, Twitter, Instagram, Gamepad2, Phone, Send, Megaphone, AlertTriangle, Info, CheckCircle2, Shield } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router';
import { useGroups } from '@/app/context/GroupContext';
import { useUser, User, UserRole, UserStatus } from '@/app/context/UserContext';
import { BGCGroup } from '@/services/types';
import { useI18nStore } from '@/stores/i18n';
import { CoverImageUpload } from '@/app/components/coverUpload/CoverImageUpload';
import { isValidEmail, isValidUrl, isPresent, isValidFacebookUrl, isValidMeetupUrl, isValidDiscordId } from '@/utils/validators';

export function SubmitGroupPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { groups, addGroup, updateGroup } = useGroups();
  const { t } = useI18nStore();
  const isEditMode = searchParams.get('edit') === 'true';
  const editGroupId = searchParams.get('groupId');

  const [formData, setFormData] = useState({
    groupName: '',
    catchline: '',
    description: '',
    coverImage: null as File | null,
    bannerImage: null as File | null,
    zipCode: '',
    city: '',
    state: '',
    neighborhood: '',
    primaryVenue: '',
    privacy: 'Public', // Default
    groupType: 'Board Game Group', // Default
    experienceLevel: 'All Levels', // Default
    meetingFrequency: 'Weekly', // Default
    playstyle: [] as string[],
    languages: [] as string[],
    links: {} as Record<string, string>,
    meetupPrivacy: 'Public' as 'Public' | 'Private',
    noteToAdmin: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: any) => {
    let err = '';
    if (name === 'groupName') {
      if (!isPresent(value)) err = 'Group name is required';
    } else if (name === 'description') {
      if (!isPresent(value)) err = 'Description is required';
    } else if (name === 'zipCode') {
      if (!isPresent(value)) err = 'ZIP code is required';
      else if (value.length !== 5) err = 'ZIP code must be 5 digits';
    } else if (name.startsWith('link_')) {
      const platform = name.replace('link_', '');
      if (value) {
        if (platform === 'email' && !isValidEmail(value)) err = 'Invalid email';
        else if (platform === 'facebook' && !isValidFacebookUrl(value)) err = 'Invalid Facebook URL';
        else if (platform === 'meetup' && !isValidMeetupUrl(value)) err = 'Invalid Meetup URL';
        else if (platform === 'discord' && !isValidDiscordId(value)) err = 'Invalid Discord Server ID';
        else if (['website', 'whatsapp', 'bgg', 'reddit', 'instagram', 'telegram', 'warhorn', 'twitter', 'aftergame'].includes(platform) && !isValidUrl(value)) err = 'Invalid URL';
      }
    }
    
    setFieldErrors(prev => ({ ...prev, [name]: err }));
    return !err;
  };

  const handleBlur = (name: string, value: any) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const connectionOptions = [
    { id: 'website', icon: Globe },
    { id: 'discord', icon: MessageCircle },
    { id: 'facebook', icon: Facebook },
    { id: 'meetup', icon: Link },
    { id: 'email', icon: Mail },
    { id: 'whatsapp', icon: Phone },
    { id: 'bgg', icon: Gamepad2 },
    { id: 'reddit', icon: MessageCircle },
    { id: 'instagram', icon: Instagram },
    { id: 'telegram', icon: Send },
    { id: 'warhorn', icon: Link },
    { id: 'twitter', icon: Twitter },
    { id: 'aftergame', icon: Gamepad2 },
  ];

  const [charCount, setCharCount] = useState(0);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const languageOptions = [
    { id: 'ebabc61d-0278-4262-88f6-083f301dc70f', name: 'English' },
    { id: 'cd0d91ac-63bf-4a4f-b7c1-da88e817d860', name: 'Chinese' },
    { id: '0555a505-4f6f-45be-b48a-6f3769ef3b9a', name: 'Spanish' },
    { id: 'ccba05e8-8457-47ba-902b-54748d614368', name: 'Japanese' },
  ];

  useEffect(() => {
    if (isEditMode && editGroupId) {
      const ownedGroups = groups.filter((g: BGCGroup) =>
        g.organizer === user?.name || g.pendingOwnerId === user?.name
      );
      const group = groups.find((g: BGCGroup) => g.id === editGroupId);

      if (group) {
        const methods = ['Discord', 'WhatsApp', 'Other'] as const;
        const contactMethods = connectionOptions.reduce((acc: Record<string, string>, option) => {
          const linkValue = group.contactMethods?.find(method => method === option.id)
            ? (option.id === 'email' ? 'contact@example.com' : `https://${option.id}.com/example`) // Placeholder for existing links
            : '';
          acc[option.id] = linkValue;
          return acc;
        }, {});

        setFormData({
          groupName: group.name,
          catchline: group.catchline || '',
          description: group.description,
          coverImage: null,
          bannerImage: null,
          zipCode: group.location.zipCode || '',
          city: group.location.city,
          state: group.location.state,
          neighborhood: '',
          primaryVenue: group.primaryVenue || '',
          privacy: group.privacy,
          groupType: group.groupType,
          experienceLevel: group.experienceLevel,
          meetingFrequency: group.meetingFrequency,
          languages: group.languages || [],
          playstyle: group.tags,
          links: contactMethods, // Use the constructed contactMethods
          meetupPrivacy: group.meetupDetails?.privacy || 'Public',
          noteToAdmin: '',
        });
        setCoverPreview(group.coverImage);
        setBannerPreview(group.bannerImage || null);
        setCharCount(group.catchline?.length || 0);
      }
    }
  }, [isEditMode, editGroupId, groups, user]);

  const handleZipCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const zip = e.target.value.replace(/\D/g, '').slice(0, 5);
    setFormData(prev => ({ ...prev, zipCode: zip }));

    if (zip.length === 5) {
      setIsLocating(true);
      try {
        const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(prev => ({
            ...prev,
            zipCode: zip,
            city: data.places[0]['place name'],
            state: data.places[0]['state abbreviation']
          }));
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      } finally {
        setIsLocating(false);
      }
    }
  };

  const playstyleOptions = [
    'Strategy',
    'Casual',
    'Social',
    'RPG',
    'Card Games',
    'Miniatures',
    'Competitive',
    'Cooperative',
    'Light',
    'Medium',
    'Heavy',
    'Party',
  ];

  const groupTypeOptions = [
    'Board Game Group',
    'DND Group',
    'Social Group',
    'RPG Group',
    'Card Game Group',
    'Other',
  ];

  const experienceLevelOptions = [
    'Beginner Friendly',
    'Intermediate',
    'Advanced',
    'All Levels',
  ];

  const meetingFrequencyOptions = [
    'Weekly',
    'Bi-weekly',
    'Monthly',
    'Ad Hoc',
    'Custom',
  ];

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleCatchlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 150) {
      setFormData({ ...formData, catchline: value });
      setCharCount(value.length);
    }
  };

  const removeCover = () => {
    setFormData({ ...formData, coverImage: null });
    setCoverPreview(null);
  };

  const removeBanner = () => {
    setFormData({ ...formData, bannerImage: null });
    setBannerPreview(null);
  };

  const togglePlaystyle = (style: string) => {
    setFormData({
      ...formData,
      playstyle: formData.playstyle.includes(style)
        ? formData.playstyle.filter((s) => s !== style)
        : [...formData.playstyle, style],
    });
  };

  const addLink = (id: string) => {
    setFormData(prev => ({
      ...prev,
      links: { ...prev.links, [id]: '' }
    }));
  };

  const removeLink = (id: string) => {
    setFormData(prev => {
      const newLinks = { ...prev.links };
      delete newLinks[id];
      return { ...prev, links: newLinks };
    });
  };

  const updateLink = (id: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      links: { ...prev.links, [id]: value }
    }));
  };

  const validateForm = () => {
    return formData.groupName && formData.description && (formData.catchline || isEditMode) &&
           formData.zipCode && formData.city && formData.state && formData.privacy &&
           formData.groupType && formData.experienceLevel && formData.meetingFrequency && formData.playstyle.length > 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      alert(t('submit_group.messages.required_fields_alert'));
      return;
    }
    console.log('Form submitted:', formData);

    // Build contact methods array from non-empty URLs
    const contactMethods = Object.keys(formData.links).filter(key => formData.links[key]?.trim()) as BGCGroup['contactMethods'];

    if (isEditMode && editGroupId) {
      const groupFound = groups.find((g: BGCGroup) => g.id === editGroupId);

      if (groupFound) {
        // Update existing group
        const updatedGroup = { ...groupFound };
        updatedGroup.name = formData.groupName;
        updatedGroup.catchline = formData.catchline;
        updatedGroup.description = formData.description;
        if (typeof coverPreview === 'string' && coverPreview.startsWith('http')) {
          updatedGroup.coverImage = coverPreview;
        }
        if (typeof bannerPreview === 'string' && bannerPreview.startsWith('http')) {
          updatedGroup.bannerImage = bannerPreview;
        }
        updatedGroup.location = {
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        };
        updatedGroup.primaryVenue = formData.primaryVenue;
        updatedGroup.contactMethods = contactMethods || [];
        updatedGroup.privacy = formData.privacy as 'Public' | 'Private';
        updatedGroup.groupType = formData.groupType as any;
        updatedGroup.experienceLevel = formData.experienceLevel as any;
        updatedGroup.meetingFrequency = formData.meetingFrequency as any;
        updatedGroup.languages = formData.languages;
        updatedGroup.tags = formData.playstyle;
        if (contactMethods?.includes('meetup')) {
          updatedGroup.meetupDetails = { privacy: formData.meetupPrivacy };
        } else {
          updatedGroup.meetupDetails = undefined;
        }
        const slug = formData.groupName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        updatedGroup.slug = slug;

        updateGroup(editGroupId, updatedGroup);

        const stateSlug = formData.state?.toLowerCase().replace(/ /g, '-') || 'unknown';
        const citySlug = formData.city?.toLowerCase().replace(/ /g, '-') || 'unknown';
        navigate(`/groups/${stateSlug}/${citySlug}/${updatedGroup.slug}`);
        return;
      }
    }

    // Handle Create Mode
    const newId = Math.random().toString(36).substr(2, 9);
    const slug = formData.groupName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const isGuest = !user;

    const newGroup: BGCGroup = {
      id: newId,
      slug: slug,
      name: formData.groupName,
      catchline: formData.catchline,
      coverImage: coverPreview || 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=800&fit=crop',
      bannerImage: bannerPreview || 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=1200&h=400&fit=crop',
      memberCount: 1,
      description: formData.description,
      privacy: formData.privacy as 'Public' | 'Private',
      location: {
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      },
      primaryVenue: formData.primaryVenue,
      tags: formData.playstyle,
      groupType: formData.groupType as any,
      groupSize: 'Small',
      experienceLevel: formData.experienceLevel as any,
      meetingFrequency: formData.meetingFrequency as any,
      languages: formData.languages,
      isClaimed: !isGuest,
      isVerified: false,
      isActive: false,
      organizer: isGuest ? 'Community Member' : (user?.name || 'Community Member'),
      contactMethods: contactMethods || [],
      meetupDetails: contactMethods?.includes('meetup') ? { privacy: formData.meetupPrivacy } : undefined
    };

    addGroup(newGroup);

    if (isGuest) {
      alert(t('submit_group.messages.guest_submit_alert'));
    } else {
      alert(t('submit_group.messages.success_alert'));
    }

    const stateSlug = formData.state?.toLowerCase().replace(/ /g, '-') || 'unknown';
    const citySlug = formData.city?.toLowerCase().replace(/ /g, '-') || 'unknown';
    navigate(`/groups/${stateSlug}/${citySlug}/${newGroup.slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {isEditMode ? t('submit_group.header.edit_title') : t('submit_group.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isEditMode 
                ? t('submit_group.header.edit_desc') 
                : t('submit_group.desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Guest Warning Banner */}
      {!user && !isEditMode && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mb-6 mt-6">
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">
                  {t('submit_group.sections.guest_warning.title_p1')}<span className="font-bold border-b border-amber-200">{t('submit_group.sections.guest_warning.unclaimed')}</span>{t('submit_group.sections.guest_warning.title_p2')}
                </h3>
                <div className="mt-2 text-sm text-amber-700">
                  <p>
                    {t('submit_group.sections.guest_warning.message_p1')}<span className="font-bold text-amber-900">{t('submit_group.sections.guest_warning.unclaimed')}</span>{t('submit_group.sections.guest_warning.message_p2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Section 1: Info */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              {t('submit_group.sections.info.title')}
            </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {t('submit_group.sections.info.name_label')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.groupName}
                      onBlur={() => handleBlur('groupName', formData.groupName)}
                      onChange={(e) => {
                        setFormData({ ...formData, groupName: e.target.value });
                        if (touched.groupName) validateField('groupName', e.target.value);
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${touched.groupName && fieldErrors.groupName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                      placeholder={t('submit_group.sections.info.name_placeholder')}
                    />
                    {touched.groupName && fieldErrors.groupName && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.groupName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {t('submit_group.sections.info.catchline_label')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required={!isEditMode}
                      value={formData.catchline}
                      onChange={handleCatchlineChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder={t('submit_group.sections.info.catchline_placeholder')}
                    />
                    <p className="text-xs text-gray-500 mt-1">{t('submit_group.sections.info.char_limit').replace('{count}', String(charCount))}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {t('submit_group.sections.info.desc_label')} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onBlur={() => handleBlur('description', formData.description)}
                      onChange={(e) => {
                        setFormData({ ...formData, description: e.target.value });
                        if (touched.description) validateField('description', e.target.value);
                      }}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none ${touched.description && fieldErrors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                      placeholder={t('submit_group.sections.info.desc_placeholder')}
                    />
                    {touched.description && fieldErrors.description && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.description}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">{t('submit_group.sections.info.cover_label')} <span className="text-red-500">*</span></label>
                    <CoverImageUpload
                      previewUrl={coverPreview}
                      variant="cover"
                      aspectRatio={16 / 9}
                      onFileSelect={(file) => {
                        setFormData({ ...formData, coverImage: file });
                        const reader = new FileReader();
                        reader.onloadend = () => setCoverPreview(reader.result as string);
                        reader.readAsDataURL(file);
                      }}
                      onClear={removeCover}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">{t('submit_group.sections.info.banner_label')}</label>
                    <CoverImageUpload
                      previewUrl={bannerPreview}
                      variant="banner"
                      aspectRatio={3}
                      onFileSelect={(file) => {
                        setFormData({ ...formData, bannerImage: file });
                        const reader = new FileReader();
                        reader.onloadend = () => setBannerPreview(reader.result as string);
                        reader.readAsDataURL(file);
                      }}
                      onClear={removeBanner}
                    />
                  </div>
                </div>
            </div>

          {/* Section 2: Location & Type */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              {t('submit_group.sections.location_type.title')}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">{t('submit_group.sections.location_type.zipcode_label')} <span className="text-red-500">*</span></label>
                <div className="relative max-w-xs">
                  <input
                    type="text"
                    required
                    value={formData.zipCode}
                    onBlur={() => handleBlur('zipCode', formData.zipCode)}
                    onChange={handleZipCodeChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-10 ${touched.zipCode && fieldErrors.zipCode ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    placeholder={t('submit_group.sections.location_type.zipcode_placeholder')}
                    maxLength={5}
                  />
                  {isLocating && <Loader2 className="absolute right-3 top-3.5 w-5 h-5 text-amber-500 animate-spin" />}
                </div>
                {touched.zipCode && fieldErrors.zipCode && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.zipCode}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-900 mb-2">{t('submit_group.sections.location_type.city_label')} <span className="text-red-500">*</span></label>
                  <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">{t('submit_group.sections.location_type.state_label')} <span className="text-red-500">*</span></label>
                  <select required value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50">
                    <option value="">Select</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">{t('submit_group.sections.location_type.venue_label')}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input type="text" value={formData.primaryVenue} onChange={(e) => setFormData({ ...formData, primaryVenue: e.target.value })} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder={t('submit_group.sections.location_type.venue_placeholder')} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-4">{t('submit_group.sections.location_type.privacy_label')} <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Public', 'Private'].map((type) => (
                    <label key={type} className={`relative flex flex-col p-4 border rounded-xl cursor-pointer transition-all ${formData.privacy === type ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500' : 'border-gray-200 hover:border-amber-300 hover:bg-gray-50'}`}>
                      <input type="radio" value={type} checked={formData.privacy === type} onChange={(e) => setFormData({ ...formData, privacy: e.target.value })} className="sr-only" />
                      <div className="flex items-center gap-2 mb-2">
                        {type === 'Public' ? <Globe className={`w-5 h-5 ${formData.privacy === 'Public' ? 'text-amber-600' : 'text-gray-500'}`} /> : <Lock className={`w-5 h-5 ${formData.privacy === 'Private' ? 'text-amber-600' : 'text-gray-500'}`} />}
                        <span className={`font-semibold ${formData.privacy === type ? 'text-amber-900' : 'text-gray-900'}`}>
                          {type === 'Public' ? t('submit_group.sections.location_type.public_title') : t('submit_group.sections.location_type.private_title')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{type === 'Public' ? t('submit_group.sections.location_type.public_desc') : t('submit_group.sections.location_type.private_desc')}</p>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">{t('submit_group.sections.location_type.group_type_label')} <span className="text-red-500">*</span></label>
                  <select required value={formData.groupType} onChange={(e) => setFormData({ ...formData, groupType: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white">
                    <option value="">Select Option</option>
                    {groupTypeOptions.map(tOption => <option key={tOption} value={tOption}>{t(`enums.group_type.${tOption}`)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">{t('submit_group.sections.location_type.experience_label')} <span className="text-red-500">*</span></label>
                  <select required value={formData.experienceLevel} onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white">
                    <option value="">Select Option</option>
                    {experienceLevelOptions.map(l => <option key={l} value={l}>{t(`enums.experience.${l}`)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">{t('submit_group.sections.location_type.frequency_label')} <span className="text-red-500">*</span></label>
                  <select required value={formData.meetingFrequency} onChange={(e) => setFormData({ ...formData, meetingFrequency: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none bg-white">
                    <option value="">Select Option</option>
                    {meetingFrequencyOptions.map(f => <option key={f} value={f}>{t(`enums.frequency.${f}`)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">{t('submit_group.sections.location_type.language_label')} <span className="text-red-500">*</span></label>
                  <select
                    required
                    value={formData.languages[0] || ''}
                    onChange={(e) => setFormData({ ...formData, languages: e.target.value ? [e.target.value] : [] })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none bg-white"
                  >
                    <option value="">{t('submit_group.sections.location_type.language_placeholder')}</option>
                    {languageOptions.map(option => (
                      <option key={option.id} value={option.name}>
                        {t(`enums.language.${option.name}` as any)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">{t('submit_group.sections.location_type.playstyle_label')} <span className="text-red-500">*</span></label>
                <div className="flex flex-wrap gap-2">
                  {playstyleOptions.map((style) => (
                    <button key={style} type="button" onClick={() => togglePlaystyle(style)} className={`px-4 py-2 rounded-lg border transition-colors ${formData.playstyle.includes(style) ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-700 border-gray-300 hover:border-amber-500'}`}>
                      {t(`enums.playstyle.${style}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Connection Links */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              {t('submit_group.sections.links.title')}
            </h2>

            <div className="space-y-6">
              <p className="text-sm text-gray-600">
                {t('submit_group.sections.links.subtitle')}
              </p>

              {/* Active Connections */}
              <div className="space-y-4">
                {connectionOptions.map((option) => {
                   if (formData.links[option.id] === undefined) return null;
                   const fieldName = `link_${option.id}`;
                   return (
                     <div key={option.id} className="flex gap-3 items-start">
                       <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">
                         <option.icon className="w-6 h-6 text-gray-600" />
                       </div>
                       <div className="flex-grow">
                         <label className="block text-sm font-medium text-gray-900 mb-1">
                           {t(`group_card.contact_methods.${option.id}` as any)}
                         </label>
                         <input
                           type={option.id === 'email' ? 'email' : 'text'}
                           value={formData.links[option.id]}
                           onBlur={() => handleBlur(fieldName, formData.links[option.id])}
                           onChange={(e) => {
                             updateLink(option.id, e.target.value);
                             if (touched[fieldName]) validateField(fieldName, e.target.value);
                           }}
                           className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${touched[fieldName] && fieldErrors[fieldName] ? 'border-red-400 bg-red-50' : ''}`}
                           placeholder={t(`submit_group.sections.platforms.${option.id === 'aftergame' ? 'aftergame_co' : option.id}_url.placeholder` as any)}
                         />
                         {touched[fieldName] && fieldErrors[fieldName] && (
                           <p className="mt-1 text-[10px] text-red-500 font-medium">{fieldErrors[fieldName]}</p>
                         )}
                         {option.id === 'meetup' && (
                           <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                             <label className="block text-sm font-medium text-gray-700 mb-2">
                               {t('submit_group.sections.platforms.meetup_url.meetup_group_privacy') || 'Meetup Group Privacy'}
                             </label>
                             <div className="flex gap-4">
                               {['Public', 'Private'].map((p) => (
                               <label key={p} className="flex items-center gap-2 cursor-pointer">
                                 <input
                                   type="radio"
                                   name="meetupPrivacy"
                                   checked={formData.meetupPrivacy === p}
                                   onChange={(e) => setFormData(prev => ({ ...prev, meetupPrivacy: p as any }))}
                                   className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                                 />
                                 <span className="text-sm text-gray-700">{p === 'Public' ? t('submit_group.sections.platforms.meetup_url.public_title') : t('submit_group.sections.platforms.meetup_url.private_title')}</span>
                               </label>
                               ))}
                             </div>
                             <p className="text-xs text-gray-500 mt-1.5">
                               {formData.meetupPrivacy === 'Public' ? t('submit_group.sections.platforms.meetup_url.public_desc') : t('submit_group.sections.platforms.meetup_url.private_desc')}
                             </p>
                           </div>
                         )}
                       </div>
                       <button
                         type="button"
                         onClick={() => removeLink(option.id)}
                         className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-6"
                         title="Remove link"
                       >
                         <Trash2 className="w-5 h-5" />
                       </button>
                     </div>
                   );
                })}
              </div>

              {/* Add Connections Grid */}
              <div className="pt-4 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('submit_group.sections.links.add_more')}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {connectionOptions.map((option) => {
                    if (formData.links[option.id] !== undefined) return null;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => addLink(option.id)}
                        className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all text-left group"
                      >
                        <option.icon className="w-5 h-5 text-gray-400 group-hover:text-amber-500" />
                        <span className="text-sm font-medium text-gray-600 group-hover:text-amber-900">
                           {t(`group_card.contact_methods.${option.id}` as any)}
                        </span>
                        <Plus className="w-4 h-4 ml-auto text-gray-300 group-hover:text-amber-500" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Submission Note */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              {t('submit_group.sections.note.title')}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {t('submit_group.sections.note.note_label')}
              </label>
              <textarea
                value={formData.noteToAdmin}
                onChange={(e) => setFormData({ ...formData, noteToAdmin: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                placeholder={t('submit_group.sections.note.note_placeholder')}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {t('admin.actions.cancel')}
            </button>
            <button
              type="submit"
              disabled={!validateForm()}
              className="px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditMode ? t('submit_group.actions.save') : t('submit_group.actions.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}