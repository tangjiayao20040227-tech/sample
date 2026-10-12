import React, { useState } from 'react';
import { RecipeData } from '../data/editorialData';

interface RecipeModalProps {
  recipe: RecipeData;
  isSaved: boolean;
  onToggleSave: () => void;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  isSaved,
  onToggleSave,
  onClose,
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-surface flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-surface-pure border-b border-border-subtle px-margin h-14 flex items-center justify-between shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-space-xs text-ink-primary font-label-meta text-label-meta py-2 pr-3"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
          <span>Back</span>
        </button>
        <span className="font-display-masthead text-headline-md font-bold text-ink-primary">
          NYT Cooking
        </span>
        <button
          onClick={onToggleSave}
          className="px-space-sm py-space-xxs rounded bg-ink-primary text-on-primary font-label-meta text-label-meta flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-base">
            {isSaved ? 'bookmark' : 'bookmark_border'}
          </span>
          <span>{isSaved ? 'Saved' : 'Save Recipe'}</span>
        </button>
      </header>

      {/* Body */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-2xl mx-auto px-margin pt-space-lg pb-space-xxl">
          <span className="font-label-section-badge text-label-section-badge uppercase tracking-widest text-accent-breaking-red">
            {recipe.kicker}
          </span>
          <h1 className="font-headline-xl text-headline-xl text-ink-primary font-bold mt-space-xxs mb-space-xs">
            {recipe.title}
          </h1>
          <p className="font-label-meta text-label-meta text-ink-primary font-semibold mb-space-sm">
            {recipe.byline}
          </p>

          <p className="font-body-reading-md text-body-reading-md text-ink-secondary mb-space-md">
            {recipe.description}
          </p>

          <div className="rounded overflow-hidden bg-surface-container-high mb-space-md">
            <img
              src={recipe.image}
              alt={recipe.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Recipe Meta Grid */}
          <div className="grid grid-cols-3 gap-space-xs bg-surface-pure p-space-md rounded border border-border-subtle mb-space-lg">
            <div>
              <span className="font-label-timestamp text-label-timestamp uppercase text-ink-tertiary block">
                Total Time
              </span>
              <span className="font-label-meta text-label-meta font-bold text-ink-primary">
                {recipe.time}
              </span>
            </div>
            <div>
              <span className="font-label-timestamp text-label-timestamp uppercase text-ink-tertiary block">
                Yield
              </span>
              <span className="font-label-meta text-label-meta font-bold text-ink-primary">
                {recipe.yield}
              </span>
            </div>
            <div>
              <span className="font-label-timestamp text-label-timestamp uppercase text-ink-tertiary block">
                Rating
              </span>
              <span className="font-label-meta text-label-meta font-bold text-ink-primary">
                ★★★★★ ({recipe.ratingCount})
              </span>
            </div>
          </div>

          {/* Ingredients Checklist */}
          <div className="mb-space-xl">
            <div className="flex items-center justify-between mb-space-sm">
              <h2 className="font-headline-md text-headline-md font-bold text-ink-primary">
                Ingredients
              </h2>
              <span className="font-caption text-caption text-ink-tertiary">
                Tap to check off ({checkedIngredients.length}/{recipe.ingredients.length})
              </span>
            </div>
            <ul className="bg-surface-pure rounded border border-border-subtle divide-y divide-border-subtle">
              {recipe.ingredients.map((ing, idx) => {
                const checked = checkedIngredients.includes(idx);
                return (
                  <li key={idx}>
                    <button
                      onClick={() => toggleIngredient(idx)}
                      className="w-full px-space-md py-space-sm flex items-center gap-space-sm text-left hover:bg-surface-container-low"
                    >
                      <span className="material-symbols-outlined text-lg text-ink-primary">
                        {checked ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                      <span
                        className={`font-body-summary text-body-summary ${
                          checked ? 'line-through text-ink-tertiary' : 'text-ink-primary'
                        }`}
                      >
                        {ing}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Preparation Steps */}
          <div className="mb-space-xl">
            <h2 className="font-headline-md text-headline-md font-bold text-ink-primary mb-space-sm">
              Preparation
            </h2>
            <div className="space-y-space-md">
              {recipe.steps.map((step, idx) => {
                const done = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-space-md rounded border transition-colors cursor-pointer ${
                      done
                        ? 'bg-surface-container-low border-border-subtle opacity-75'
                        : 'bg-surface-pure border-border-subtle'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-space-xs">
                      <h3 className="font-label-section-badge text-label-section-badge uppercase text-ink-primary">
                        {step.title}
                      </h3>
                      <span className="font-label-timestamp text-label-timestamp text-accent-editorial-blue">
                        {done ? 'Completed ✓' : 'Mark Done'}
                      </span>
                    </div>
                    <p className="font-body-reading-md text-body-reading-md text-ink-secondary">
                      {step.instruction}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cooking Notes */}
          <div>
            <h2 className="font-headline-md text-headline-md font-bold text-ink-primary mb-space-sm">
              Subscriber Cooking Notes
            </h2>
            <div className="space-y-space-sm">
              {recipe.notes.map((note, idx) => (
                <div
                  key={idx}
                  className="bg-surface-pure p-space-md rounded border border-border-subtle"
                >
                  <div className="flex items-center justify-between mb-space-xxs">
                    <span className="font-label-meta text-label-meta font-bold text-ink-primary">
                      {note.author}
                    </span>
                    <span className="font-label-timestamp text-label-timestamp text-ink-tertiary">
                      {note.timeAgo}
                    </span>
                  </div>
                  <p className="font-body-summary text-body-summary text-ink-secondary">
                    {note.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
