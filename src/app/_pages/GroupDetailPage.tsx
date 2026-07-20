import { useParams, Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';

import { useUser } from '@/app/context/UserContext';
import { useGroups } from '@/app/context/GroupContext';
import { MapPin, Calendar, Clock, Globe, Mail, MessageCircle, Phone, ExternalLink, Shield, Lock, CheckCircle2, ChevronLeft, Facebook, Heart, Edit, PlusCircle, Twitter, Instagram, Gamepad2, Send, Link as LinkIcon, Megaphone, AlertTriangle } from 'lucide-react';

import { integrationService, config } from '@/services';
import { MeetupEvent, DiscordInfo, SocialPost, BGCGroup } from '@/services/types';
import { useI18nStore } from '@/stores/i18n';
import { sendFollowEmail } from '@/utils/sendFollowEmail';



export function GroupDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { role, isFollowing, toggleFollow, user } = useUser();
  const { groups } = useGroups();
  const { t } = useI18nStore();
  const isGuest = role === 'guest';
  const group = groups.find((g: any) => g.slug === slug);
  const isOwner = user?.name === group?.organizer;

  const [meetupEvents, setMeetupEvents] = useState<MeetupEvent[]>([]);
  const [discordInfo, setDiscordInfo] = useState<DiscordInfo | null>(null);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [loadingIntegrations, setLoadingIntegrations] = useState(true);

  useEffect(() => {
    if (group) {
      const fetchIntegrations = async () => {
        setLoadingIntegrations(true);
        try {
          // If mock is disabled, pull from our new socialLinks metadata
          if (!config.useMock) {
            const meetupLink = group.socialLinks?.find((link: any) => link.platform === 'meetup');
            const discordLink = group.socialLinks?.find((link: any) => link.platform === 'discord');
            const facebookLink = group.socialLinks?.find((link: any) => link.platform === 'facebook');

            setMeetupEvents(meetupLink?.metadata?.events || []);
            setDiscordInfo(discordLink?.metadata || null);
            setSocialPosts(facebookLink?.metadata?.posts || []);
          } else {
             // Fallback to old mock behavior
            const [events, discord, posts] = await Promise.all([
              integrationService.getMeetupEvents(group.id),
              integrationService.getDiscordInfo(group.id),
              integrationService.getSocialPosts(group.id, 'facebook')
            ]);
            setMeetupEvents(events);
            setDiscordInfo(discord);
            setSocialPosts(posts);
          }
        } catch (error) {
          console.error('Failed to fetch integrations:', error);
        } finally {
          setLoadingIntegrations(false);
        }
      };
      fetchIntegrations();
    }
  }, [group]);


  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('group_detail.not_found')}</h1>
          <p className="text-gray-600 mb-4">{t('group_detail.not_found_desc')}</p>
          <Link to="/directory" className="text-amber-600 hover:text-amber-700 font-medium">
            {t('group_detail.back_to_directory')}
          </Link>
        </div>
      </div>
    );
  }

  // Pending/Rejected Group Access Control
  if (!group.isActive && !isOwner && role !== 'admin') {
    const isRejected = group.status === 'rejected';
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isRejected ? 'bg-red-100' : 'bg-amber-100'}`}>
            {isRejected ? <AlertTriangle className="w-8 h-8 text-red-600" /> : <Clock className="w-8 h-8 text-amber-600" />}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isRejected ? t('group_detail.rejected_title') : t('group_detail.pending_title')}
          </h1>
          <p className="text-gray-600 mb-6">
            {isRejected 
              ? t('group_detail.rejected_desc')
              : t('group_detail.pending_desc')}
          </p>
          <Link to="/directory" className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white transition-colors ${isRejected ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'}`}>
            {t('group_detail.back_to_directory')}
          </Link>
        </div>
      </div>
    );
  }

  const getContactMethodDisplay = (method: string) => {
    switch (method) {
      case 'meetup':
        return { icon: Calendar, label: 'Meetup', color: '#ED1C40', url: 'https://meetup.com/bay-area-board-gamers' };
      case 'discord':
        return { icon: MessageCircle, label: 'Discord', color: '#5865F2', url: 'https://discord.gg/example' };
      case 'whatsapp':
        return { icon: Phone, label: 'WhatsApp', color: '#25D366', url: 'https://chat.whatsapp.com/example' };
      case 'facebook':
        return { icon: Facebook, label: 'Facebook', color: '#1877F2', url: 'https://facebook.com/groups/example' };
      case 'website':
        return { icon: Globe, label: 'Website', color: '#6B7280', url: 'https://example.com' };
      case 'email':
        return { icon: Mail, label: 'Email', color: '#6B7280', url: 'mailto:contact@example.com' };
      case 'twitter':
        return { icon: Twitter, label: 'Twitter', color: '#1DA1F2', url: 'https://twitter.com/example' };
      case 'instagram':
        return { icon: Instagram, label: 'Instagram', color: '#E1306C', url: 'https://instagram.com/example' };
      case 'bgg':
        return { icon: Gamepad2, label: 'BGG', color: '#3F3A60', url: 'https://boardgamegeek.com/guild/example' };
      case 'reddit':
        return { icon: MessageCircle, label: 'Reddit', color: '#FF4500', url: 'https://reddit.com/r/example' };
      case 'telegram':
        return { icon: Send, label: 'Telegram', color: '#0088CC', url: 'https://t.me/example' };
      case 'warhorn':
        return { icon: Megaphone, label: 'Warhorn', color: '#E95420', url: 'https://warhorn.net/events/example' };
      case 'aftergame':
        return { icon: Gamepad2, label: 'Aftergame', color: '#7C3AED', url: 'https://aftergame.co/groups/example' };
      default:
        return { icon: LinkIcon, label: method, color: '#6B7280', url: '#' };
    }
  };

  const getContactMethodLabel = (method: string) => {
    return t(`group_card.contact_methods.${method}` as any);
  };

  const getStatusBadge = () => {
    // 1. Processing (if not active or rejected)
    if (!group.isActive && group.status !== 'rejected') {
      return (
        <span 
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/20 text-white rounded text-xs font-bold uppercase tracking-wider backdrop-blur-sm"
        >
          <Clock className="w-3.5 h-3.5" />
          {t('group_detail.status.processing')}
        </span>
      );
    }

    if (group.status === 'rejected') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-100 text-red-700 rounded text-xs font-bold uppercase tracking-wider">
          <AlertTriangle className="w-3.5 h-3.5" />
          {t('group_detail.status.rejected')}
        </span>
      );
    }

    // 2. Verified (Claimed + Verified by admin)
    if (group.isClaimed && group.isVerified) {
      return (
        <span 
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-500 text-white rounded text-xs font-bold uppercase tracking-wider shadow-sm"
        >
          <Shield className="w-3.5 h-3.5" style={{ fill: 'white' }} />
          {t('group_detail.status.verified')}
        </span>
      );
    }

    // 3. Pending Verification (Claimed but not yet verified)
    if (group.isClaimed && !group.isVerified) {
      return (
        <span 
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-500 text-white rounded text-xs font-bold uppercase tracking-wider shadow-sm"
        >
          <Shield className="w-3.5 h-3.5" style={{ fill: 'white' }} />
          {t('group_detail.status.pending_verification')}
        </span>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-br from-amber-500 to-amber-600 overflow-hidden">
        <img
          src={group.coverImage}
          alt={group.name}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
            <Link
              to="/directory"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 text-sm font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              {t('group_detail.back_to_directory')}
            </Link>
            
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-white">{group.name}</h1>
                  {getStatusBadge()}
                  {group.privacy === 'Private' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 text-white rounded text-xs font-medium">
                      <Lock className="w-3 h-3" />
                      {t('group_detail.privacy_private')}
                    </span>
                  )}
                </div>

                {group.catchline && (
                  <p className="text-xl text-white/90 font-medium mb-3 italic">
                    "{group.catchline}"
                  </p>
                )}
                
                {group.organizer && (
                  <div className="flex items-center gap-1.5 text-white/90 mb-3">
                    <span>{t('group_detail.organized_by')} <span className="font-semibold text-white">{group.organizer}</span></span>
                    {group.isClaimed && group.isVerified && (
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    )}
                  </div>
                )}
                
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {group.location?.city || 'Unknown City'}, {group.location?.state || 'Unknown State'}
                      {group.primaryVenue && ` • ${group.primaryVenue}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{group.meetingFrequency}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isGuest) {
                      navigate('/signin');
                    } else {
                      const wasFollowing = isFollowing(group.id);
                      toggleFollow(group.id);
                      if (!wasFollowing && user?.email) {
                        sendFollowEmail(user.email, group.name);
                      }
                    }
                  }}
                  className={`p-3 rounded-lg shadow-lg transition-all duration-200 ${
                    isFollowing(group.id)
                      ? 'bg-white text-red-500 hover:bg-red-50'
                      : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                  }`}
                  title={isFollowing(group.id) ? t('group_card.tooltips.unfollow_this_group') : t('group_card.tooltips.follow_this_group')}
                >
                  <Heart className={`w-6 h-6 ${isFollowing(group.id) ? 'fill-current' : ''}`} />
                </button>

                {!group.isClaimed ? (
                    <button 
                      onClick={() => {
                        if (isGuest) { navigate('/signin'); }
                        else { navigate(`/claim-group?groupId=${group.id}`); }
                      }}
                      className="px-8 py-3 bg-white text-orange-600 rounded-lg hover:bg-gray-50 transition-colors text-base font-bold shadow-lg flex items-center gap-2"
                    >
                      <Shield className="w-5 h-5" />
                      {t('group_detail.claim_group')}
                    </button>
                ) : isOwner ? (
                    <button 
                      onClick={() => navigate(`/submit-group?edit=true&groupId=${group.id}`)}
                      className="px-8 py-3 bg-white text-amber-600 rounded-lg hover:bg-gray-50 transition-colors text-base font-bold shadow-lg flex items-center gap-2"
                    >
                      <Edit className="w-5 h-5" />
                      {t('group_detail.edit_group')}
                    </button>
                ) : (
                    <button 
                      onClick={() => navigate('/submit-group')}
                      className="px-8 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-50 transition-colors text-base font-bold shadow-lg flex items-center gap-2"
                    >
                      <PlusCircle className="w-5 h-5" />
                      {t('group_detail.submit_your_group')}
                    </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Membership Access Info */}
            <div className={`rounded-lg border p-4 flex items-start gap-4 ${
              group.privacy === 'Public' 
                ? 'bg-green-50 border-green-200' 
                : 'bg-amber-50 border-amber-200'
            }`}>
              <div className={`p-2 rounded-full ${
                group.privacy === 'Public' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {group.privacy === 'Public' ? <Globe className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
              </div>
              <div>
                <h3 className={`font-bold mb-1 ${
                  group.privacy === 'Public' ? 'text-green-900' : 'text-amber-900'
                }`}>
                  {group.privacy === 'Public' ? t('group_detail.public_group_title') : t('group_detail.private_group_title')}
                </h3>
                <p className={`text-sm ${
                  group.privacy === 'Public' ? 'text-green-800' : 'text-amber-800'
                }`}>
                  {group.privacy === 'Public' 
                    ? t('group_detail.public_group_desc')
                    : t('group_detail.private_group_desc')
                  }
                </p>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('group_detail.about')}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{group.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {group.tags?.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                  {tag}
                </span>
                ))}
              </div>
            </div>

            {/* Meetup Integration */}
            {group.contactMethods?.includes('meetup') && group.meetupDetails?.privacy === 'Public' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{t('group_detail.upcoming_events')}</h2>
                    <p className="text-sm text-gray-600">{t('group_detail.powered_by_meetup')}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {meetupEvents.map((event: MeetupEvent) => (
                    <div
                      key={event.id}
                      className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-amber-300 hover:bg-amber-50/50 transition-all cursor-pointer items-center"
                    >
                      <div className="flex flex-col items-center justify-center bg-amber-100 rounded-lg px-3 py-2 min-w-[80px]">
                        <span className="text-sm font-bold text-amber-900 uppercase">
                          {t('common.upcoming')}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{event.title}</h3>
                      </div>
                      
                      <div className="flex items-center">
                        <ExternalLink className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))}

                </div>
                
                <a
                  href={group.socialLinks?.find((link: any) => link.platform === 'meetup')?.url || group.external_url || "https://meetup.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
                >
                  {t('group_detail.view_all_meetup')}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Discord Integration */}
            {group.contactMethods?.includes('discord') && !isGuest && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#5865F2' }}>
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{t('group_detail.discord_community')}</h2>
                    <p className="text-sm text-gray-600">{discordInfo?.memberCount || 0} members • {discordInfo?.onlineCount || 0} online</p>
                  </div>

                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">{t('group_detail.active_channels')}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {discordInfo?.channels?.map((channel: any) => (
                        <div key={channel.name} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <span className="text-gray-400">#</span>
                          <span className="text-sm text-gray-700">{channel.name}</span>
                        </div>
                      ))}

                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">{t('group_detail.recent_activity')}</h3>
                    <div className="space-y-3">
                      {discordInfo?.recentMessages?.map((msg: any, idx: number) => (
                        <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-xs font-bold">
                            {msg.author[0]}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900 text-sm">{msg.author}</span>
                              <span className="text-xs text-gray-500">{msg.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-700">{msg.message}</p>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                </div>
                
                <a
                  href={group.socialLinks?.find((link: any) => link.platform === 'discord')?.url || "https://discord.gg/example"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white text-sm"
                  style={{ backgroundColor: '#5865F2' }}
                >
                  {t('group_detail.join_discord')}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {/* Facebook Feed */}
            {group.contactMethods?.includes('facebook') && (!isGuest || group.privacy === 'Public') && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1877F2' }}>
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{t('group_detail.facebook_updates')}</h2>
                    <p className="text-sm text-gray-600">{t('group_detail.from_facebook')}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {socialPosts.map((post: SocialPost) => (
                    <div key={post.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{post.author}</h4>
                          <p className="text-xs text-gray-500">{post.timestamp}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>👍 {post.likes}</span>
                        <span>💬 {t('group_detail.comments_count', { count: post.comments })}</span>
                      </div>
                    </div>
                  ))}

                </div>
                
                <a
                  href={group.socialLinks?.find((link: any) => link.platform === 'facebook')?.url || "https://facebook.com/groups/example"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-lg"
                  style={{ backgroundColor: '#1877F2' }}
                >
                  {t('group_detail.view_on_facebook')}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('group_detail.contact_info')}</h2>
              
              <div className="space-y-3">
                {group.contactMethods?.map((method: string) => {
                  const { icon: Icon, color, url: defaultUrl } = getContactMethodDisplay(method);
                  const socialLink = group.socialLinks?.find((link: any) => link.platform === method);
                  const url = socialLink?.url || (method === 'meetup' && group.external_url ? group.external_url : defaultUrl);
                  const label = getContactMethodLabel(method);
                  const isPrivate = group.privacy === 'Private';
                  const isRestricted = isGuest && (
                    ['discord', 'whatsapp'].includes(method) || isPrivate
                  );

                  if (isRestricted) {
                    return (
                      <button
                        key={method}
                        onClick={() => navigate('/signin')}
                        className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all group text-left"
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100">
                          <Lock className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-gray-500">{label}</span>
                          <p className="text-xs text-amber-600 font-medium">{t('group_detail.login_to_view')}</p>
                        </div>
                      </button>
                    );
                  }

                  return (
                    <a
                      key={method}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-amber-300 hover:bg-amber-50/50 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">{label}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-amber-600" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Group Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('group_detail.group_details')}</h2>
              
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">{t('group_detail.type_label')}</span>
                  <p className="text-gray-900 mt-1">{t(`enums.group_type.${group.groupType}`)}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">{t('group_detail.experience_label')}</span>
                  <p className="text-gray-900 mt-1">{t(`enums.experience.${group.experienceLevel}`)}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">{t('group_detail.frequency_label')}</span>
                  <p className="text-gray-900 mt-1">{t(`enums.frequency.${group.meetingFrequency}`)}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">{t('group_detail.privacy_label')}</span>
                  <p className="text-gray-900 mt-1">{t(`enums.privacy.${group.privacy}`)}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">{t('group_detail.location_label')}</span>
                  <p className="text-gray-900 mt-1">
                    {group.primaryVenue && <span className="font-medium block">{group.primaryVenue}</span>}
                    {group.location?.city || 'Unknown City'}, {group.location?.state || 'Unknown State'}
                    {group.location?.zipCode && ` ${group.location.zipCode}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Report Button */}
            <div className="text-center">
              <Link
                to={`/report-group?groupId=${group.id}`}
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-600 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                {t('group_detail.report_this_group')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}