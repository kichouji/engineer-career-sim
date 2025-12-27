import React, { useEffect, useRef } from 'react';
import { useGameState } from '../hooks/useGameState';
import { StatusPanel } from './StatusPanel';
import { ActionPanel } from './ActionPanel';
import { EventModal } from './EventModal';
import type { EventChoice } from '../types';

export const GameScreen: React.FC = () => {
    const { state, selectAction, restartGame, applyEventChoice, closePopup } = useGameState();
    const historyEndRef = useRef<HTMLDivElement>(null);
    const [isEventVisible, setIsEventVisible] = React.useState(false);

    // Delay event visibility
    useEffect(() => {
        if (state.currentEvent) {
            const timer = setTimeout(() => setIsEventVisible(true), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsEventVisible(false);
        }
    }, [state.currentEvent]);

    // Auto-scroll history
    useEffect(() => {
        historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [state.history]);

    const handleEventChoice = (choice: EventChoice) => {
        if (state.currentEvent) {
            applyEventChoice(choice.effect, choice.label, state.currentEvent.title);
        }
    };

    if (state.isGameOver) {
        return (
            <div className="game-over-screen">
                <h1>GAME OVER</h1>
                <p className="result-rank">ランク: {state.gameResult}</p>
                <p>{state.history[state.history.length - 1].text}</p>

                <div className="final-stats">
                    <p>最終年収: {state.status.salary}万円</p>
                    <p>経過年数: {state.year}年</p>
                </div>

                <button onClick={restartGame} className="restart-button">
                    もう一度挑戦する
                </button>
            </div>
        );
    }

    return (
        <div className="game-screen">
            {state.currentEvent && isEventVisible && (
                <EventModal
                    event={state.currentEvent}
                    onChoose={handleEventChoice}
                />
            )}

            {state.popupMessage && (
                <div className="modal-overlay" style={{ zIndex: 2000 }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>結果</h2>
                        </div>
                        <div className="modal-body" style={{ whiteSpace: 'pre-wrap' }}>
                            {state.popupMessage}
                        </div>
                        <div className="modal-choices">
                            <button className="choice-button" onClick={closePopup}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="left-pane">
                <div className="event-view">
                    <div className="event-image-container">
                        {/* Dynamic Image Display */}
                        {(() => {
                            let imageSrc = '/src/assets/bg_office.png'; // Default

                            // Special Actions
                            if (state.lastActionId === 'change_job') {
                                imageSrc = '/src/assets/action_job_change.png';
                            } else if (state.lastActionId === 'connect_sns') {
                                imageSrc = '/src/assets/action_sns_post.png';
                            } else if (state.lastActionId === 'work_minimum') {
                                imageSrc = '/src/assets/bg_office.png'; // Use office bg (not working hard)
                            } else if (state.lastActionType === 'STUDY') imageSrc = '/src/assets/action_study.png';
                            else if (state.lastActionType === 'WORK') imageSrc = '/src/assets/action_work.png';
                            else if (state.lastActionType === 'CONNECT') imageSrc = '/src/assets/action_connect.png';
                            else if (state.lastActionType === 'REST') imageSrc = '/src/assets/action_rest.png';

                            return <img src={imageSrc} alt="Event Scene" className="event-image" />;
                        })()}
                        <div className="overlay-text">
                            {state.year}年目 {state.season + 1}Q
                        </div>
                    </div>

                    <div className="history-log">
                        {state.history.map((log, i) => (
                            <p key={i} className={`log-entry ${log.type}`}>{log.text}</p>
                        ))}
                        <div ref={historyEndRef} />
                    </div>
                </div>
            </div>

            <div className="right-pane">
                <StatusPanel
                    status={state.status}
                    year={state.year}
                    season={state.season}
                />
                <ActionPanel
                    onSelectAction={selectAction}
                    stamina={state.status.stamina}
                    mental={state.status.mental}
                    disabled={!!state.currentEvent}
                />
            </div>
        </div>
    );
};
