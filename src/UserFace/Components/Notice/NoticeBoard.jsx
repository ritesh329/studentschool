import React, { useMemo, useState } from 'react';

/**
 * NoticeBoard
 *
 * Props:
 *  - studentData.notices: [{ id, title, description, fullDescription?, date (ISO), important?, pdfUrl? }]
 *  - studentData.updates: string[]            (optional ticker lines)
 *  - links: [{ name, href, icon, color }]     (optional, defaults below)
 *  - onNavigate(href): optional SPA navigation handler (e.g. router.push)
 */

const NEW_DAYS = 3; // "NEW" badge window
const LATEST_DAYS = 7; // "Latest" filter window
const DAY_MS = 24 * 60 * 60 * 1000;

// Static colour map: full class names so Tailwind can detect them at build time.
const COLOR_STYLES = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'group-hover:bg-blue-50' },
  green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'group-hover:bg-green-50' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'group-hover:bg-purple-50' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'group-hover:bg-orange-50' },
};

const DEFAULT_LINKS = [
  {
    name: 'Calendar',
    href: '/calendar',
    color: 'blue',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    name: 'Exam Schedule',
    href: '/exams',
    color: 'green',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    name: 'Holiday List',
    href: '/holidays',
    color: 'purple',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    name: 'PTA Meeting',
    href: '/pta',
    color: 'orange',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
];

// Fallback demo data (used only when backend sends nothing at all).
const SAMPLE_NOTICES = [
  {
    id: 's1',
    title: 'Annual Sports Day on 25th May 2024',
    date: '2024-05-20',
    important: true,
    description:
      'All students are requested to participate in the annual sports day event. Please report to the sports ground by 8:00 AM.',
  },
  {
    id: 's2',
    title: 'Summer Vacation from 1st June 2024',
    date: '2024-05-18',
    description:
      'School will remain closed for summer vacation from 1st June to 30th June 2024. School reopens on 1st July 2024.',
  },
  {
    id: 's3',
    title: 'Parent-Teacher Meeting on 30th May',
    date: '2024-05-15',
    important: true,
    description: 'Parent-Teacher meeting scheduled for 30th May 2024 from 9:00 AM to 2:00 PM.',
  },
  {
    id: 's4',
    title: 'Half Yearly Exams Schedule',
    date: '2024-05-05',
    important: true,
    description: 'Half yearly examinations will begin from 15th September 2024.',
  },
];

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'important', label: 'Important' },
  { key: 'latest', label: 'Latest' },
];

/* ---------- helpers ---------- */

const parseDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

const formatDate = (d) =>
  d ? d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '';

const timeAgo = (d, now) => {
  if (!d) return '';
  const diffDays = Math.floor((now - d.getTime()) / DAY_MS);
  if (diffDays < 0) return 'Upcoming';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) {
    const m = Math.floor(diffDays / 30);
    return `${m} month${m > 1 ? 's' : ''} ago`;
  }
  const y = Math.floor(diffDays / 365);
  return `${y} year${y > 1 ? 's' : ''} ago`;
};

const normalizeNotices = (raw) =>
  raw
    .map((n, i) => {
      const dateObj = parseDate(n.date);
      return {
        ...n,
        id: n.id ?? `notice-${i}`,
        dateObj,
        important: Boolean(n.important),
      };
    })
    // newest first; undated notices go last
    .sort((a, b) => (b.dateObj?.getTime() ?? 0) - (a.dateObj?.getTime() ?? 0));

const noticeToText = (n) =>
  [
    n.title,
    n.dateObj ? `Date: ${formatDate(n.dateObj)}` : '',
    '',
    n.fullDescription || n.description || '',
  ]
    .filter((line, i) => line !== '' || i > 0)
    .join('\n');

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60) || 'notice';

/* ---------- small icon helper ---------- */

const Icon = ({ d, className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d} />
  </svg>
);

const ICONS = {
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  chevron: 'M19 9l-7 7-7-7',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  megaphone:
    'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6m0 6a3 3 0 110-6m0 6v6m-4-6h8',
  inbox: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4l-2 3h-4l-2-3H4',
};

/* ---------- component ---------- */

