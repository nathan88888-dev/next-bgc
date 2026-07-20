import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router';
import { useGroups } from '@/app/context/GroupContext';
import { AlertTriangle, ChevronLeft } from 'lucide-react';

export function ReportGroupPage() {
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get('groupId');
  const navigate = useNavigate();
  const { groups, addReport } = useGroups();
  const group = groups.find(g => g.id === groupId);

  const [formData, setFormData] = useState({
    reason: '',
    description: '',
    email: ''
  });

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Group Not Found</h2>
          <Link to="/groups" className="text-amber-600 hover:text-amber-700">
            Return to Directory
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReport({
      groupId: group.id,
      groupName: group.name,
      reason: formData.reason,
      description: formData.description,
      reporterEmail: formData.email
    });
    const state = group.location.state?.toLowerCase().replace(/ /g, '-') || 'unknown';
    const city = group.location.city?.toLowerCase().replace(/ /g, '-') || 'unknown';
    navigate(`/groups/${state}/${city}/${group.slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            to={`/groups/${group.location.state?.toLowerCase().replace(/ /g, '-') || 'unknown'}/${group.location.city?.toLowerCase().replace(/ /g, '-') || 'unknown'}/${group.slug}`}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Group
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 text-red-600 rounded-xl">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Report Group</h1>
              <p className="text-gray-600">Help us maintain the quality of the BGC Directory</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <span className="text-sm text-gray-500 uppercase font-semibold tracking-wide">Reporting</span>
            <h3 className="font-bold text-gray-900 text-lg mt-1">{group.name}</h3>
            <p className="text-gray-600 text-sm">{group.location.city}, {group.location.state}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Reason for Report <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
              >
                <option value="">Select a reason</option>
                <option value="Inaccurate Information">Inaccurate Information</option>
                <option value="Duplicate Listing">Duplicate Listing</option>
                <option value="Group No Longer Active">Group No Longer Active</option>
                <option value="Inappropriate Content">Inappropriate Content</option>
                <option value="Spam or Advertising">Spam or Advertising</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Please provide specific details about the issue..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Your Email (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="We may contact you for more information"
              />
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={() => {
                  const state = group.location.state?.toLowerCase().replace(/ /g, '-') || 'unknown';
                  const city = group.location.city?.toLowerCase().replace(/ /g, '-') || 'unknown';
                  navigate(`/groups/${state}/${city}/${group.slug}`);
                }}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}