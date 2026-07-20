import { Shield, Lock, Eye, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-100 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600">
                <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-xl text-gray-500 font-medium">Last Updated: March 20, 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 prose prose-amber">
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Eye className="w-6 h-6 text-amber-500" />
            Introduction
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-4">
            Welcome to Board Game Community (BGC). We are committed to protecting your personal information and your right to privacy.
            This Privacy Policy explains how we collect, use, and protect your data when you use our platform.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            By accessing or using our services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-amber-500" />
            Information We Collect
          </h2>
          <ul className="space-y-4 text-gray-600 text-lg">
            <li className="flex gap-4">
              <span className="w-2 h-2 rounded-full bg-amber-400 mt-2.5 flex-shrink-0" />
              <span><strong>Account Information:</strong> Name, email address, and profile details you provide during registration.</span>
            </li>
            <li className="flex gap-4">
              <span className="w-2 h-2 rounded-full bg-amber-400 mt-2.5 flex-shrink-0" />
              <span><strong>Group Listings:</strong> Information about board game groups you submit or claim.</span>
            </li>
            <li className="flex gap-4">
              <span className="w-2 h-2 rounded-full bg-amber-400 mt-2.5 flex-shrink-0" />
              <span><strong>Usage Data:</strong> How you interact with our directory and search features.</span>
            </li>
          </ul>
        </section>

        <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-amber-900">Have questions about your data?</h3>
                <p className="text-amber-700">Contact our privacy team at privacy@broadgame.com</p>
            </div>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-xl font-bold shadow-lg shadow-amber-200 hover:bg-amber-600 transition-all">
                Back to Home
                <ChevronRight className="w-4 h-4" />
            </Link>
        </div>
      </div>
    </div>
  );
}
