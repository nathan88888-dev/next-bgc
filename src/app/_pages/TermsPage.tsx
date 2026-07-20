import { Shield, Lock, Eye, FileText, ChevronRight, Gavel, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-100 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600">
                <Gavel className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Terms of Service</h1>
            <p className="text-xl text-gray-500 font-medium">Last Updated: March 20, 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 prose prose-amber">
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-amber-500" />
            Agreement to Terms
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            By accessing or using the Board Game Community (BGC) platform, you agree to be bound by these Terms of Service.
            If you do not agree, please do not use our services.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-amber-500" />
            User Responsibilities
          </h2>
          <ul className="space-y-4 text-gray-600 text-lg">
            <li className="flex gap-4">
              <span className="w-2 h-2 rounded-full bg-amber-400 mt-2.5 flex-shrink-0" />
              <span><strong>Accurate Information:</strong> You must provide truthful and accurate information when registering, submitting, or claiming groups.</span>
            </li>
            <li className="flex gap-4">
              <span className="w-2 h-2 rounded-full bg-amber-400 mt-2.5 flex-shrink-0" />
              <span><strong>Respectful Conduct:</strong> You agree to interact with the board gaming community in a respectful and non-abusive manner.</span>
            </li>
            <li className="flex gap-4">
              <span className="w-2 h-2 rounded-full bg-amber-400 mt-2.5 flex-shrink-0" />
              <span><strong>Authorization:</strong> You must be authorized to represent any group you claim ownership of on BGC.</span>
            </li>
          </ul>
        </section>

        <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-amber-900">Need legal clarification?</h3>
                <p className="text-amber-700">Reach our legal team at legal@broadgame.com</p>
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
