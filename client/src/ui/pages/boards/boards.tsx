import { useCallback, useEffect, useState } from 'react';
import './boards.css';
import type { BaseBoardResponse } from '../../../core/ServerAPI.ts';
import { BoardClient } from '../../../core/ServerAPI.ts';

type DeadPigeonBoard = BaseBoardResponse & { [key: string]: unknown };

const price = [20, 40, 80, 160];

const getNumbers = (board: DeadPigeonBoard): string[] => {
    return board.playedNumbers!
        .map((num) => typeof num === 'number' ? num.toString() : String(num ?? '').trim())
        .filter(Boolean);
};

const getPriceLabel = (board: DeadPigeonBoard): string => {
    return price[board.playedNumbers?.length! - 5].toString() || "Ukendt"
};

const getOwnerLabel = (board: DeadPigeonBoard): string => {
    return board.user?.fullName || "Ukendt"
};

function getWeekNumber(date: Date): number {
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);

    const firstThursday = new Date(target.getFullYear(), 0, 4);
    const diff = target.getTime() - firstThursday.getTime();

    return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
}

const getWeekLabel = (board: DeadPigeonBoard) => {
    return "Uge - " + board.games!.map((game) => " " + getWeekNumber(new Date(game.startTime!)))
};

const getStatusVariant = (board: DeadPigeonBoard): 'active' | 'ended' => {
   const weeks = board.games!.map((game) => getWeekNumber(new Date(game.startTime!)))
   const currentWeek = getWeekNumber(new Date())

   if (weeks.includes(currentWeek)) {
        return "active"
   } else {
        return "ended"
   }
};

export default function Boards() {
    const [boards, setBoards] = useState<DeadPigeonBoard[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    const fetchBoards = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const client = new BoardClient();
            const data = await client.getBoards();
            const enriched = (data ?? []).map((b) => ({ ...(b as Record<string, unknown>) })) as DeadPigeonBoard[];
            setBoards(enriched);
            setLastUpdated(new Date());
        } catch (err) {
            console.error('Failed to fetch boards', err);
            setError('Kunne ikke hente brætterne lige nu. Prøv igen om et øjeblik.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBoards();
    }, [fetchBoards]);

    const renderCards = () => {
        if (loading && boards.length === 0) {
            return (
                <div className="boards-grid">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div className="board-card skeleton" key={`skeleton-${index}`}>
                            <div className="skeleton-line short"></div>
                            <div className="skeleton-line"></div>
                            <div className="skeleton-line"></div>
                            <div className="skeleton-pills">
                                {Array.from({ length: 5 }).map((__, pillIndex) => (
                                    <span className="skeleton-pill" key={`pill-${pillIndex}`}></span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        if (!loading && boards.length === 0) {
            return (
                <div className="boards-empty-state">
                    <div className="empty-icon">🕊️</div>
                    <h3>Ingen brætter endnu</h3>
                    <p>Der er endnu ikke nogen registrerede brætter. Prøv at opdatere eller kom tilbage senere.</p>
                </div>
            );
        }

        return (
            <div className="boards-grid">
                {boards.map((board, index) => {
                    const numbers = getNumbers(board);
                    const priceLabel = getPriceLabel(board);
                    const ownerLabel = getOwnerLabel(board);
                    const weekLabel = getWeekLabel(board);
                    const statusVariant = getStatusVariant(board);
                    const title = `Bræt #${index + 1}`;

                    return (
                        <article className="board-card" key={(board.id as string) ?? `board-${index}`}>
                            <div className="board-card-header">
                                <span className={`board-status ${statusVariant}`}>{statusVariant === 'active' ? 'Aktiv' : 'Afsluttet'}</span>
                                {weekLabel && <span className="board-week">{weekLabel}</span>}
                            </div>

                            <h3 className="board-title">{title as string}</h3>
                            <p className="board-owner">Spiller: <strong>{ownerLabel}</strong></p>

                            <div className="board-meta">
                                <div>
                                    <span className="meta-label">Board ID</span>
                                    <span className="meta-value">{board.id ?? '—'}</span>
                                </div>
                                <div>
                                    <span className="meta-label">Pris</span>
                                    <span className="meta-value">{priceLabel ?? 'Ukendt'}</span>
                                </div>
                            </div>

                            {numbers.length > 0 && (
                                <div className="board-numbers">
                                    {numbers.map((num) => (
                                        <span className="number-chip" key={`${board.id ?? index}-${num}`}>
                                            {num}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </article>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="boards-page">
            <div className="boards-shell">
                <section className="boards-hero">
                    <div className="hero-icon">🕊️</div>
                    <div className="hero-copy">
                        <h1>Dead Pigeons Boards</h1>
                        <p>Få det fulde overblik over spillebrætter.</p>
                        {lastUpdated && (
                            <span className="hero-updated">Opdateret {lastUpdated.toLocaleTimeString('da-DK')}</span>
                        )}
                    </div>
                    <div className="hero-actions">
                        <button type="button" onClick={fetchBoards} disabled={loading}>
                            {loading ? 'Opdaterer...' : 'Opdater brætter'}
                        </button>
                    </div>
                </section>

                {error && <div className="boards-alert">{error}</div>}

                <section aria-live="polite">
                    {renderCards()}
                </section>
            </div>
        </div>
    );
}