const NoticeBoard = ({ studentData, links = DEFAULT_LINKS, onNavigate }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [feedback, setFeedback] = useState(''); // small status message for share/copy

  // Fixed "now" per mount so labels stay consistent during a render session.
  const now = useMemo(() => Date.now(), []);

  const notices = useMemo(() => {
    const raw = studentData?.notices;
    return normalizeNotices(Array.isArray(raw) ? raw : SAMPLE_NOTICES);
  }, [studentData]);

  const isNew = (n) => n.dateObj && now - n.dateObj.getTime() >= 0 && now - n.dateObj.getTime() <= NEW_DAYS * DAY_MS;
  const isLatest = (n) => n.dateObj && now - n.dateObj.getTime() <= LATEST_DAYS * DAY_MS;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notices.filter((n) => {
      if (filter === 'important' && !n.important) return false;
      if (filter === 'latest' && !isLatest(n)) return false;
      if (!q) return true;
      return (
        n.title?.toLowerCase().includes(q) ||
        n.description?.toLowerCase().includes(q) ||
        n.fullDescription?.toLowerCase().includes(q)
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notices, query, filter]);

  const updates = Array.isArray(studentData?.updates) ? studentData.updates : [];

  const flash = (msg) => {
    setFeedback(msg);
    window.setTimeout(() => setFeedback(''), 2500);
  };

  const handleDownload = (e, notice) => {
    e.stopPropagation();
    if (notice.pdfUrl) {
      window.open(notice.pdfUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    // No PDF from backend: download notice content as a text file.
    const blob = new Blob([noticeToText(notice)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slugify(notice.title)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleShare = async (e, notice) => {
    e.stopPropagation();
    const text = noticeToText(notice);
    try {
      if (navigator.share) {
        await navigator.share({ title: notice.title, text, url: window.location.href });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
        flash('Notice copied to clipboard');
      } else {
        flash('Sharing is not supported on this device');
      }
    } catch (err) {
      // user cancelled share sheet -> ignore; real failures show a message
      if (err?.name !== 'AbortError') flash('Could not share this notice');
    }
  };

  const handleLinkClick = (e, href) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 p-6 text-white">
        {/* <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
            <Icon d={ICONS.megaphone} className="w-8 h-8" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-bold">Notice Board</h2>
            <p className="text-orange-100 text-sm md:text-base">
              Latest announcements and updates for students
            </p>
          </div>
        </div>
      </div> */}
      {/* Important Links */}
      {links.length > 0 && (
        <section>
          {/* <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
            Important Links
          </h3> */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {links.map((link) => {
              const c = COLOR_STYLES[link.color] || COLOR_STYLES.blue;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="group p-4 bg-white rounded-xl text-center shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div
                    className={`w-10 h-10 mx-auto mb-2 rounded-xl flex items-center justify-center ${c.bg}`}
                  >
                    <Icon d={link.icon} className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">{link.name}</p>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Icon d={ICONS.search} className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notices..."
            aria-label="Search notices"
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2" role="tablist" aria-label="Notice filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                filter === f.key
                  ? 'bg-indigo-500 border-indigo-500 text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status message for share/copy */}
      <p className="text-xs text-indigo-600 " role="status" aria-live="polite">
        {feedback}
      </p>

      {/* Notice list */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
            <Icon d={ICONS.inbox} className="w-7 h-7" />
          </div>
          <h3 className="font-semibold text-gray-800">No notices found</h3>
          <p className="text-sm text-gray-500 mt-1">
            {query || filter !== 'all'
              ? 'Try a different search or filter.'
              : 'There are no announcements right now. Please check back later.'}
          </p>
          {(query || filter !== 'all') && (
            <button
              onClick={() => {
                setQuery('');
                setFilter('all');
              }}
              className="mt-4 px-4 py-1.5 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <ul className="space-y-4">
          {filtered.map((notice) => {
            const expanded = expandedId === notice.id;
            const body = notice.fullDescription || notice.description || '';
            return (
              <li
                key={notice.id}
                className={`bg-white rounded-2xl shadow-md overflow-hidden transition-shadow duration-200 hover:shadow-lg ${
                  expanded ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : notice.id)}
                  aria-expanded={expanded}
                  className={`w-full text-left p-5 transition-colors ${
                    isNew(notice) ? 'bg-orange-50 hover:bg-orange-100/70' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {isNew(notice) && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-semibold">
                            NEW
                          </span>
                        )}
                        {notice.important && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-semibold">
                            Important
                          </span>
                        )}
                        {notice.dateObj && (
                          <>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Icon d={ICONS.calendar} className="w-3 h-3" />
                              {formatDate(notice.dateObj)}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Icon d={ICONS.clock} className="w-3 h-3" />
                              {timeAgo(notice.dateObj, now)}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-800 text-base md:text-lg">{notice.title}</h3>
                      {!expanded && body && (
                        <p className="text-gray-500 text-sm mt-2 truncate">{notice.description || body}</p>
                      )}
                    </div>
                    <Icon
                      d={ICONS.chevron}
                      className={`w-5 h-5 mt-1 shrink-0 text-gray-400 transition-transform duration-200 ${
                        expanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {expanded && (
                  <div className="px-5 pb-5 pt-4 border-t border-gray-100 bg-gray-50">
                    {body ? (
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{body}</p>
                    ) : (
                      <p className="text-gray-400 text-sm">No additional details were provided.</p>
                    )}
                    <div className="flex gap-3 mt-4">
                      <button
                        type="button"
                        onClick={(e) => handleDownload(e, notice)}
                        className="px-3 py-1.5 bg-indigo-500 text-white text-xs rounded-lg hover:bg-indigo-600 transition-colors"
                      >
                        {notice.pdfUrl ? 'Download PDF' : 'Download'}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleShare(e, notice)}
                        className="px-3 py-1.5 border border-gray-300 text-gray-600 text-xs rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      

      {/* Updates strip (only when backend provides updates) */}
      {updates.length > 0 && (
        <div className="bg-indigo-50 rounded-xl p-4 flex items-start gap-3">
          <span className="shrink-0 px-2 py-1 bg-indigo-500 text-white text-xs rounded-full">Updates</span>
          <ul className="text-sm text-gray-600 space-y-1">
            {updates.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;