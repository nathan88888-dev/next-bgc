import { BGCGroup } from '@/services/types';
import { MapPin, Calendar, CheckCircle2, Lock, Shield, Clock, Globe, Mail, MessageCircle, Phone, Twitter, Instagram, Gamepad2, Send, Link, Megaphone, Heart } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useUser } from '@/app/context/UserContext';
import { useI18nStore } from '@/stores/i18n';
import { sendFollowEmail } from '@/utils/sendFollowEmail';

interface GroupCardProps {
  group: BGCGroup;
}

export function GroupCard({ group }: GroupCardProps) {
  const navigate = useNavigate();
  const { role, toggleFollow, isFollowing, user } = useUser();
  const { t } = useI18nStore();
  const isGuest = role === 'guest';
  const isPrivate = group.privacy === 'Private';
  
  // Determine status badge
  const getStatusBadge = () => {
    // 1. Processing (if not active or rejected)
    if (!group.isActive && group.status !== 'rejected') {
      return (
        <span 
          className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold uppercase tracking-wider cursor-help"
          style={{ color: '#64748B' }}
          title={t('group_card.status.tooltips.processing')}
        >
          <Clock className="w-3 h-3" />
          {t('group_card.processing')}
        </span>
      );
    }

    // 2. Verified (Claimed + Verified by admin)
    if (group.isClaimed && group.isVerified) {
      return (
        <span 
          className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded text-[10px] font-bold uppercase tracking-wider cursor-help"
          style={{ color: '#22C55E' }}
          title={t('group_card.status.tooltips.verified')}
        >
          <Shield className="w-3 h-3" style={{ fill: '#22C55E' }} />
          {t('group_card.verified')}
        </span>
      );
    }

    // 3. Pending Verification (Claimed but not yet verified)
    if (group.isClaimed && !group.isVerified) {
      return (
        <span 
          className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 rounded text-[10px] font-bold uppercase tracking-wider cursor-help"
          style={{ color: '#EE7B11' }}
          title={t('group_card.status.tooltips.pending_verification')}
        >
          <Shield className="w-3 h-3" style={{ fill: '#EE7B11' }} />
          {t('group_card.pending_verification')}
        </span>
      );
    }

    // 4. Claim This Group (Unclaimed + Active)
    return (
      <span 
        className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:bg-orange-100 transition-colors"
        style={{ color: '#EE7B11' }}
        title={t('group_card.status.tooltips.unclaimed')}
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/claim-group?groupId=${group.id}`);
        }}
      >
        <Shield className="w-3 h-3" style={{ fill: '#EE7B11' }} />
        {t('group_card.claim_this_group')}
      </span>
    );
  };

  // Get icon and label for contact method
  const getContactMethodDisplay = (method: string) => {
    switch (method) {
      case 'meetup':
        return { icon: Calendar, label: 'Meetup', color: '#ED1C40' };
      case 'discord':
        return { icon: MessageCircle, label: 'Discord', color: '#5865F2' };
      case 'whatsapp':
        return { icon: Phone, label: 'WhatsApp', color: '#25D366' };
      case 'facebook':
        return { icon: Facebook, label: 'Facebook', color: '#1877F2' };
      case 'website':
        return { icon: Globe, label: 'Website', color: '#6B7280' };
      case 'email':
        return { icon: Mail, label: 'Email', color: '#6B7280' };
      case 'twitter':
        return { icon: Twitter, label: 'Twitter', color: '#1DA1F2' };
      case 'instagram':
        return { icon: Instagram, label: 'Instagram', color: '#E1306C' };
      case 'bgg':
        return { icon: Gamepad2, label: 'BGG', color: '#3F3A60' };
      case 'reddit':
        return { icon: MessageCircle, label: 'Reddit', color: '#FF4500' };
      case 'telegram':
        return { icon: Send, label: 'Telegram', color: '#0088CC' };
      case 'warhorn':
        return { icon: Megaphone, label: 'Warhorn', color: '#E95420' };
      case 'aftergame':
        return { icon: Gamepad2, label: 'Aftergame', color: '#7C3AED' };
      default:
        return { icon: Link, label: method, color: '#6B7280' };
    }
  };

  const getContactMethodLabel = (method: string) => {
    return t(`group_card.contact_methods.${method}` as any);
  };

  const handleGroupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPrivate && isGuest) {
      navigate('/signin');
    } else {
      const state = group.location.state?.toLowerCase().replace(/ /g, '-') || 'unknown';
      const city = group.location.city?.toLowerCase().replace(/ /g, '-') || 'unknown';
      navigate(`/groups/${state}/${city}/${group.slug}`);
    }
  };

  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isGuest) {
      navigate('/signin');
    } else {
      const wasFollowing = isFollowing(group.id);
      toggleFollow(group.id);
      
      // Trigger email if user just followed (was not following before)
      if (!wasFollowing && user?.email) {
        sendFollowEmail(user.email, group.name);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200">
      <div className="flex gap-4 p-4">
        {/* Left: Square Thumbnail */}
        <div 
          className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 cursor-pointer group"
          onClick={handleGroupClick}
        >
          <img
            src={group.coverImage}
            alt={group.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <button
            onClick={handleFollowClick}
            className={`absolute top-2 right-2 p-1.5 rounded-full shadow-sm backdrop-blur-sm transition-all duration-200 z-10 ${
              isFollowing(group.id)
                ? 'bg-red-500 text-white'
                : 'bg-white/60 text-gray-700 hover:bg-white hover:text-red-500'
            }`}
            title={isFollowing(group.id) ? t('group_card.tooltips.unfollow') : t('group_card.tooltips.follow')}
          >
            <Heart className={`w-4 h-4 ${isFollowing(group.id) ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Middle: Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <h3 
              className="text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors cursor-pointer"
              onClick={handleGroupClick}
            >
              {group.name}
            </h3>
            {getStatusBadge()}
            {group.privacy === 'Public' && (
              <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                {t('group_card.public')}
              </span>
            )}
            {group.privacy === 'Private' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                <Lock className="w-3 h-3" />
                {t('group_card.private')}
              </span>
            )}
          </div>

          {/* Organizer info */}
          {group.organizer && (
            <div className="flex items-center gap-1.5 mb-2 text-sm text-gray-500">
              <span>{t('group_card.organized_by')} <span className="font-semibold text-gray-900">{group.organizer}</span></span>
              {group.isClaimed && group.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
              )}
            </div>
          )}

          {/* Catchline (if available) */}
          {group.catchline && (
            <p className="text-sm font-medium text-amber-700 mb-2">
              {group.catchline}
            </p>
          )}

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {group.description}
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{group.location?.city || 'Unknown City'}, {group.location?.state || 'Unknown State'}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded font-medium">
                {t(`enums.frequency.${group.meetingFrequency}`)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded font-medium">
                {t(`enums.experience.${group.experienceLevel}`)}
              </span>
            </div>
          </div>

          {/* Tags Row */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {group.tags?.slice(0, 5).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {(group.tags?.length || 0) > 5 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                +{(group.tags?.length || 0) - 5}
              </span>
            )}
          </div>

          {/* Contact Information Row */}
          {group.contactMethods && group.contactMethods.length > 0 && (
            <div className="relative min-h-[32px]">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {group.contactMethods?.slice(0, 4).map((method: string) => {
                  const { icon: Icon, color } = getContactMethodDisplay(method);
                  const label = getContactMethodLabel(method);
                  return (
                    <div key={method} className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded">
                      <Icon className="w-4 h-4" style={{ color }} />
                      <span className="text-gray-700 font-medium">{label}</span>
                    </div>
                  );
                })}
                {group.contactMethods.length > 4 && (
                  <span className="text-sm font-medium text-gray-500 pl-1">
                    {t('group_card.contact_methods.more', { count: group.contactMethods.length - 4 })}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: CTA Button */}
        <div className="flex-shrink-0 flex items-start">
          <button 
            className="px-6 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium whitespace-nowrap" 
            onClick={handleGroupClick}
          >
          {isPrivate && isGuest ? t('group_card.login_to_view') : t('group_card.view_group')}
          </button>
        </div>
      </div>
    </div>
  );
}