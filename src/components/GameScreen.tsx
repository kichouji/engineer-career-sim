import React, { useEffect, useRef } from 'react';
import { useGameState } from '../hooks/useGameState';
import { StatusPanel } from './StatusPanel';
import { ActionPanel } from './ActionPanel';
import { EventModal } from './EventModal';
import type { EventChoice } from '../types';
import { IMAGES } from '../data/images';

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
                            let imageSrc = IMAGES.bg_office; // Default

                            // Special Actions
                            if (state.lastActionId === 'change_job') {
                                imageSrc = IMAGES.action_job_change;
                            } else if (state.lastActionId === 'connect_sns') {
                                imageSrc = IMAGES.action_sns_post;
                            } else if (state.lastActionId === 'work_minimum') {
                                imageSrc = IMAGES.bg_office; // Use office bg (not working hard)
                            } else if (state.lastActionType === 'STUDY') imageSrc = IMAGES.action_study;
                            else if (state.lastActionType === 'WORK') imageSrc = IMAGES.action_work;
                            else if (state.lastActionType === 'CONNECT') imageSrc = IMAGES.action_connect;
                            else if (state.lastActionType === 'REST') imageSrc = IMAGES.action_rest;

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
