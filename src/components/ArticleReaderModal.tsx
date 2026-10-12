import React, { useState } from 'react';
import { ArticleData, CommentItem } from '../data/editorialData';

interface ArticleReaderModalProps {
  article: ArticleData;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  isPlayingAudio: boolean;
  onToggleAudio: (articleId: string) => void;
  onClose: () => void;
  initialOpenComments?: boolean;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  isBookmarked,
  onToggleBookmark,
  isPlayingAudio,
  onToggleAudio,
  onClose,
  initialOpenComments = false,
}) => {
  const [fontScale, setFontScale] = useState<'sm' | 'md' | 'lg'>('md');
  const [showComments, setShowComments] = useState<boolean>(initialOpenComments);
  const [comments, setComments] = useState<CommentItem[]>(article.comments);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentLocation, setNewCommentLocation] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  const cycleFontSize = () => {
    setFontScale((prev) => (prev === 'sm' ? 'md' : prev === 'md' ? 'lg' : 'sm'));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const item: CommentItem = {
      id: `user-${Date.now()}`,
      author: newCommentName.trim() || 'Times Subscriber',
      location: newCommentLocation.trim() || 'New York',
      timeAgo: 'Just now',
      text: newCommentText.trim(),
      recommends: 1,
    };
    setComments([item, ...comments]);
    setNewCommentText('');
  };

  const handleShare = () => {
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const bodyFontSizeClass =
    fontScale === 'sm'
      ? 'text-[15px] leading-[24px]'
      : fontScale === 'lg'
      ? 'text-[20px] leading-[31px]'
      : 'text-body-reading-lg leading-[28px]';

  return (
    <div className="fixed inset-0 z-50 bg-surface flex flex-col overflow-hidden">
      {/* Top Sticky Editorial Reader Header */}
      <header className="bg-surface-pure border-b border-border-subtle px-margin h-14 flex items-center justify-between shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-space-xs text-ink-primary font-label-meta text-label-meta py-2 pr-3"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
          <span>Back</span>
        </button>
        <span className="font-display-masthead text-headline-md font-bold text-ink-primary select-none">
          The New York Times
        </span>
        <div className="flex items-center gap-space-xs">
          <button
            onClick={() => setShowComments((v) => !v)}
            className="px-2.5 py-1.5 rounded bg-surface-container text-ink-primary font-label-meta text-label-meta flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">forum</span>
            <span>{(article.commentCount || 0) + (comments.length - article.comments.length)}</span>
          </button>
        </div>
      </header>

      {/* Scrollable Article Canvas */}
      <div className="flex-1 overflow-y-auto pb-24">
        <article className="max-w-2xl mx-auto px-margin pt-space-lg pb-space-xxl">
          <div className="flex items-center justify-between gap-space-xs mb-space-xs">
            <span
              className={`font-label-section-badge text-label-section-badge uppercase tracking-widest ${
                article.isOpinion ? 'text-accent-breaking-red' : 'text-accent-editorial-blue'
              }`}
            >
              {article.kicker}
            </span>
            {article.updated && (
              <span className="font-label-timestamp text-label-timestamp text-ink-tertiary">
                {article.updated}
              </span>
            )}
          </div>

          <h1
            className={`font-headline-xl text-headline-xl text-ink-primary font-bold leading-tight tracking-tight mb-space-sm ${
              article.isOpinion ? 'italic' : ''
            }`}
          >
            {article.headline}
          </h1>

          <p className="font-body-reading-md text-body-reading-md text-ink-secondary leading-relaxed mb-space-md">
            {article.summary}
          </p>

          {/* Metadata & Quick Save Bar */}
          <div className="flex items-center justify-between py-space-sm px-space-md mb-space-md bg-surface-container-low rounded border border-border-subtle">
            <div className="flex flex-col">
              <span className="font-label-meta text-label-meta font-semibold text-ink-primary">
                {article.byline}
              </span>
              <span className="font-label-timestamp text-label-timestamp text-ink-tertiary mt-0.5">
                Oct. 12, 2026 • {article.readTime}
              </span>
            </div>
            <div className="flex items-center gap-space-sm">
              <button
                onClick={() => onToggleAudio(article.id)}
                className="px-space-sm py-space-xxs rounded-full bg-ink-primary text-on-primary font-label-meta text-label-meta flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-base">
                  {isPlayingAudio ? 'pause' : 'play_arrow'}
                </span>
                <span>{article.audioDuration || 'Listen'}</span>
              </button>
              <button
                onClick={() => onToggleBookmark(article.id)}
                aria-label="Bookmark article"
                className="w-9 h-9 flex items-center justify-center text-ink-primary"
              >
                <span className="material-symbols-outlined text-xl">
                  {isBookmarked ? 'bookmark' : 'bookmark_border'}
                </span>
              </button>
            </div>
          </div>

          {/* Lead Image */}
          {article.image && (
            <figure className="mb-space-lg">
              <div className="w-full rounded overflow-hidden bg-surface-container-high">
                <img
                  src={article.image}
                  alt={article.imageAlt || article.headline}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-80 object-cover"
                />
              </div>
              {(article.imageCaption || article.imageLocation) && (
                <figcaption className="mt-space-xs font-caption text-caption text-ink-tertiary">
                  {article.imageLocation && (
                    <span className="uppercase font-semibold text-ink-secondary mr-1.5">
                      {article.imageLocation} —
                    </span>
                  )}
                  {article.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Optional Takeaways */}
          {article.takeaways && article.takeaways.length > 0 && (
            <div className="bg-surface-pure rounded p-space-md border border-border-subtle mb-space-lg">
              <div className="flex items-center gap-space-xs mb-space-xs text-accent-editorial-blue">
                <span className="material-symbols-outlined text-base">summarize</span>
                <span className="font-label-section-badge text-label-section-badge uppercase">
                  Critical Takeaways
                </span>
              </div>
              <ul className="space-y-space-xs font-body-summary text-body-summary text-ink-primary">
                {article.takeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-space-xs">
                    <span className="text-accent-editorial-blue font-bold text-xs mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Body Paragraphs */}
          <div className={`font-body-reading-lg text-ink-primary space-y-space-lg ${bodyFontSizeClass}`}>
            {article.body.map((paragraph, index) => (
              <React.Fragment key={index}>
                <p
                  className={
                    index === 0
                      ? 'first-letter:font-display-masthead first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:leading-none'
                      : ''
                  }
                >
                  {paragraph}
                </p>

                {/* Insert Pull Quote after 2nd paragraph */}
                {index === 1 && article.pullQuote && (
                  <blockquote className="my-space-xl py-space-md border-y border-border-subtle">
                    <p className="font-headline-lg text-headline-lg italic text-ink-primary mb-space-xs">
                      “{article.pullQuote.quote}”
                    </p>
                    <cite className="not-italic font-label-meta text-label-meta text-ink-secondary">
                      — {article.pullQuote.attribution}
                    </cite>
                  </blockquote>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Optional Photo Essay Gallery */}
          {article.gallery && article.gallery.length > 0 && (
            <div className="mt-space-xl pt-space-lg border-t border-border-subtle space-y-space-md">
              <h3 className="font-label-section-badge text-label-section-badge uppercase tracking-wider text-ink-primary">
                Visual Dispatch • Iqaluit Portfolio
              </h3>
              {article.gallery.map((item, idx) => (
                <figure key={idx} className="bg-surface-pure p-space-sm rounded border border-border-subtle">
                  <img
                    src={item.src}
                    alt={item.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-52 object-cover rounded"
                  />
                  <figcaption className="mt-space-xs font-caption text-caption text-ink-secondary">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          {/* Reader Comments Section */}
          <section className="mt-space-xxl pt-space-lg border-t border-border-subtle">
            <div className="flex items-center justify-between mb-space-md">
              <h3 className="font-headline-md text-headline-md font-bold text-ink-primary">
                Reader Comments ({(article.commentCount || 0) + (comments.length - article.comments.length)})
              </h3>
              <button
                onClick={() => setShowComments((v) => !v)}
                className="font-label-meta text-label-meta text-accent-editorial-blue font-semibold"
              >
                {showComments ? 'Hide Comments' : 'Expand All'}
              </button>
            </div>

            {/* Submit Comment Form */}
            <form onSubmit={handleAddComment} className="bg-surface-pure p-space-md rounded border border-border-subtle mb-space-md space-y-space-xs">
              <p className="font-label-section-badge text-label-section-badge uppercase text-ink-secondary">
                Contribute to the Debate
              </p>
              <div className="grid grid-cols-2 gap-space-xs">
                <input
                  type="text"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  placeholder="Your Name"
                  className="px-space-sm py-space-xs bg-surface border border-border-subtle rounded font-caption text-caption text-ink-primary focus:outline-none focus:border-ink-primary"
                />
                <input
                  type="text"
                  value={newCommentLocation}
                  onChange={(e) => setNewCommentLocation(e.target.value)}
                  placeholder="City, State"
                  className="px-space-sm py-space-xs bg-surface border border-border-subtle rounded font-caption text-caption text-ink-primary focus:outline-none focus:border-ink-primary"
                />
              </div>
              <textarea
                rows={2}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Share your perspective on this story..."
                className="w-full px-space-sm py-space-xs bg-surface border border-border-subtle rounded font-body-summary text-body-summary text-ink-primary focus:outline-none focus:border-ink-primary"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-space-md py-space-xs bg-ink-primary text-on-primary font-label-meta text-label-meta rounded"
                >
                  Post Comment
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-space-sm">
              {comments.length === 0 ? (
                <p className="font-caption text-caption text-ink-tertiary py-space-sm">
                  Be the first subscriber to comment on this dispatch.
                </p>
              ) : (
                comments.map((c) => (
                  <div
                    key={c.id}
                    className="bg-surface-pure p-space-md rounded border border-border-subtle"
                  >
                    <div className="flex items-center justify-between mb-space-xxs">
                      <div className="flex items-center gap-space-xs">
                        <span className="font-label-meta text-label-meta font-bold text-ink-primary">
                          {c.author}
                        </span>
                        <span className="font-label-timestamp text-label-timestamp text-ink-tertiary">
                          • {c.location} • {c.timeAgo}
                        </span>
                      </div>
                      {c.isEditorPick && (
                        <span className="font-label-timestamp text-label-timestamp uppercase text-accent-editorial-blue font-semibold">
                          NYT Pick
                        </span>
                      )}
                    </div>
                    <p className="font-body-summary text-body-summary text-ink-secondary mb-space-xs">
                      {c.text}
                    </p>
                    <div className="font-label-timestamp text-label-timestamp text-ink-tertiary">
                      {c.recommends} Recommendations
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </article>
      </div>

      {/* Persistent Bottom Article Reader Ergonomics Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface-pure border-t border-border-subtle px-margin h-14 flex items-center justify-between z-50">
        <button
          onClick={cycleFontSize}
          className="flex items-center gap-1 px-space-sm py-space-xs rounded hover:bg-surface-container font-label-meta text-label-meta text-ink-primary"
        >
          <span className="material-symbols-outlined text-lg">format_size</span>
          <span>Text ({fontScale.toUpperCase()})</span>
        </button>

        <button
          onClick={() => onToggleAudio(article.id)}
          className="flex items-center gap-1 px-space-sm py-space-xs rounded hover:bg-surface-container font-label-meta text-label-meta text-ink-primary"
        >
          <span className="material-symbols-outlined text-lg">
            {isPlayingAudio ? 'pause_circle' : 'headphones'}
          </span>
          <span>{isPlayingAudio ? 'Pause Audio' : 'Listen'}</span>
        </button>

        <button
          onClick={() => onToggleBookmark(article.id)}
          className="flex items-center gap-1 px-space-sm py-space-xs rounded hover:bg-surface-container font-label-meta text-label-meta text-ink-primary"
        >
          <span className="material-symbols-outlined text-lg">
            {isBookmarked ? 'bookmark' : 'bookmark_border'}
          </span>
          <span>{isBookmarked ? 'Saved' : 'Save'}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 px-space-sm py-space-xs rounded hover:bg-surface-container font-label-meta text-label-meta text-ink-primary"
        >
          <span className="material-symbols-outlined text-lg">ios_share</span>
          <span>{copiedShare ? 'Link Copied' : 'Share'}</span>
        </button>
      </div>
    </div>
  );
};
