import { Link } from 'react-router';
import { Users, MapPin, Search, Sparkles, CheckCircle2 } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1759868937448-423d3c7c8133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2FyZCUyMGdhbWUlMjBncm91cCUyMGNhc3VhbHxlbnwxfHx8fDE3NjkxMzU2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="People playing board games"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Find Your Local Board Game Group</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Discover Board Game Groups
              <br />
              <span className="text-amber-400">In Your Neighborhood</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10 drop-shadow-md">
              Connect with local board game groups in your city. Search by location, game type, and experience level to find the perfect board game group for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/directory"
                className="px-8 py-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Find Groups Near You</span>
              </Link>
              <Link
                to="/submit-group"
                className="px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg border-2 border-gray-200 shadow-lg"
              >
                Submit Your Group
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Search by Location</h3>
            <p className="text-gray-600">
              Find board game groups in your city or neighborhood. Filter by distance to discover groups nearby.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Filter by Preferences</h3>
            <p className="text-gray-600">
              Search by game type, group size, meeting frequency, and experience level to find your perfect match.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified & Active Groups</h3>
            <p className="text-gray-600">
              Browse verified and actively meeting board game groups. Claim your group or submit a new one to the directory.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl p-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">500+</div>
              <div className="text-gray-600">Board Game Groups</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">50+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-amber-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Board Game Group?</h2>
          <p className="text-xl text-amber-50 mb-8 max-w-2xl mx-auto">
            Start exploring local board game groups today. Whether you're a beginner or expert, there's a group waiting for you.
          </p>
          <Link
            to="/directory"
            className="inline-block px-8 py-4 bg-white text-amber-600 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg shadow-lg"
          >
            Browse Directory
          </Link>
        </div>
      </div>
    </div>
  );
}