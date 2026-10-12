import React, { useState } from 'react';

export type GameType = 'wordle' | 'connections' | 'mini';

interface GameModalProps {
  game: GameType;
  onClose: () => void;
  onSwitchGame: (game: GameType) => void;
}

const WORDLE_SOLUTION = 'PRESS';
const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

interface ConnectionsGroup {
  category: string;
  words: string[];
  color: string;
}

const CONNECTIONS_GROUPS: ConnectionsGroup[] = [
  {
    category: 'NEWSPAPER SECTIONS',
    words: ['OPINION', 'WORLD', 'METRO', 'BUSINESS'],
    color: 'bg-[#F9DF6D] text-ink-primary',
  },
  {
    category: 'PRINTING PRESS TERMS',
    words: ['FOLIO', 'GUTTER', 'MASTHEAD', 'KERNING'],
    color: 'bg-[#A0C35A] text-ink-primary',
  },
  {
    category: 'COFFEE DRINKS',
    words: ['ESPRESSO', 'CORTADO', 'RISTRETTO', 'DOPPIO'],
    color: 'bg-[#B0C4EF] text-ink-primary',
  },
  {
    category: 'WORDS BEFORE "LINE"',
    words: ['BY', 'DEAD', 'HEAD', 'STORY'],
    color: 'bg-[#BA81C5] text-on-primary',
  },
];

// 3x3 compact Mini Crossword for fast mobile play
const MINI_SOLUTION = [
  ['N', 'Y', 'T'],
  ['E', 'R', 'A'],
  ['W', 'A', 'R'],
];

const MINI_CLUES = {
  across: [
    { num: 1, clue: 'Gray Lady initials (3)' },
    { num: 4, clue: 'Historic chapter or epoch (3)' },
    { num: 5, clue: 'Geopolitical conflict (3)' },
  ],
  down: [
    { num: 1, clue: 'Freshly printed, as news (3)' },
    { num: 2, clue: '365-day span, abbr. (3)' },
    { num: 3, clue: 'Runway surface material (3)' },
  ],
};

