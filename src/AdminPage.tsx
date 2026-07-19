import React, { useState } from 'react';
import { Check, Link as LinkIcon, MessageSquare } from 'lucide-react';

export default function AdminPage() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const getGeneratedLink = () => {
    if (!guestName) return '';
    const baseUrl = window.location.origin;
    const path = '/';
    const params = new URLSearchParams();
    params.set('prefix', prefix);
    params.set('name', guestName.trim());
    return `${baseUrl}${path}?${params.toString()}`;
  };

  const generatedLink = getGeneratedLink();

  const getFullMessage = () => {
    return `Dear ${prefix} ${guestName.trim()} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Shaleeka & Sachini`;
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMessage = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(getFullMessage());
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] font-montserrat p-6 md:p-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-[#d4af37]/30">
        <div className="bg-[#B7410E] p-6 text-center">
          <h1 className="font-cinzel text-2xl text-white">
            Link Generator
          </h1>
          <p className="text-white/80 text-sm mt-2">Generate personalized wedding invitations</p>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">
                Prefix
              </label>
              <select
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#B7410E]/50"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss.">Miss.</option>
                <option value="Mr. & Mrs.">Mr. & Mrs.</option>
                <option value="Family">Family</option>
                <option value="Dear">Dear</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-widest">
                Guest Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sanjaya"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#B7410E]/50"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-widest">Generated Preview</h3>
            
            {!guestName ? (
              <div className="p-4 bg-slate-50 text-slate-500 rounded-lg text-sm text-center border border-slate-100 italic">
                Enter a guest name to generate the invitation link
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-[#fdfaf5] border border-[#d4af37]/20 rounded-lg font-serif">
                  <p className="whitespace-pre-wrap text-slate-700 text-sm leading-relaxed">
                    {getFullMessage()}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCopyLink}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#B7410E] text-[#B7410E] rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-colors"
                  >
                    {copiedLink ? <Check size={16} /> : <LinkIcon size={16} />}
                    {copiedLink ? 'Copied!' : 'Copy Link Only'}
                  </button>
                  <button
                    onClick={handleCopyMessage}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#B7410E] text-white rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-[#91330b] transition-colors shadow-md"
                  >
                    {copiedMessage ? <Check size={16} /> : <MessageSquare size={16} />}
                    {copiedMessage ? 'Copied!' : 'Copy Full Message'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
