/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  ARTICLES,
  AUDIO_TRACKS,
  IMAGES,
  MIDTERM_TABS,
  RECIPES,
} from './data/editorialData';
import { GameModal, GameType } from './components/GameModal';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { RecipeModal } from './components/RecipeModal';

type BottomTab = 'today' | 'audio' | 'games' | 'cooking' | 'saved-account';
type MidtermTabKey = keyof typeof MIDTERM_TABS;

const MARKET_TICKERS = [
  'S&P 500 +0.4%',
  'Nasdaq +0.7%',
  'Dow +0.2%',
  '10-Yr Yield 3.92%',
];

export default function App() {
  // Navigation & Active Screen State
  const [activeTab, setActiveTab] = useState<BottomTab>('today');
  const [activeSection, setActiveSection] = useState<string>('Top Stories');
  const [midtermFilter, setMidtermFilter] = useState<MidtermTabKey>('Early Vote Tracker');
  const [marketIdx, setMarketIdx] = useState<number>(0);

  // Interactive Modals / Drawers
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [openArticleComments, setOpenArticleComments] = useState<boolean>(false);
  const [activeGame, setActiveGame] = useState<GameType | null>(null);
  const [activeRecipeOpen, setActiveRecipeOpen] = useState<boolean>(false);
  const [pollsModalOpen, setPollsModalOpen] = useState<boolean>(false);
  const [secureTipOpen, setSecureTipOpen] = useState<boolean>(false);
  const [todaysPaperOpen, setTodaysPaperOpen] = useState<boolean>(false);
  const [tipSubmitted, setTipSubmitted] = useState<boolean>(false);
  const [tipText, setTipText] = useState<string>('');
  const [profileImgError, setProfileImgError] = useState<boolean>(false);

  // Bookmarks & Saved Items
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([
    'wilderness-adventure-dogs',
  ]);
  const [recipeSaved, setRecipeSaved] = useState<boolean>(true);

  // Audio Player State
  const [activeAudioId, setActiveAudioId] = useState<string>('audio-saudi-airports');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioProgressSec, setAudioProgressSec] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const currentTrack =
    AUDIO_TRACKS.find((t) => t.id === activeAudioId) || AUDIO_TRACKS[0];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setAudioProgressSec((prev) => {
        if (prev + 1 >= currentTrack.durationSeconds) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, Math.round(1000 / playbackSpeed));
    return () => clearInterval(timer);
  }, [isPlaying, currentTrack.durationSeconds, playbackSpeed]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openArticle = (id: string, withComments = false) => {
    setOpenArticleComments(withComments);
    setActiveArticleId(id);
  };

  const handleToggleStoryAudio = (articleId?: string) => {
    if (articleId) {
      const matchingTrack = AUDIO_TRACKS.find((t) => t.articleId === articleId);
      if (matchingTrack && matchingTrack.id !== activeAudioId) {
        setActiveAudioId(matchingTrack.id);
        setAudioProgressSec(0);
        setIsPlaying(true);
        return;
      }
    }
    setIsPlaying((prev) => !prev);
  };

  const handleSectionSelect = (sectionName: string) => {
    setActiveSection(sectionName);
    setMenuOpen(false);
    if (sectionName === 'Cooking') {
      setActiveTab('cooking');
      return;
    }
    if (sectionName === 'Games') {
      setActiveTab('games');
      return;
    }
    setActiveTab('today');
    const targetId =
      sectionName === 'World' || sectionName === 'Top Stories'
        ? 'section-world'
        : sectionName === 'Politics' || sectionName === 'U.S.'
        ? 'section-politics'
        : sectionName === 'Opinion' || sectionName === 'Business'
        ? 'section-opinion'
        : sectionName === 'Arts' || sectionName === 'Lifestyle'
        ? 'section-great-read'
        : sectionName === 'The Athletic'
        ? 'section-daily-play'
        : 'section-world';
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const activeMidtermSpotlight = MIDTERM_TABS[midtermFilter];

  return (
    <div className="bg-surface font-body-reading-md text-ink-primary flex flex-col min-h-screen w-full">
      {/* Top Global Header — matches reference HTML & screenshot */}
      <header className="fixed top-0 w-full z-40 pt-safe bg-surface-pure/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-28 flex flex-col justify-between max-w-2xl mx-auto w-full">
          <div className="flex items-center justify-between px-margin pt-space-xs">
            <button
              aria-label="Open Sections Menu"
              onClick={() => setMenuOpen(true)}
              className="w-11 h-11 flex items-center justify-start text-ink-primary focus:outline-none"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <div
              onClick={() => {
                setActiveTab('today');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              <h1 className="font-display-masthead text-headline-xl tracking-tight text-ink-primary font-bold leading-none select-none">
                The New York Times
              </h1>
              <span className="hidden">Today</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <button
                aria-label="Saved Articles"
                onClick={() => setActiveTab('saved-account')}
                className="w-11 h-11 flex items-center justify-center text-ink-primary focus:outline-none relative"
              >
                <span className="material-symbols-outlined text-xl">
                  {bookmarkedIds.length > 0 ? 'bookmark' : 'bookmark_border'}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('saved-account')}
                aria-label="Subscriber Profile"
                className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-surface-container focus:outline-none"
              >
                {!profileImgError ? (
                  <img
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    onError={() => setProfileImgError(true)}
                    className="w-8 h-8 rounded-full object-cover"
                    src={IMAGES.profile}
                  />
                ) : (
                  <span className="font-display-masthead text-headline-md font-bold text-ink-primary leading-none">
                    Yo
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between px-margin py-space-xxs">
            <span className="font-label-timestamp text-label-timestamp uppercase text-ink-secondary tracking-wider">
              Monday, October 12, 2026
            </span>
            <div className="flex items-center gap-space-sm font-label-timestamp text-label-timestamp text-ink-secondary uppercase tracking-wider">
              <button
                onClick={() => setTodaysPaperOpen(true)}
                className="hover:text-ink-primary transition-colors uppercase"
              >
                Today&apos;s Paper
              </button>
              <span className="text-ink-tertiary">•</span>
              <button
                onClick={() => setMarketIdx((i) => (i + 1) % MARKET_TICKERS.length)}
                className="text-ink-primary font-medium uppercase"
              >
                {MARKET_TICKERS[marketIdx]}
              </button>
            </div>
          </div>

          <div className="flex items-center overflow-x-auto no-scrollbar px-margin gap-space-lg pb-space-xs">
            {[
              'Top Stories',
              'World',
              'U.S.',
              'Politics',
              'Business',
              'Opinion',
              'Tech',
              'Arts',
              'Lifestyle',
              'Cooking',
              'Games',
              'The Athletic',
            ].map((sec) => (
              <a
                key={sec}
                href={`#${sec.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionSelect(sec);
                }}
                className={`font-label-section-badge text-label-section-badge uppercase tracking-wider shrink-0 transition-colors ${
                  activeSection === sec ? 'text-ink-primary' : 'text-ink-secondary'
                }`}
              >
                {sec}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col relative w-full pt-28 pb-20 bg-surface min-h-screen max-w-2xl mx-auto">
        {activeTab === 'today' && (
          <div className="flex flex-col w-full">
            {/* Top Free Access Alert Bar */}
            <div className="px-margin pt-space-md pb-space-sm flex flex-col items-center justify-center text-center">
              <div className="inline-flex items-center gap-space-xs px-space-md py-space-xxs rounded-full bg-surface-container-high text-ink-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-editorial-blue animate-pulse"></span>
                <p className="font-label-meta text-label-meta tracking-normal">
                  These top stories are <span className="font-bold text-ink-primary">free to read</span>.
                </p>
              </div>
              <div className="w-10 h-0.5 bg-accent-editorial-blue mt-space-xs rounded-full opacity-60"></div>
            </div>

            {/* Main Hero Lead Package */}
            <article id="section-world" className="px-margin pt-space-xs pb-space-lg flex flex-col">
              <div className="flex items-center justify-between gap-space-xs mb-space-xs">
                <span className="font-label-section-badge text-label-section-badge text-accent-editorial-blue uppercase tracking-widest">
                  The World • Analysis
                </span>
                <span className="font-label-timestamp text-label-timestamp text-ink-tertiary">
                  Updated 14m ago
                </span>
              </div>

              <h2
                onClick={() => openArticle('saudi-yemeni-airports')}
                className="font-headline-xl text-headline-xl text-ink-primary font-bold leading-tight tracking-tight mb-space-sm cursor-pointer hover:opacity-85 transition-opacity"
              >
                Saudi and Yemeni Airports Are Hit in New Round of Strikes
              </h2>

              <p
                onClick={() => openArticle('saudi-yemeni-airports')}
                className="font-body-reading-md text-body-reading-md text-ink-secondary leading-relaxed mb-space-md cursor-pointer"
              >
                At least one person was killed in the Saudi capital, Riyadh, kingdom authorities said. The Houthis said Saudi aircraft hit the Yemeni capital’s airport.
              </p>

              {/* Reading Metadata & Quick Save Action */}
              <div className="flex items-center justify-between pb-space-md mb-space-md bg-surface-container-low px-space-md py-space-sm rounded">
                <div
                  onClick={() => openArticle('saudi-yemeni-airports')}
                  className="flex items-center gap-space-xs font-label-meta text-label-meta text-ink-secondary cursor-pointer"
                >
                  <span className="font-medium text-ink-primary">Cynthia Silva</span>
                  <span>&amp;</span>
                  <span className="font-medium text-ink-primary">Zach Wasser</span>
                  <span>•</span>
                  <span>3 min read</span>
                </div>
                <button
                  aria-label="Bookmark story"
                  onClick={() => toggleBookmark('saudi-yemeni-airports')}
                  className="text-ink-primary flex items-center justify-center p-space-xxs hover:opacity-70 transition-opacity"
                >
                  <span className="material-symbols-outlined text-lg">
                    {bookmarkedIds.includes('saudi-yemeni-airports')
                      ? 'bookmark'
                      : 'bookmark_border'}
                  </span>
                </button>
              </div>

              {/* Editorial Photography Container */}
              <div
                onClick={() => openArticle('saudi-yemeni-airports')}
                className="relative w-full rounded overflow-hidden bg-surface-container-high mb-space-md cursor-pointer"
              >
                <img
                  className="w-full h-64 object-cover"
                  referrerPolicy="no-referrer"
                  alt="Diplomatic assembly and high-level regional summit in Riyadh, Saudi Arabia"
                  src={IMAGES.riyadhSummit}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/70 via-transparent to-transparent flex flex-col justify-end p-space-md text-on-primary">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-label-timestamp text-label-timestamp uppercase tracking-wider text-surface-container-low">
                        Riyadh, Saudi Arabia
                      </p>
                      <p className="font-caption text-caption text-surface-container">
                        Summit hall amid escalating regional aviation strikes
                      </p>
                    </div>
                    <span className="font-display-masthead text-headline-sm font-bold opacity-80 select-none">
                      T
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Key Takeaways Pill Strip */}
              <div className="bg-surface-pure rounded p-space-md shadow-sm mb-space-md">
                <div className="flex items-center gap-space-xs mb-space-xs text-accent-editorial-blue">
                  <span className="material-symbols-outlined text-base">summarize</span>
                  <span className="font-label-section-badge text-label-section-badge uppercase">
                    Critical Takeaways
                  </span>
                </div>
                <ul className="space-y-space-xs font-body-summary text-body-summary text-ink-primary">
                  <li className="flex items-start gap-space-xs">
                    <span className="text-accent-editorial-blue font-bold text-xs mt-0.5">•</span>
                    <span>
                      Riyadh’s air defense systems intercepted multiple drones, but civilian terminals suffered structural damage.
                    </span>
                  </li>
                  <li className="flex items-start gap-space-xs">
                    <span className="text-accent-editorial-blue font-bold text-xs mt-0.5">•</span>
                    <span>
                      Sana’a international airport sustained direct runway strikes, halting humanitarian food transport.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Audio Brief Player Companion */}
              <div className="bg-surface-container p-space-md rounded flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-md">
                    <button
                      id="playBtn"
                      onClick={() => handleToggleStoryAudio('saudi-yemeni-airports')}
                      className="w-10 h-10 rounded-full bg-ink-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {isPlaying && activeAudioId === 'audio-saudi-airports'
                          ? 'pause'
                          : 'play_arrow'}
                      </span>
                    </button>
                    <div
                      onClick={() => handleToggleStoryAudio('saudi-yemeni-airports')}
                      className="flex flex-col cursor-pointer"
                    >
                      <span className="font-label-meta text-label-meta text-ink-primary font-bold">
                        Listen to This Story
                      </span>
                      <span className="font-caption text-caption text-ink-secondary">
                        {isPlaying && activeAudioId === 'audio-saudi-airports'
                          ? `${formatSeconds(audioProgressSec)} / 3:42 • Playing now`
                          : '3:42 • Narrated by The Times Audio'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('audio')}
                    aria-label="Open Times Audio"
                    className="text-ink-secondary hover:text-ink-primary"
                  >
                    <span className="material-symbols-outlined text-ink-secondary text-xl">
                      headphones
                    </span>
                  </button>
                </div>

                {isPlaying && activeAudioId === 'audio-saudi-airports' && (
                  <div className="w-full pt-space-xs">
                    <div className="w-full h-1 bg-surface-dim rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-editorial-blue transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            (audioProgressSec / 222) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Companion Analysis Card */}
              <div
                onClick={() => openArticle('saudi-strategic-analysis')}
                className="mt-space-md bg-surface-pure p-space-md rounded shadow-sm cursor-pointer hover:bg-surface-container-lowest transition-colors"
              >
                <span className="font-label-section-badge text-label-section-badge text-ink-tertiary uppercase">
                  Strategic Analysis
                </span>
                <h3 className="font-headline-md text-headline-md text-ink-primary font-semibold mt-space-xxs mb-space-xs">
                  Saudi Arabia Has Few Options as Houthis Aim at Heart of Its Ambitions
                </h3>
                <p className="font-body-summary text-body-summary text-ink-secondary mb-space-xs">
                  Vision 2030 projects and aviation corridors confront heightened geopolitical vulnerabilities after months of fragile detente.
                </p>
                <div className="flex items-center gap-space-sm font-label-timestamp text-label-timestamp text-ink-tertiary">
                  <span>6 min read</span>
                  <span>•</span>
                  <span className="text-accent-editorial-blue font-medium">Read Analysis →</span>
                </div>
              </div>
            </article>

            {/* Midterm Election Hub Section */}
            <section
              id="section-politics"
              className="bg-surface-container-low px-margin py-space-xl flex flex-col"
            >
              <div className="flex items-center justify-between mb-space-xs">
                <span className="font-label-section-badge text-label-section-badge text-accent-breaking-red uppercase tracking-wider">
                  Free Special Coverage
                </span>
                <span className="material-symbols-outlined text-accent-breaking-red text-base">
                  how_to_vote
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-ink-primary font-bold tracking-tight mb-space-xxs">
                2026 Midterm Elections
              </h2>
              <p className="font-caption text-caption text-ink-secondary mb-space-md">
                Live updates, candidate trackers, and polling analysis across key battlegrounds.
              </p>

              {/* Scrollable Election Filter Pills */}
              <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar pb-space-sm -mx-margin px-margin">
                {(Object.keys(MIDTERM_TABS) as MidtermTabKey[]).map((tabKey) => {
                  const isActive = midtermFilter === tabKey;
                  return (
                    <button
                      key={tabKey}
                      onClick={() => setMidtermFilter(tabKey)}
                      className={`${
                        isActive
                          ? 'bg-ink-primary text-on-primary'
                          : 'bg-surface-pure text-ink-primary shadow-sm'
                      } px-space-md py-space-xs rounded-full font-label-meta text-label-meta shrink-0 transition-colors`}
                    >
                      {tabKey}
                    </button>
                  );
                })}
              </div>

              {/* Election Feature Spotlight Tile */}
              <div
                onClick={() => openArticle(activeMidtermSpotlight.articleId)}
                className="bg-surface-pure rounded p-space-md shadow-sm mt-space-sm mb-space-md cursor-pointer"
              >
                <div className="flex flex-col gap-space-xs">
                  <span className="font-label-timestamp text-label-timestamp uppercase tracking-wider text-accent-editorial-blue">
                    {activeMidtermSpotlight.kicker}
                  </span>
                  <h3 className="font-headline-md text-headline-md text-ink-primary font-bold">
                    {activeMidtermSpotlight.headline}
                  </h3>
                  <p className="font-body-summary text-body-summary text-ink-secondary">
                    {activeMidtermSpotlight.summary}
                  </p>
                  <div className="flex items-center justify-between pt-space-xs mt-space-xs font-label-meta text-label-meta text-ink-tertiary">
                    <span>{activeMidtermSpotlight.byline}</span>
                    <span>{activeMidtermSpotlight.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Secondary Election Card */}
              <div
                onClick={() => openArticle('sc-senate-debate')}
                className="bg-surface-pure rounded p-space-md shadow-sm mb-space-md cursor-pointer"
              >
                <div className="flex items-start justify-between gap-space-md">
                  <div className="flex flex-col">
                    <span className="font-label-timestamp text-label-timestamp uppercase tracking-wider text-ink-tertiary">
                      South Carolina
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-ink-primary font-semibold mt-space-xxs mb-space-xs">
                      5 Takeaways From the Senate Debate
                    </h4>
                    <span className="font-caption text-caption text-ink-secondary">
                      Heated exchanges over rural health and infrastructure funding.
                    </span>
                    <span className="font-label-timestamp text-label-timestamp text-ink-tertiary mt-space-xs">
                      4 min read
                    </span>
                  </div>
                  <div className="w-20 h-20 bg-surface-container-high rounded shrink-0 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      alt="Heated political debate stage with podiums, broadcast television cameras"
                      src={IMAGES.senateDebate}
                    />
                  </div>
                </div>
              </div>

              {/* Polling Barometer Quick Grid */}
              <div className="bg-surface-container rounded p-space-md">
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-section-badge text-label-section-badge uppercase text-ink-primary">
                    The Latest Polls
                  </span>
                  <button
                    onClick={() => setPollsModalOpen(true)}
                    className="font-label-meta text-label-meta text-accent-editorial-blue font-medium"
                  >
                    Full Averages →
                  </button>
                </div>
                <div
                  onClick={() => setPollsModalOpen(true)}
                  className="grid grid-cols-2 gap-space-sm cursor-pointer"
                >
                  <div className="bg-surface-pure p-space-sm rounded shadow-sm">
                    <p className="font-label-timestamp text-label-timestamp uppercase text-ink-secondary">
                      Senate Control
                    </p>
                    <p className="font-headline-sm text-headline-sm text-ink-primary font-bold">
                      51-49 Tilt
                    </p>
                    <span className="font-caption text-caption text-accent-editorial-blue">
                      +1 Dem shift
                    </span>
                  </div>
                  <div className="bg-surface-pure p-space-sm rounded shadow-sm">
                    <p className="font-label-timestamp text-label-timestamp uppercase text-ink-secondary">
                      House Generic
                    </p>
                    <p className="font-headline-sm text-headline-sm text-ink-primary font-bold">
                      D +2.4%
                    </p>
                    <span className="font-caption text-caption text-ink-secondary">
                      22 tossups
                    </span>
                  </div>
                  <div className="bg-surface-pure p-space-sm rounded shadow-sm">
                    <p className="font-label-timestamp text-label-timestamp uppercase text-ink-secondary">
                      Governor Races
                    </p>
                    <p className="font-headline-sm text-headline-sm text-ink-primary font-bold">
                      36 Seats
                    </p>
                    <span className="font-caption text-caption text-ink-secondary">
                      5 battlegrounds
                    </span>
                  </div>
                  <div className="bg-surface-pure p-space-sm rounded shadow-sm">
                    <p className="font-label-timestamp text-label-timestamp uppercase text-ink-secondary">
                      Pres. Approval
                    </p>
                    <p className="font-headline-sm text-headline-sm text-ink-primary font-bold">
                      44.1%
                    </p>
                    <span className="font-caption text-caption text-ink-tertiary">
                      Stable / 7-day
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* The Great Read Package */}
            <section id="section-great-read" className="px-margin py-space-xl flex flex-col">
              <div className="flex items-center gap-space-xs mb-space-xs text-ink-secondary">
                <span className="material-symbols-outlined text-base">auto_stories</span>
                <span className="font-label-section-badge text-label-section-badge uppercase tracking-widest text-ink-primary">
                  The Great Read
                </span>
              </div>

              {/* Editorial Feature Presentation */}
              <div
                onClick={() => openArticle('wilderness-adventure-dogs')}
                className="bg-surface-pure rounded overflow-hidden shadow-sm flex flex-col mb-space-lg cursor-pointer"
              >
                <img
                  className="w-full h-56 object-cover"
                  referrerPolicy="no-referrer"
                  alt="Expansive frozen subarctic Canadian wilderness with snowcapped taiga, lonely sled dogs standing vigil"
                  src={IMAGES.sledDogs}
                />
                <div className="p-space-lg flex flex-col">
                  <h3 className="font-headline-lg text-headline-lg text-ink-primary font-bold leading-tight mb-space-sm">
                    He Went Out on an Epic Wilderness Adventure. Only His Dogs Came Back.
                  </h3>
                  <p className="font-body-reading-md text-body-reading-md text-ink-secondary leading-relaxed mb-space-md">
                    For three years and 750 miles, Steffen Skjottelvik lived a life of adventure. Until the adventure took his life.
                  </p>
                  <div className="flex items-center justify-between font-label-meta text-label-meta text-ink-tertiary">
                    <span className="font-medium text-ink-primary">
                      By Steffen Skjottelvik Archive
                    </span>
                    <span>14 min read</span>
                  </div>
                </div>
              </div>

              {/* Global Culture Narrative Card */}
              <div
                onClick={() => openArticle('inuit-culture-iqaluit')}
                className="bg-surface-container-high rounded p-space-md flex flex-col cursor-pointer"
              >
                <span className="font-label-timestamp text-label-timestamp uppercase tracking-wider text-accent-editorial-blue mb-space-xxs">
                  Arctic Canada • Culture
                </span>
                <h4 className="font-headline-md text-headline-md text-ink-primary font-bold mb-space-xs">
                  What Does It Mean to Be Inuit Now?
                </h4>
                <p className="font-body-summary text-body-summary text-ink-secondary mb-space-md">
                  In Iqaluit, the only city in Canada’s Arctic, a new generation of Inuit writers and artists is turning to questions of language, land and identity.
                </p>
                <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar pb-space-xs mb-space-sm">
                  <div className="w-28 h-20 rounded bg-surface-dim overflow-hidden shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      alt="Young Inuit artist carving soapstone sculpture inside warm creative studio in Iqaluit Nunavut"
                      src={IMAGES.inuit1}
                    />
                  </div>
                  <div className="w-28 h-20 rounded bg-surface-dim overflow-hidden shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      alt="Colorful Arctic homes along snowy tundra shoreline of Frobisher Bay in Iqaluit"
                      src={IMAGES.inuit2}
                    />
                  </div>
                  <div className="w-28 h-20 rounded bg-surface-dim overflow-hidden shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      alt="Traditional Inuit parkas and handmade modern textile fashion displayed in northern community gathering center"
                      src={IMAGES.inuit3}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between font-label-meta text-label-meta text-ink-tertiary">
                  <span>Photos by Renaud Philippe</span>
                  <span>6 min read</span>
                </div>
              </div>
            </section>

            {/* Opinion & Columns Tinted Panel */}
            <section id="section-opinion" className="bg-surface-warm px-margin py-space-xl flex flex-col">
              <div className="flex items-center justify-between mb-space-md">
                <div>
                  <span className="font-label-section-badge text-label-section-badge uppercase tracking-wider text-ink-primary">
                    Opinion
                  </span>
                  <h3 className="font-headline-lg text-headline-lg text-ink-primary font-bold">
                    Ideas &amp; Debates
                  </h3>
                </div>
                <span className="material-symbols-outlined text-ink-secondary">
                  chat_bubble_outline
                </span>
              </div>

              {/* Opinion Lead Feature */}
              <div
                onClick={() => openArticle('opinion-europe-identity')}
                className="bg-surface-pure rounded p-space-md shadow-sm mb-space-md cursor-pointer"
              >
                <div className="flex items-center gap-space-xs mb-space-xs text-ink-secondary">
                  <span className="font-label-timestamp text-label-timestamp uppercase tracking-wider">
                    Guest Essay
                  </span>
                  <span>•</span>
                  <span className="font-label-timestamp text-label-timestamp">9 min read</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-ink-primary font-bold italic mb-space-xs">
                  ‘It’s the Identity, Stupid!’: 3 Writers on Europe’s Rising Far Right
                </h4>
                <p className="font-body-summary text-body-summary text-ink-secondary mb-space-sm">
                  Economic grievances alone don’t explain populist ascents across the continent. Deep-rooted cultural anxieties are reshaping the electorate.
                </p>
                <div className="flex items-center justify-between pt-space-xs font-label-meta text-label-meta text-ink-primary font-medium">
                  <span>Broder, de Gruyter, Ferraresi &amp; Schneider</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openArticle('opinion-europe-identity', true);
                    }}
                    className="text-ink-tertiary flex items-center gap-space-xxs hover:text-ink-primary"
                  >
                    <span className="material-symbols-outlined text-sm">forum</span> 142
                  </button>
                </div>
              </div>

              {/* Economy Opinion Card */}
              <div
                onClick={() => openArticle('opinion-grocery-bill')}
                className="bg-surface-pure rounded p-space-md shadow-sm mb-space-md cursor-pointer"
              >
                <div className="flex items-center justify-between mb-space-xxs">
                  <span className="font-label-timestamp text-label-timestamp uppercase tracking-wider text-accent-breaking-red">
                    Economic Commentary
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openArticle('opinion-grocery-bill', true);
                    }}
                    className="font-label-meta text-label-meta text-ink-tertiary flex items-center gap-space-xxs hover:text-ink-primary"
                  >
                    <span className="material-symbols-outlined text-sm">forum</span> 201
                  </button>
                </div>
                <h4 className="font-headline-md text-headline-md text-ink-primary font-bold italic mb-space-xs">
                  Why Your Grocery Bill Will Get Worse
                </h4>
                <p className="font-body-summary text-body-summary text-ink-secondary mb-space-xs">
                  Persistent supply chain friction, fertilizer constraints, and climate shocks mean food costs are decoupling from top-line inflation metrics.
                </p>
                <p className="font-label-meta text-label-meta text-ink-primary font-medium">
                  By Kathleen Kingsbury and Peter R. Orszag
                </p>
              </div>

              {/* Human Interest Vignette */}
              <div
                onClick={() => openArticle('opinion-rooster-community')}
                className="bg-surface-pure rounded p-space-md shadow-sm cursor-pointer"
              >
                <div className="flex items-start gap-space-md">
                  <div className="flex flex-col flex-1">
                    <span className="font-label-timestamp text-label-timestamp uppercase text-ink-tertiary">
                      Community Dispatch
                    </span>
                    <h5 className="font-headline-sm text-headline-sm text-ink-primary font-semibold italic mt-space-xxs mb-space-xs">
                      The Rooster That Brought a Divided Community Together
                    </h5>
                    <span className="font-label-meta text-label-meta text-ink-primary">
                      By Lotte Salomons
                    </span>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-surface-container-high overflow-hidden shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      alt="Vibrant proud rooster in a sun-dappled European village courtyard in Hungary"
                      src={IMAGES.rooster}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Games & Daily Delights Carousel */}
            <section id="section-daily-play" className="px-margin py-space-xl flex flex-col">
              <div className="flex items-center justify-between mb-space-md">
                <div>
                  <span className="font-label-section-badge text-label-section-badge uppercase tracking-wider text-ink-primary">
                    Daily Play
                  </span>
                  <h3 className="font-headline-lg text-headline-lg text-ink-primary font-bold">
                    Games &amp; Puzzles
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('games')}
                  className="font-label-meta text-label-meta text-accent-editorial-blue font-semibold"
                >
                  All Games →
                </button>
              </div>

              <div className="grid grid-cols-3 gap-space-sm mb-space-lg">
                {/* Wordle Mini Card */}
                <button
                  onClick={() => setActiveGame('wordle')}
                  className="bg-surface-pure p-space-sm rounded shadow-sm flex flex-col items-center text-center active:scale-95 transition-transform"
                >
                  <div className="w-10 h-10 rounded bg-[#6AAA64] text-on-primary flex items-center justify-center font-bold text-lg mb-space-xs">
                    W
                  </div>
                  <span className="font-headline-sm text-headline-sm text-ink-primary font-bold">
                    Wordle
                  </span>
                  <span className="font-caption text-caption text-ink-secondary text-[11px] mt-space-xxs">
                    6 tries
                  </span>
                </button>

                {/* Connections Mini Card */}
                <button
                  onClick={() => setActiveGame('connections')}
                  className="bg-surface-pure p-space-sm rounded shadow-sm flex flex-col items-center text-center active:scale-95 transition-transform"
                >
                  <div className="w-10 h-10 rounded bg-[#B4A7D6] text-on-primary flex items-center justify-center font-bold text-lg mb-space-xs">
                    <span className="material-symbols-outlined text-xl">hub</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-ink-primary font-bold">
                    Connections
                  </span>
                  <span className="font-caption text-caption text-ink-secondary text-[11px] mt-space-xxs">
                    4 groups
                  </span>
                </button>

                {/* The Mini Crossword */}
                <button
                  onClick={() => setActiveGame('mini')}
                  className="bg-surface-pure p-space-sm rounded shadow-sm flex flex-col items-center text-center active:scale-95 transition-transform"
                >
                  <div className="w-10 h-10 rounded bg-ink-primary text-on-primary flex items-center justify-center font-bold text-lg mb-space-xs">
                    <span className="material-symbols-outlined text-xl">grid_4x4</span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-ink-primary font-bold">
                    The Mini
                  </span>
                  <span className="font-caption text-caption text-ink-secondary text-[11px] mt-space-xxs">
                    Solve in mins
                  </span>
                </button>
              </div>

              {/* Ecosystem Highlights: Cooking & The Athletic */}
              <div className="grid grid-cols-2 gap-space-md">
                {/* Cooking Spotlight */}
                <div
                  onClick={() => setActiveRecipeOpen(true)}
                  className="bg-surface-pure rounded overflow-hidden shadow-sm flex flex-col cursor-pointer"
                >
                  <img
                    className="w-full h-28 object-cover"
                    referrerPolicy="no-referrer"
                    alt="Freshly baked spiced pumpkin date tiramisù in a shallow ceramic dish"
                    src={IMAGES.tiramisu}
                  />
                  <div className="p-space-sm flex flex-col flex-1 justify-between">
                    <div>
                      <span className="font-label-timestamp text-label-timestamp uppercase tracking-wider text-ink-tertiary">
                        NYT Cooking
                      </span>
                      <p className="font-headline-sm text-headline-sm text-ink-primary font-bold mt-space-xxs leading-snug">
                        Pumpkin Date Tiramisù
                      </p>
                    </div>
                    <span className="font-caption text-caption text-accent-editorial-blue mt-space-xs font-medium">
                      Easy Autumn Dessert →
                    </span>
                  </div>
                </div>

                {/* The Athletic Spotlight */}
                <div
                  onClick={() => openArticle('athletic-lions-cardinals')}
                  className="bg-surface-pure rounded overflow-hidden shadow-sm flex flex-col cursor-pointer"
                >
                  <img
                    className="w-full h-28 object-cover"
                    referrerPolicy="no-referrer"
                    alt="NFL football stadium night game action, Detroit Lions players celebrating a decisive touchdown"
                    src={IMAGES.lions}
                  />
                  <div className="p-space-sm flex flex-col flex-1 justify-between">
                    <div>
                      <span className="font-label-timestamp text-label-timestamp uppercase tracking-wider text-ink-tertiary">
                        The Athletic
                      </span>
                      <p className="font-headline-sm text-headline-sm text-ink-primary font-bold mt-space-xxs leading-snug">
                        Lions Dominate Cardinals
                      </p>
                    </div>
                    <span className="font-caption text-caption text-accent-editorial-blue mt-space-xs font-medium">
                      Week 5 Breakdown →
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Confidential Tip Module & Editorial Trust Box */}
            <section className="px-margin pb-space-xxl">
              <div className="bg-surface-container rounded p-space-lg flex flex-col text-center items-center">
                <div className="w-10 h-10 rounded-full bg-surface-pure flex items-center justify-center text-ink-primary shadow-sm mb-space-sm">
                  <span className="material-symbols-outlined text-xl">lock</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-ink-primary font-bold mb-space-xs">
                  Got a Confidential News Tip?
                </h4>
                <p className="font-body-summary text-body-summary text-ink-secondary mb-space-md max-w-xs">
                  The Times offers several secure, encrypted channels to send important documents and information to our investigative reporters.
                </p>
                <button
                  onClick={() => {
                    setTipSubmitted(false);
                    setSecureTipOpen(true);
                  }}
                  className="inline-flex items-center justify-center px-space-lg py-space-xs bg-ink-primary text-on-primary font-label-meta text-label-meta uppercase tracking-wider rounded"
                >
                  Submit a Secure Tip
                </button>
              </div>

              {/* Editorial Sign-off Note */}
              <div className="mt-space-lg flex flex-col items-center justify-center text-center font-caption text-caption text-ink-tertiary space-y-space-xxs">
                <p>© 2026 The New York Times Company</p>
                <p className="text-[11px]">
                  Independent journalism supported directly by subscribers worldwide.
                </p>
              </div>
            </section>
          </div>
        )}

        {/* AUDIO TAB SCREEN */}
        {activeTab === 'audio' && (
          <div className="px-margin py-space-lg flex flex-col gap-space-lg">
            <div className="border-b border-border-subtle pb-space-sm">
              <span className="font-label-section-badge text-label-section-badge uppercase tracking-widest text-accent-editorial-blue">
                The Times Audio
              </span>
              <h2 className="font-headline-xl text-headline-xl font-bold text-ink-primary mt-0.5">
                Listen to Today’s Journalism
              </h2>
              <p className="font-body-summary text-body-summary text-ink-secondary mt-1">
                Narrated dispatches, daily podcasts, and long-form archival features.
              </p>
            </div>

            {/* Active Now Playing Deck */}
            <div className="bg-surface-pure rounded p-space-md shadow-sm border border-border-subtle">
              <div className="flex items-start gap-space-md mb-space-md">
                <img
                  src={currentTrack.image}
                  alt={currentTrack.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded object-cover shrink-0 bg-surface-container-high"
                />
                <div className="flex-1">
                  <span className="font-label-timestamp text-label-timestamp uppercase text-accent-editorial-blue font-semibold">
                    {currentTrack.show}
                  </span>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-ink-primary mt-0.5 mb-1">
                    {currentTrack.title}
                  </h3>
                  <span className="font-caption text-caption text-ink-tertiary">
                    {currentTrack.narrator} • {currentTrack.duration}
                  </span>
                </div>
              </div>

              {/* Scrubber */}
              <div className="mb-space-sm">
                <input
                  type="range"
                  min={0}
                  max={currentTrack.durationSeconds}
                  value={audioProgressSec}
                  onChange={(e) => setAudioProgressSec(Number(e.target.value))}
                  className="w-full accent-ink-primary cursor-pointer"
                />
                <div className="flex justify-between font-label-timestamp text-label-timestamp text-ink-tertiary">
                  <span>{formatSeconds(audioProgressSec)}</span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-between pt-space-xs">
                <button
                  onClick={() =>
                    setPlaybackSpeed((s) => (s === 1 ? 1.25 : s === 1.25 ? 1.5 : 1))
                  }
                  className="px-space-sm py-space-xxs rounded bg-surface-container font-label-meta text-label-meta text-ink-primary"
                >
                  {playbackSpeed}× Speed
                </button>
                <div className="flex items-center gap-space-md">
                  <button
                    onClick={() => setAudioProgressSec((p) => Math.max(0, p - 15))}
                    className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-ink-primary"
                  >
                    <span className="material-symbols-outlined text-lg">replay_10</span>
                  </button>
                  <button
                    onClick={() => setIsPlaying((p) => !p)}
                    className="w-12 h-12 rounded-full bg-ink-primary text-on-primary flex items-center justify-center shadow-sm"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      setAudioProgressSec((p) =>
                        Math.min(currentTrack.durationSeconds, p + 15)
                      )
                    }
                    className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-ink-primary"
                  >
                    <span className="material-symbols-outlined text-lg">forward_10</span>
                  </button>
                </div>
                {currentTrack.articleId && (
                  <button
                    onClick={() => openArticle(currentTrack.articleId!)}
                    className="font-label-meta text-label-meta text-accent-editorial-blue font-semibold"
                  >
                    Read Text →
                  </button>
                )}
              </div>

              {/* Synchronized Transcript Excerpt */}
              <div className="mt-space-md pt-space-sm border-t border-border-subtle">
                <span className="font-label-section-badge text-label-section-badge uppercase text-ink-tertiary block mb-space-xs">
                  Episode Transcript
                </span>
                <div className="space-y-space-xs font-body-summary text-body-summary text-ink-secondary">
                  {currentTrack.transcript.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Playlist Queue */}
            <div className="space-y-space-sm">
              <h3 className="font-label-section-badge text-label-section-badge uppercase text-ink-primary">
                Today’s Audio Queue
              </h3>
              {AUDIO_TRACKS.map((track) => {
                const selected = track.id === activeAudioId;
                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      setActiveAudioId(track.id);
                      setAudioProgressSec(0);
                      setIsPlaying(true);
                    }}
                    className={`p-space-md rounded flex items-center justify-between gap-space-md cursor-pointer border transition-colors ${
                      selected
                        ? 'bg-surface-pure border-ink-primary'
                        : 'bg-surface-pure border-border-subtle'
                    }`}
                  >
                    <div className="flex items-center gap-space-sm">
                      <img
                        src={track.image}
                        alt={track.title}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded object-cover shrink-0"
                      />
                      <div>
                        <span className="font-label-timestamp text-label-timestamp uppercase text-accent-editorial-blue">
                          {track.show}
                        </span>
                        <h4 className="font-headline-sm text-headline-sm font-semibold text-ink-primary">
                          {track.title}
                        </h4>
                        <span className="font-caption text-caption text-ink-tertiary">
                          {track.duration} • {track.narrator}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-2xl text-ink-primary shrink-0">
                      {selected && isPlaying ? 'pause_circle' : 'play_circle'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* GAMES TAB SCREEN */}
        {activeTab === 'games' && (
          <div className="px-margin py-space-lg flex flex-col gap-space-lg">
            <div className="border-b border-border-subtle pb-space-sm">
              <span className="font-label-section-badge text-label-section-badge uppercase tracking-widest text-ink-secondary">
                New York Times Games
              </span>
              <h2 className="font-headline-xl text-headline-xl font-bold text-ink-primary mt-0.5">
                Daily Puzzles • Oct. 12, 2026
              </h2>
              <p className="font-body-summary text-body-summary text-ink-secondary mt-1">
                Tap any puzzle below to play today’s interactive edition.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-space-md">
              <div
                onClick={() => setActiveGame('wordle')}
                className="bg-surface-pure p-space-lg rounded border border-border-subtle shadow-sm flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-space-md">
                  <div className="w-14 h-14 rounded bg-[#6AAA64] text-on-primary flex items-center justify-center font-bold text-2xl shrink-0">
                    W
                  </div>
                  <div>
                    <h3 className="font-headline-lg text-headline-lg font-bold text-ink-primary">
                      Wordle
                    </h3>
                    <p className="font-body-summary text-body-summary text-ink-secondary">
                      Guess the 5-letter word in 6 tries. Edited by Tracy Bennett.
                    </p>
                  </div>
                </div>
                <span className="px-space-md py-space-xs bg-ink-primary text-on-primary font-label-meta text-label-meta rounded-full shrink-0">
                  Play
                </span>
              </div>

              <div
                onClick={() => setActiveGame('connections')}
                className="bg-surface-pure p-space-lg rounded border border-border-subtle shadow-sm flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-space-md">
                  <div className="w-14 h-14 rounded bg-[#B4A7D6] text-on-primary flex items-center justify-center font-bold text-2xl shrink-0">
                    <span className="material-symbols-outlined text-3xl">hub</span>
                  </div>
                  <div>
                    <h3 className="font-headline-lg text-headline-lg font-bold text-ink-primary">
                      Connections
                    </h3>
                    <p className="font-body-summary text-body-summary text-ink-secondary">
                      Group words that share a common editorial thread. Edited by Wyna Liu.
                    </p>
                  </div>
                </div>
                <span className="px-space-md py-space-xs bg-ink-primary text-on-primary font-label-meta text-label-meta rounded-full shrink-0">
                  Play
                </span>
              </div>

              <div
                onClick={() => setActiveGame('mini')}
                className="bg-surface-pure p-space-lg rounded border border-border-subtle shadow-sm flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-space-md">
                  <div className="w-14 h-14 rounded bg-ink-primary text-on-primary flex items-center justify-center font-bold text-2xl shrink-0">
                    <span className="material-symbols-outlined text-3xl">grid_4x4</span>
                  </div>
                  <div>
                    <h3 className="font-headline-lg text-headline-lg font-bold text-ink-primary">
                      The Mini Crossword
                    </h3>
                    <p className="font-body-summary text-body-summary text-ink-secondary">
                      Solve this bite-sized puzzle in just a few moments. By Joel Fagliano.
                    </p>
                  </div>
                </div>
                <span className="px-space-md py-space-xs bg-ink-primary text-on-primary font-label-meta text-label-meta rounded-full shrink-0">
                  Play
                </span>
              </div>
            </div>
          </div>
        )}

        {/* COOKING TAB SCREEN */}
        {activeTab === 'cooking' && (
          <div className="px-margin py-space-lg flex flex-col gap-space-lg">
            <div className="border-b border-border-subtle pb-space-sm">
              <span className="font-label-section-badge text-label-section-badge uppercase tracking-widest text-accent-breaking-red">
                NYT Cooking
              </span>
              <h2 className="font-headline-xl text-headline-xl font-bold text-ink-primary mt-0.5">
                What to Cook This Week
              </h2>
              <p className="font-body-summary text-body-summary text-ink-secondary mt-1">
                Autumn desserts, weeknight skillets, and make-ahead classics tested by our kitchen.
              </p>
            </div>

            {RECIPES.map((rec) => (
              <div
                key={rec.id}
                onClick={() => setActiveRecipeOpen(true)}
                className="bg-surface-pure rounded overflow-hidden shadow-sm border border-border-subtle cursor-pointer"
              >
                <img
                  src={rec.image}
                  alt={rec.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-60 object-cover"
                />
                <div className="p-space-lg">
                  <span className="font-label-timestamp text-label-timestamp uppercase tracking-wider text-accent-breaking-red">
                    Recipe of the Day
                  </span>
                  <h3 className="font-headline-lg text-headline-lg font-bold text-ink-primary mt-1 mb-space-xs">
                    {rec.title}
                  </h3>
                  <p className="font-body-summary text-body-summary text-ink-secondary mb-space-md">
                    {rec.description}
                  </p>
                  <div className="flex items-center justify-between font-label-meta text-label-meta text-ink-tertiary">
                    <span className="text-ink-primary font-semibold">{rec.byline}</span>
                    <span>
                      ★★★★★ ({rec.ratingCount}) • {rec.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* YOU / SAVED ACCOUNT TAB SCREEN */}
        {activeTab === 'saved-account' && (
          <div className="px-margin py-space-lg flex flex-col gap-space-lg">
            <div className="bg-surface-pure p-space-lg rounded border border-border-subtle flex items-center gap-space-md">
              <div className="w-14 h-14 rounded-full bg-surface-container overflow-hidden flex items-center justify-center shrink-0">
                {!profileImgError ? (
                  <img
                    src={IMAGES.profile}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    onError={() => setProfileImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-display-masthead text-headline-lg font-bold text-ink-primary">
                    Yo
                  </span>
                )}
              </div>
              <div>
                <span className="font-label-section-badge text-label-section-badge uppercase text-accent-editorial-blue">
                  All Access Digital Subscriber
                </span>
                <h2 className="font-headline-lg text-headline-lg font-bold text-ink-primary">
                  Your Reading Desk
                </h2>
                <p className="font-caption text-caption text-ink-secondary">
                  Member since 2021 • News, Games, Cooking, Audio &amp; The Athletic
                </p>
              </div>
            </div>

            {/* Saved Articles List */}
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <h3 className="font-headline-md text-headline-md font-bold text-ink-primary">
                  Saved Articles ({bookmarkedIds.length})
                </h3>
                {bookmarkedIds.length === 0 && (
                  <span className="font-caption text-caption text-ink-tertiary">
                    Tap the bookmark icon on any story to save
                  </span>
                )}
              </div>

              <div className="space-y-space-sm">
                {bookmarkedIds.map((id) => {
                  const art = ARTICLES[id];
                  if (!art) return null;
                  return (
                    <div
                      key={id}
                      onClick={() => openArticle(id)}
                      className="bg-surface-pure p-space-md rounded border border-border-subtle flex items-start justify-between gap-space-md cursor-pointer"
                    >
                      <div>
                        <span className="font-label-timestamp text-label-timestamp uppercase text-accent-editorial-blue">
                          {art.kicker}
                        </span>
                        <h4 className="font-headline-sm text-headline-sm font-bold text-ink-primary mt-0.5 mb-1">
                          {art.headline}
                        </h4>
                        <span className="font-caption text-caption text-ink-tertiary">
                          {art.byline} • {art.readTime}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(id);
                        }}
                        aria-label="Remove bookmark"
                        className="p-1 text-ink-primary"
                      >
                        <span className="material-symbols-outlined text-lg">bookmark</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Saved Recipe */}
            {recipeSaved && (
              <div>
                <h3 className="font-headline-md text-headline-md font-bold text-ink-primary mb-space-sm">
                  Saved in Recipe Box
                </h3>
                <div
                  onClick={() => setActiveRecipeOpen(true)}
                  className="bg-surface-pure p-space-md rounded border border-border-subtle flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-label-timestamp text-label-timestamp uppercase text-accent-breaking-red">
                      NYT Cooking
                    </span>
                    <h4 className="font-headline-sm text-headline-sm font-bold text-ink-primary">
                      Pumpkin Date Tiramisù
                    </h4>
                    <span className="font-caption text-caption text-ink-tertiary">
                      By Yossy Arefi • 45 mins
                    </span>
                  </div>
                  <span className="font-label-meta text-label-meta text-accent-editorial-blue">
                    Open Recipe →
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Tab Navigation Bar — matches reference HTML & screenshot */}
      <nav
        className="fixed bottom-0 w-full z-40 pb-safe bg-surface-pure/95 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.04)]"
        data-active-classes="text-ink-primary font-bold"
      >
        <div className="flex items-center justify-around h-16 px-space-xs max-w-2xl mx-auto w-full">
          <a
            aria-current={activeTab === 'today' ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('today');
            }}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-colors ${
              activeTab === 'today' ? 'text-ink-primary font-bold' : 'text-ink-secondary'
            }`}
            data-path="today"
            href="#today"
          >
            <span className="material-symbols-outlined text-2xl">newspaper</span>
            <span className="font-caption text-caption text-[10px] tracking-tight">Today</span>
          </a>
          <a
            aria-current={activeTab === 'audio' ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('audio');
            }}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-colors ${
              activeTab === 'audio' ? 'text-ink-primary font-bold' : 'text-ink-secondary'
            }`}
            data-path="audio"
            href="#audio"
          >
            <span className="material-symbols-outlined text-2xl">headphones</span>
            <span className="font-caption text-caption text-[10px] tracking-tight">Audio</span>
          </a>
          <a
            aria-current={activeTab === 'games' ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('games');
            }}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-colors ${
              activeTab === 'games' ? 'text-ink-primary font-bold' : 'text-ink-secondary'
            }`}
            data-path="games"
            href="#games"
          >
            <span className="material-symbols-outlined text-2xl">extension</span>
            <span className="font-caption text-caption text-[10px] tracking-tight">Games</span>
          </a>
          <a
            aria-current={activeTab === 'cooking' ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('cooking');
            }}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-colors ${
              activeTab === 'cooking' ? 'text-ink-primary font-bold' : 'text-ink-secondary'
            }`}
            data-path="cooking"
            href="#cooking"
          >
            <span className="material-symbols-outlined text-2xl">skillet</span>
            <span className="font-caption text-caption text-[10px] tracking-tight">Cooking</span>
          </a>
          <a
            aria-current={activeTab === 'saved-account' ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('saved-account');
            }}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-colors ${
              activeTab === 'saved-account'
                ? 'text-ink-primary font-bold'
                : 'text-ink-secondary'
            }`}
            data-path="saved-account"
            href="#you"
          >
            <span className="material-symbols-outlined text-2xl">person</span>
            <span className="font-caption text-caption text-[10px] tracking-tight">You</span>
          </a>
        </div>
      </nav>

      {/* Sections Hamburger Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-ink-primary/40 flex">
          <div className="w-72 bg-surface-pure h-full p-space-lg flex flex-col justify-between overflow-y-auto shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-space-md border-b border-border-subtle">
                <span className="font-display-masthead text-headline-md font-bold text-ink-primary">
                  Sections
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close sections menu"
                  className="w-8 h-8 flex items-center justify-center text-ink-primary"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <ul className="py-space-md space-y-1">
                {[
                  'Top Stories',
                  'World',
                  'U.S.',
                  'Politics',
                  '2026 Midterms',
                  'Business',
                  'Opinion',
                  'Tech',
                  'Arts',
                  'Lifestyle',
                  'The Great Read',
                  'Cooking',
                  'Games',
                  'The Athletic',
                ].map((sec) => (
                  <li key={sec}>
                    <button
                      onClick={() => handleSectionSelect(sec)}
                      className="w-full text-left py-space-xs px-space-sm rounded hover:bg-surface-container font-label-meta text-label-meta font-semibold text-ink-primary flex items-center justify-between"
                    >
                      <span>{sec}</span>
                      <span className="material-symbols-outlined text-base text-ink-tertiary">
                        chevron_right
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-space-md border-t border-border-subtle font-caption text-caption text-ink-tertiary">
              Edition: U.S. • Monday, Oct. 12, 2026
            </div>
          </div>
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}

      {/* Full Article Reader Modal */}
      {activeArticleId && ARTICLES[activeArticleId] && (
        <ArticleReaderModal
          article={ARTICLES[activeArticleId]}
          isBookmarked={bookmarkedIds.includes(activeArticleId)}
          onToggleBookmark={toggleBookmark}
          isPlayingAudio={isPlaying}
          onToggleAudio={handleToggleStoryAudio}
          onClose={() => setActiveArticleId(null)}
          initialOpenComments={openArticleComments}
        />
      )}

      {/* Interactive NYT Games Modal */}
      {activeGame && (
        <GameModal
          game={activeGame}
          onClose={() => setActiveGame(null)}
          onSwitchGame={(g) => setActiveGame(g)}
        />
      )}

      {/* NYT Cooking Recipe Modal */}
      {activeRecipeOpen && (
        <RecipeModal
          recipe={RECIPES[0]}
          isSaved={recipeSaved}
          onToggleSave={() => setRecipeSaved((s) => !s)}
          onClose={() => setActiveRecipeOpen(false)}
        />
      )}

      {/* 2026 Midterm Polling Averages Modal */}
      {pollsModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink-primary/40 flex items-center justify-center p-margin">
          <div className="bg-surface-pure w-full max-w-md rounded p-space-lg border border-border-subtle shadow-xl">
            <div className="flex items-center justify-between pb-space-sm border-b border-border-subtle mb-space-md">
              <div>
                <span className="font-label-section-badge text-label-section-badge uppercase text-accent-breaking-red">
                  Times / Siena Polling Tracker
                </span>
                <h3 className="font-headline-lg text-headline-lg font-bold text-ink-primary">
                  2026 Battleground Averages
                </h3>
              </div>
              <button
                onClick={() => setPollsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-ink-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="space-y-space-sm mb-space-md">
              {[
                { state: 'Texas Senate', margin: 'R +1.8%', status: 'Tossup • Tightening' },
                { state: 'Ohio Senate', margin: 'D +1.2%', status: 'Tossup • Within MoE' },
                { state: 'Pennsylvania Senate', margin: 'D +3.4%', status: 'Lean Dem' },
                { state: 'Georgia Senate', margin: 'D +0.9%', status: 'Tossup • High Turnout' },
                { state: 'National House Generic', margin: 'D +2.4%', status: '22 Tossup Districts' },
              ].map((row) => (
                <div
                  key={row.state}
                  className="p-space-sm rounded bg-surface-container-low flex items-center justify-between"
                >
                  <div>
                    <p className="font-label-meta text-label-meta font-bold text-ink-primary">
                      {row.state}
                    </p>
                    <p className="font-caption text-caption text-ink-tertiary">{row.status}</p>
                  </div>
                  <span className="font-headline-sm text-headline-sm font-bold text-accent-editorial-blue">
                    {row.margin}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setPollsModalOpen(false)}
              className="w-full py-space-xs bg-ink-primary text-on-primary font-label-meta text-label-meta uppercase rounded"
            >
              Close Tracker
            </button>
          </div>
        </div>
      )}

      {/* Today's Paper Modal */}
      {todaysPaperOpen && (
        <div className="fixed inset-0 z-50 bg-ink-primary/40 flex items-center justify-center p-margin">
          <div className="bg-surface-pure w-full max-w-md rounded p-space-lg border border-border-subtle shadow-xl">
            <div className="flex items-center justify-between pb-space-sm border-b border-border-subtle mb-space-md">
              <div>
                <span className="font-label-timestamp text-label-timestamp uppercase text-ink-tertiary">
                  Vol. CLXXV . . . No. 61,042
                </span>
                <h3 className="font-display-masthead text-headline-lg font-bold text-ink-primary">
                  Today’s Print Edition
                </h3>
              </div>
              <button
                onClick={() => setTodaysPaperOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-ink-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="font-body-summary text-body-summary text-ink-secondary mb-space-md">
              Front Page replica for Monday, October 12, 2026 • Late City Final Edition.
            </p>
            <div className="space-y-space-xs mb-space-lg">
              {Object.values(ARTICLES)
                .slice(0, 5)
                .map((art) => (
                  <button
                    key={art.id}
                    onClick={() => {
                      setTodaysPaperOpen(false);
                      openArticle(art.id);
                    }}
                    className="w-full text-left p-space-sm rounded bg-surface-container-low hover:bg-surface-container flex items-center justify-between"
                  >
                    <div>
                      <span className="font-label-timestamp text-label-timestamp uppercase text-accent-editorial-blue">
                        Page A1 • {art.section}
                      </span>
                      <p className="font-headline-sm text-headline-sm font-bold text-ink-primary">
                        {art.headline}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-ink-tertiary">
                      arrow_forward
                    </span>
                  </button>
                ))}
            </div>
            <button
              onClick={() => setTodaysPaperOpen(false)}
              className="w-full py-space-xs bg-ink-primary text-on-primary font-label-meta text-label-meta uppercase rounded"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Confidential News Tip Modal */}
      {secureTipOpen && (
        <div className="fixed inset-0 z-50 bg-ink-primary/40 flex items-center justify-center p-margin">
          <div className="bg-surface-pure w-full max-w-md rounded p-space-lg border border-border-subtle shadow-xl">
            <div className="flex items-center justify-between pb-space-sm border-b border-border-subtle mb-space-md">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-ink-primary">lock</span>
                <h3 className="font-headline-md text-headline-md font-bold text-ink-primary">
                  Encrypted Tip Line
                </h3>
              </div>
              <button
                onClick={() => setSecureTipOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-ink-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            {tipSubmitted ? (
              <div className="py-space-md text-center space-y-space-sm">
                <p className="font-headline-sm text-headline-sm font-bold text-ink-primary">
                  Encrypted Payload Logged
                </p>
                <p className="font-body-summary text-body-summary text-ink-secondary">
                  Your submission has been routed to the Investigative Desk with zero metadata retention.
                </p>
                <button
                  onClick={() => setSecureTipOpen(false)}
                  className="px-space-lg py-space-xs bg-ink-primary text-on-primary font-label-meta text-label-meta uppercase rounded"
                >
                  Return to Front Page
                </button>
              </div>
            ) : (
              <div className="space-y-space-md">
                <p className="font-body-summary text-body-summary text-ink-secondary">
                  Send an anonymous lead to our investigative desk or connect via Signal (+1-646-883-0120) or SecureDrop.
                </p>
                <textarea
                  rows={3}
                  value={tipText}
                  onChange={(e) => setTipText(e.target.value)}
                  placeholder="Describe the documents or event (do not include personal identifiers unless desired)..."
                  className="w-full p-space-sm bg-surface border border-border-subtle rounded font-body-summary text-body-summary text-ink-primary focus:outline-none focus:border-ink-primary"
                />
                <div className="flex justify-end gap-space-xs">
                  <button
                    onClick={() => setSecureTipOpen(false)}
                    className="px-space-md py-space-xs border border-border-subtle font-label-meta text-label-meta text-ink-secondary rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setTipSubmitted(true);
                      setTipText('');
                    }}
                    className="px-space-md py-space-xs bg-ink-primary text-on-primary font-label-meta text-label-meta uppercase rounded"
                  >
                    Encrypt &amp; Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