export const GameModal: React.FC<GameModalProps> = ({ game, onClose, onSwitchGame }) => {
  // Wordle State
  const [guesses, setGuesses] = useState<string[]>(['MEDIA']);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [wordleMessage, setWordleMessage] = useState<string>('Guess the 5-letter editorial word');

  // Connections State
  const initialPool = CONNECTIONS_GROUPS.flatMap((g) => g.words);
  const [remainingWords, setRemainingWords] = useState<string[]>([
    'OPINION', 'FOLIO', 'ESPRESSO', 'BY',
    'WORLD', 'GUTTER', 'CORTADO', 'DEAD',
    'METRO', 'MASTHEAD', 'RISTRETTO', 'HEAD',
    'BUSINESS', 'KERNING', 'DOPPIO', 'STORY',
  ]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [solvedGroups, setSolvedGroups] = useState<ConnectionsGroup[]>([]);
  const [mistakesLeft, setMistakesLeft] = useState<number>(4);
  const [connMessage, setConnMessage] = useState<string>('Create four groups of four!');

  // Mini Crossword State
  const [miniGrid, setMiniGrid] = useState<string[][]>([
    ['N', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [activeCell, setActiveCell] = useState<[number, number]>([0, 1]);
  const [miniSolved, setMiniSolved] = useState<boolean>(false);

  // Wordle Handlers
  const handleWordleKey = (key: string) => {
    if (guesses.includes(WORDLE_SOLUTION) || guesses.length >= 6) return;
    if (key === '⌫') {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (key === 'ENTER') {
      if (currentGuess.length < 5) {
        setWordleMessage('Not enough letters');
        return;
      }
      const next = [...guesses, currentGuess];
      setGuesses(next);
      setCurrentGuess('');
      if (currentGuess === WORDLE_SOLUTION) {
        setWordleMessage('Splendid! Solved in ' + next.length + '/6');
      } else if (next.length >= 6) {
        setWordleMessage(`Answer: ${WORDLE_SOLUTION}`);
      } else {
        setWordleMessage(`${6 - next.length} tries remaining`);
      }
      return;
    }
    if (currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  const getTileColor = (letter: string, index: number, isSubmitted: boolean) => {
    if (!isSubmitted) return 'bg-surface-pure border border-outline-variant text-ink-primary';
    if (WORDLE_SOLUTION[index] === letter) return 'bg-[#6AAA64] text-on-primary border-[#6AAA64]';
    if (WORDLE_SOLUTION.includes(letter)) return 'bg-[#C9B458] text-on-primary border-[#C9B458]';
    return 'bg-[#787C7E] text-on-primary border-[#787C7E]';
  };

  // Connections Handlers
  const toggleWord = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const submitConnections = () => {
    if (selectedWords.length !== 4) return;
    const match = CONNECTIONS_GROUPS.find((group) =>
      group.words.every((w) => selectedWords.includes(w))
    );
    if (match) {
      setSolvedGroups([...solvedGroups, match]);
      setRemainingWords(remainingWords.filter((w) => !selectedWords.includes(w)));
      setSelectedWords([]);
      setConnMessage(`Found: ${match.category}`);
    } else {
      const oneAway = CONNECTIONS_GROUPS.some(
        (group) => group.words.filter((w) => selectedWords.includes(w)).length === 3
      );
      setMistakesLeft((m) => Math.max(0, m - 1));
      setConnMessage(oneAway ? 'One away...' : 'Not quite a group. Try again.');
    }
  };

  const shuffleConnections = () => {
    setRemainingWords((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const solveOneConnectionsGroup = () => {
    const unsolved = CONNECTIONS_GROUPS.find(
      (g) => !solvedGroups.some((sg) => sg.category === g.category)
    );
    if (!unsolved) return;
    setSolvedGroups([...solvedGroups, unsolved]);
    setRemainingWords(remainingWords.filter((w) => !unsolved.words.includes(w)));
    setSelectedWords([]);
    setConnMessage(`Revealed: ${unsolved.category}`);
  };

  // Mini Handlers
  const handleMiniKey = (key: string) => {
    if (key === 'ENTER') return;
    const [r, c] = activeCell;
    const updated = miniGrid.map((row) => [...row]);
    if (key === '⌫') {
      updated[r][c] = '';
      setMiniGrid(updated);
      return;
    }
    updated[r][c] = key;
    setMiniGrid(updated);

    const isComplete = updated.every((row, ri) =>
      row.every((cell, ci) => cell === MINI_SOLUTION[ri][ci])
    );
    setMiniSolved(isComplete);

    // Move to next cell
    const nextFlat = (r * 3 + c + 1) % 9;
    setActiveCell([Math.floor(nextFlat / 3), nextFlat % 3]);
  };

  // Keep reference to initialPool to avoid unused warnings
  void initialPool;

  return (
    <div className="fixed inset-0 z-50 bg-ink-primary/40 backdrop-blur-xs flex items-end sm:items-center justify-center">
      <div className="bg-surface w-full max-w-lg max-h-[92dvh] flex flex-col rounded-t-xl sm:rounded-lg overflow-hidden shadow-xl border border-border-subtle">
        {/* Top Game Bar */}
        <div className="bg-surface-pure px-margin py-space-sm border-b border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <button
              onClick={() => onSwitchGame('wordle')}
              className={`px-space-sm py-space-xxs rounded font-label-meta text-label-meta transition-colors ${
                game === 'wordle'
                  ? 'bg-[#6AAA64] text-on-primary font-bold'
                  : 'bg-surface-container text-ink-secondary'
              }`}
            >
              Wordle
            </button>
            <button
              onClick={() => onSwitchGame('connections')}
              className={`px-space-sm py-space-xxs rounded font-label-meta text-label-meta transition-colors ${
                game === 'connections'
                  ? 'bg-[#B4A7D6] text-ink-primary font-bold'
                  : 'bg-surface-container text-ink-secondary'
              }`}
            >
              Connections
            </button>
            <button
              onClick={() => onSwitchGame('mini')}
              className={`px-space-sm py-space-xxs rounded font-label-meta text-label-meta transition-colors ${
                game === 'mini'
                  ? 'bg-ink-primary text-on-primary font-bold'
                  : 'bg-surface-container text-ink-secondary'
              }`}
            >
              The Mini
            </button>
          </div>
          <button
            onClick={onClose}
            aria-label="Close game"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container text-ink-primary"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Game Body */}
        <div className="p-margin overflow-y-auto flex-1 flex flex-col items-center">
          {game === 'wordle' && (
            <div className="w-full flex flex-col items-center">
              <div className="text-center mb-space-sm">
                <span className="font-label-timestamp text-label-timestamp uppercase tracking-wider text-ink-tertiary">
                  Monday, Oct. 12 • No. 1,574
                </span>
                <p className="font-label-meta text-label-meta text-ink-primary font-semibold mt-0.5">
                  {wordleMessage}
                </p>
              </div>

              {/* 6x5 Grid */}
              <div className="grid grid-rows-6 gap-1.5 mb-space-md">
                {Array.from({ length: 6 }).map((_, rowIndex) => {
                  const isSubmitted = rowIndex < guesses.length;
                  const word = isSubmitted
                    ? guesses[rowIndex]
                    : rowIndex === guesses.length
                    ? currentGuess
                    : '';
                  return (
                    <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
                      {Array.from({ length: 5 }).map((__, colIndex) => {
                        const letter = word[colIndex] || '';
                        return (
                          <div
                            key={colIndex}
                            className={`w-11 h-11 flex items-center justify-center font-headline-md text-lg font-bold uppercase rounded-xs ${getTileColor(
                              letter,
                              colIndex,
                              isSubmitted
                            )}`}
                          >
                            {letter}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Keyboard */}
              <div className="w-full max-w-sm space-y-1.5">
                {KEYBOARD_ROWS.map((row, idx) => (
                  <div key={idx} className="flex justify-center gap-1">
                    {row.map((key) => (
                      <button
                        key={key}
                        onClick={() => handleWordleKey(key)}
                        className={`${
                          key.length > 1 ? 'px-2.5 text-[11px]' : 'w-8 text-xs'
                        } h-10 rounded bg-surface-container-high text-ink-primary font-label-meta font-bold active:scale-95 transition-transform flex items-center justify-center`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {game === 'connections' && (
            <div className="w-full flex flex-col items-center">
              <p className="font-label-meta text-label-meta text-ink-primary font-semibold mb-space-sm">
                {connMessage}
              </p>

              {/* Solved Groups */}
              <div className="w-full space-y-2 mb-2">
                {solvedGroups.map((group) => (
                  <div
                    key={group.category}
                    className={`w-full p-space-sm rounded text-center ${group.color}`}
                  >
                    <p className="font-label-section-badge text-label-section-badge uppercase">
                      {group.category}
                    </p>
                    <p className="font-label-meta text-label-meta mt-0.5">
                      {group.words.join(', ')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Remaining 4x4 Grid */}
              <div className="w-full grid grid-cols-4 gap-1.5 mb-space-md">
                {remainingWords.map((word) => {
                  const selected = selectedWords.includes(word);
                  return (
                    <button
                      key={word}
                      onClick={() => toggleWord(word)}
                      className={`h-14 rounded px-1 font-label-section-badge text-[10px] sm:text-[11px] uppercase tracking-wide flex items-center justify-center text-center transition-colors ${
                        selected
                          ? 'bg-ink-primary text-on-primary'
                          : 'bg-surface-container-high text-ink-primary hover:bg-surface-dim'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>

              {/* Mistakes Counter */}
              <div className="flex items-center gap-space-xs mb-space-md font-caption text-caption text-ink-secondary">
                <span>Mistakes remaining:</span>
                <span className="font-bold text-ink-primary">{mistakesLeft}</span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-space-xs flex-wrap justify-center">
                <button
                  onClick={shuffleConnections}
                  className="px-space-md py-space-xs rounded-full border border-ink-primary font-label-meta text-label-meta text-ink-primary"
                >
                  Shuffle
                </button>
                <button
                  onClick={solveOneConnectionsGroup}
                  className="px-space-md py-space-xs rounded-full border border-ink-primary font-label-meta text-label-meta text-ink-primary"
                >
                  Hint
                </button>
                <button
                  onClick={() => setSelectedWords([])}
                  className="px-space-md py-space-xs rounded-full border border-ink-primary font-label-meta text-label-meta text-ink-primary"
                >
                  Deselect All
                </button>
                <button
                  onClick={submitConnections}
                  disabled={selectedWords.length !== 4}
                  className="px-space-md py-space-xs rounded-full bg-ink-primary text-on-primary font-label-meta text-label-meta disabled:opacity-40"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {game === 'mini' && (
            <div className="w-full flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-space-sm">
                <span className="font-label-timestamp text-label-timestamp uppercase text-ink-secondary">
                  By Joel Fagliano • 3×3 Express Edition
                </span>
                <button
                  onClick={() => {
                    setMiniGrid(MINI_SOLUTION.map((r) => [...r]));
                    setMiniSolved(true);
                  }}
                  className="font-label-meta text-label-meta text-accent-editorial-blue font-medium"
                >
                  Reveal Grid
                </button>
              </div>

              {miniSolved && (
                <div className="w-full bg-[#6AAA64]/15 border border-[#6AAA64] text-ink-primary px-space-md py-space-xs rounded mb-space-sm text-center font-label-meta text-label-meta font-bold">
                  Congratulations! You solved Today’s Mini Crossword!
                </div>
              )}

              {/* 3x3 Grid */}
              <div className="grid grid-cols-3 border-2 border-ink-primary mb-space-md">
                {miniGrid.map((row, rIdx) =>
                  row.map((cell, cIdx) => {
                    const isSelected = activeCell[0] === rIdx && activeCell[1] === cIdx;
                    const cellNum =
                      rIdx === 0 && cIdx === 0
                        ? 1
                        : rIdx === 0 && cIdx === 1
                        ? 2
                        : rIdx === 0 && cIdx === 2
                        ? 3
                        : rIdx === 1 && cIdx === 0
                        ? 4
                        : rIdx === 2 && cIdx === 0
                        ? 5
                        : null;
                    return (
                      <button
                        key={`${rIdx}-${cIdx}`}
                        onClick={() => setActiveCell([rIdx, cIdx])}
                        className={`w-16 h-16 border border-border-subtle relative flex items-center justify-center font-headline-lg text-xl font-bold ${
                          isSelected ? 'bg-[#A7D8FF]' : 'bg-surface-pure'
                        }`}
                      >
                        {cellNum && (
                          <span className="absolute top-1 left-1.5 font-label-timestamp text-[10px] text-ink-secondary">
                            {cellNum}
                          </span>
                        )}
                        <span>{cell}</span>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Clues */}
              <div className="w-full grid grid-cols-2 gap-space-md mb-space-md bg-surface-pure p-space-sm rounded border border-border-subtle">
                <div>
                  <p className="font-label-section-badge text-label-section-badge uppercase text-ink-primary mb-1">
                    Across
                  </p>
                  <ul className="space-y-1 font-caption text-caption text-ink-secondary">
                    {MINI_CLUES.across.map((c) => (
                      <li key={c.num}>
                        <strong className="text-ink-primary">{c.num}.</strong> {c.clue}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-label-section-badge text-label-section-badge uppercase text-ink-primary mb-1">
                    Down
                  </p>
                  <ul className="space-y-1 font-caption text-caption text-ink-secondary">
                    {MINI_CLUES.down.map((c) => (
                      <li key={c.num}>
                        <strong className="text-ink-primary">{c.num}.</strong> {c.clue}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Keyboard */}
              <div className="w-full max-w-sm space-y-1">
                {KEYBOARD_ROWS.map((row, idx) => (
                  <div key={idx} className="flex justify-center gap-1">
                    {row
                      .filter((k) => k !== 'ENTER')
                      .map((key) => (
                        <button
                          key={key}
                          onClick={() => handleMiniKey(key)}
                          className="w-8 h-9 rounded bg-surface-container-high text-ink-primary font-label-meta text-xs font-bold active:scale-95 flex items-center justify-center"
                        >
                          {key}
                        </button>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
