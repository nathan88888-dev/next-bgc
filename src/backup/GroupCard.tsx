import { BGCGroup } from '@/data/mockGroups';
import { MapPin, Calendar, CheckCircle2, Lock, Shield, Clock, Globe, Mail, MessageCircle, Phone } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { useNavigate } from 'react-router';

interface GroupCardProps {
  group: BGCGroup;
}

export function GroupCard({ group }: GroupCardProps) {
  const navigate = useNavigate();
  
  // Determine status badge
  const getStatusBadge = () => {
    if (!group.isActive) {
      return (
        <span 
          className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-xs font-medium cursor-help"
          style={{ color: '#64748B' }}
          title="Processing - This group is being reviewed"
        >
          <Clock className="w-3 h-3" style={{ color: '#64748B' }} />
          Processing
        </span>
      );
    }

    if (group.isClaimed && group.isVerified) {
      return (
        <span 
          className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded text-xs font-medium cursor-help"
          style={{ color: '#22C55E' }}
          title="Verified Group - This group has been verified by BGC Directory"
        >
          <Shield className="w-3 h-3" style={{ fill: '#22C55E', color: '#22C55E' }} />
          Verified
        </span>
      );
    }

    if (group.isClaimed && !group.isVerified) {
      return (
        <span 
          className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 rounded text-xs font-medium cursor-help"
          style={{ color: '#EE7B11' }}
          title="Pending Verification - This group is active but verification is pending"
        >
          <Shield className="w-3 h-3" style={{ fill: '#EE7B11', color: '#EE7B11' }} />
          Pending Verification
        </span>
      );
    }

    // Unclaimed groups
    return (
      <span 
        className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 rounded text-xs font-medium cursor-pointer hover:bg-orange-100 transition-colors"
        style={{ color: '#EE7B11' }}
        title="Claim This Group - This group is not yet claimed"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/claim-group?groupId=${group.id}`);
        }}
      >
        <Shield className="w-3 h-3" style={{ fill: '#EE7B11', color: '#EE7B11' }} />
        Claim This Group
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
      default:
        return { icon: Mail, label: method, color: '#6B7280' };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200">
      <div className="flex gap-4 p-4">
        {/* Left: Square Thumbnail */}
        <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
          <img
            src={group.coverImage}
            alt={group.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Middle: Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors cursor-pointer">
              {group.name}
            </h3>
            {getStatusBadge()}
            {group.privacy === 'Public' && (
              <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                Public
              </span>
            )}
            {group.privacy === 'Private' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                <Lock className="w-3 h-3" />
                Private
              </span>
            )}
          </div>

          {/* Organizer info */}
          {group.organizer && (
            <div className="flex items-center gap-1.5 mb-2 text-sm text-gray-600">
              {group.isClaimed && group.isVerified && (
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
              )}
              <span>Organized by <span className="font-medium text-gray-900">{group.organizer}</span></span>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {group.description}
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{group.location.city}, {group.location.state}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>{group.meetingFrequency}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-xs font-medium">
                {group.experienceLevel}
              </span>
            </div>
          </div>

          {/* Tags Row */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {group.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {group.tags.length > 5 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                +{group.tags.length - 5}
              </span>
            )}
          </div>

          {/* Contact Information Row - With Icons in Background */}
          {group.contactMethods && group.contactMethods.length > 0 && (
            <div className="relative min-h-[32px]">
              <div className="flex flex-wrap items-center gap-3 text-sm select-none">
                {group.contactMethods.map((method) => {
                  const { icon: Icon, label, color } = getContactMethodDisplay(method);
                  return (
                    <div key={method} className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded">
                      <Icon className="w-4 h-4" style={{ color }} />
                      <span className="text-gray-700 font-medium">{label}</span>
                    </div>
                  );
                })}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-3 py-1 bg-white border border-gray-300 rounded-md text-xs font-medium text-gray-700 shadow-sm">
                  Join to see contact info
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right: CTA Button */}
        <div className="flex-shrink-0 flex items-start">
          <button className="px-6 py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium whitespace-nowrap" onClick={() => navigate(`/groups/${group.id}`)}>
            Join this Group
          </button>
        </div>
      </div>
    </div>
  );
}