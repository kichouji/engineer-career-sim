import { useReducer, useCallback } from 'react';
import type { GameState, GameAction, GameEvent, Status, LogType, LogEntry } from '../types';
import { INITIAL_GAME_STATE, MAX_YEAR, TARGET_SALARY } from '../data/constants';
import { ACTIONS } from '../data/actions';
import { EVENTS } from '../data/events';

// Helper to clamp values
const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

const getEffectSummary = (effect: Partial<Status>) => {
    const summaries: string[] = [];
    if ((effect.tech || 0) > 0) summaries.push('技術力が上がった');
    if ((effect.biz || 0) > 0) summaries.push('業務理解が深まった');
    if ((effect.comm || 0) > 0) summaries.push('コミュニケーション能力が上がった');
    if ((effect.stamina || 0) > 0) summaries.push('体力が回復した');
    if ((effect.mental || 0) > 0) summaries.push('メンタルが回復した');
    if ((effect.marketValue || 0) > 0) summaries.push('市場価値が上がった');
    if ((effect.salary || 0) > 0) summaries.push('年収が上がった');

    // Negative effects
    if ((effect.tech || 0) < 0) summaries.push('技術力が下がった');
    if ((effect.biz || 0) < 0) summaries.push('業務理解に支障が出た');
    if ((effect.comm || 0) < 0) summaries.push('コミュ力が下がった');
    if ((effect.stamina || 0) < 0) summaries.push('体力を消耗した');
    if ((effect.mental || 0) < 0) summaries.push('メンタルを削られた');
    if ((effect.marketValue || 0) < 0) summaries.push('市場価値が下がった');
    if ((effect.salary || 0) < 0) summaries.push('年収が下がった');

    return summaries.length > 0 ? summaries.join('、') + '。' : '';
};

function gameReducer(state: GameState, action: GameAction): GameState {
    console.log('Reducer Action:', action.type);
    switch (action.type) {
        case 'SELECT_ACTION': {
            const selectedAction = ACTIONS.find((a) => a.id === action.actionId);
            if (!selectedAction) return state;

            // Apply costs
            // Cost is subtracted
            let calculatedStamina = state.status.stamina - selectedAction.cost.stamina;
            let calculatedMental = state.status.mental - selectedAction.cost.mental;

            // Apply effects
            // Effect is added (can be negative too, but usually positive for rest)
            calculatedStamina += (selectedAction.effect.stamina || 0);
            calculatedMental += (selectedAction.effect.mental || 0);

            let newTech = state.status.tech + (selectedAction.effect.tech || 0);
            let newBiz = state.status.biz + (selectedAction.effect.biz || 0);
            let newComm = state.status.comm + (selectedAction.effect.comm || 0);
            let newMarketValue = state.status.marketValue + (selectedAction.effect.marketValue || 0);
            let newSalary = state.status.salary + (selectedAction.effect.salary || 0);

            // Special Logic for Job Change
            if (action.actionId === 'change_job') {
                if (newMarketValue > newSalary) {
                    newSalary = newMarketValue;
                }
            }

            // Update history
            let historyText = `${state.year}年目 ${state.season + 1}Q: 「${selectedAction.name}」を行った。`;

            // Calculate net effect for summary (including costs for stamina/mental)
            const netEffect: Partial<Status> = {
                ...selectedAction.effect,
                stamina: (selectedAction.effect.stamina || 0) - selectedAction.cost.stamina,
                mental: (selectedAction.effect.mental || 0) - selectedAction.cost.mental,
            };

            const summary = getEffectSummary(netEffect);
            if (summary) {
                historyText += ` ${summary}`;
            }

            if (action.actionId === 'change_job') {
                historyText += ` 新たな環境での挑戦が始まった。年収が見直された！`;
            }
            const logType: LogType = selectedAction.type.toLowerCase() as LogType;
            const newHistory = [...state.history, { text: historyText, type: logType }];

            // Next season logic
            let nextSeason = state.season + 1;
            let nextYear = state.year;
            if (nextSeason > 3) {
                nextSeason = 0;
                nextYear++;
            }

            // Check Game Over / Clear first
            let isGameOver = false;
            let gameResult: GameState['gameResult'] = null;

            if (calculatedStamina <= 0 || calculatedMental <= 0) {
                isGameOver = true;
                newHistory.push({ text: '体調を崩してしまい、エンジニアを続けることができなくなった...', type: 'danger' });
                gameResult = 'C';
            } else if (newSalary >= TARGET_SALARY) {
                isGameOver = true;
                newHistory.push({ text: `ついに年収${TARGET_SALARY}万円を達成した！`, type: 'success' });
                // Calculate Rank
                if (state.year <= 7) gameResult = 'S';
                else if (state.year <= 9) gameResult = 'A';
                else if (state.year <= 11) gameResult = 'B';
                else gameResult = 'C';
            } else if (nextYear > MAX_YEAR) {
                isGameOver = true;
                newHistory.push({ text: '定年を迎えた。', type: 'info' });
                gameResult = 'C';
            }

            // Random Event Logic (Only if not game over)
            let nextEvent: GameEvent | null = null;
            if (!isGameOver) {
                // 40% chance of random event (Increased from 20%)
                if (Math.random() < 0.4) {
                    // Pick random event excluding start_game
                    const randomEvents = EVENTS.filter(e => e.id !== 'start_game');
                    if (randomEvents.length > 0) {
                        nextEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];
                    }
                }
            }

            return {
                ...state,
                year: nextYear,
                season: nextSeason,
                status: {
                    tech: clamp(newTech, 0, 999),
                    biz: clamp(newBiz, 0, 999),
                    comm: clamp(newComm, 0, 999),
                    stamina: clamp(calculatedStamina, 0, 100),
                    mental: clamp(calculatedMental, 0, 100),
                    marketValue: newMarketValue,
                    salary: newSalary,
                },
                currentEvent: nextEvent,
                lastActionType: selectedAction.type,
                lastActionId: selectedAction.id,
                history: newHistory,
                isGameOver,
                gameResult,
            };
        }

        case 'APPLY_EVENT': {
            // Placeholder for future logic if needed
            return state;
        }

        // We need a new action type for applying choice
        case 'APPLY_EVENT_CHOICE': { // @ts-ignore - defining locally for now or need to update types
            // @ts-ignore
            const { effect, label, eventTitle } = action;

            const newTech = state.status.tech + (effect.tech || 0);
            const newBiz = state.status.biz + (effect.biz || 0);
            const newComm = state.status.comm + (effect.comm || 0);
            const newStamina = state.status.stamina + (effect.stamina || 0);
            const newMental = state.status.mental + (effect.mental || 0);
            const newMarketValue = state.status.marketValue + (effect.marketValue || 0);
            const newSalary = state.status.salary + (effect.salary || 0);

            const resultText = `イベント「${eventTitle}」: ${label} を選択した。\n` +
                (effect.stamina ? `体力 ${effect.stamina > 0 ? '+' : ''}${effect.stamina} ` : '') +
                (effect.mental ? `メンタル ${effect.mental > 0 ? '+' : ''}${effect.mental} ` : '') +
                (effect.tech ? `技術 ${effect.tech > 0 ? '+' : ''}${effect.tech} ` : '') +
                (effect.biz ? `業務理解 ${effect.biz > 0 ? '+' : ''}${effect.biz} ` : '') +
                (effect.comm ? `コミュ ${effect.comm > 0 ? '+' : ''}${effect.comm} ` : '') +
                (effect.marketValue ? `市場価値 ${effect.marketValue > 0 ? '+' : ''}${effect.marketValue} ` : '') +
                (effect.salary ? `年収 ${effect.salary > 0 ? '+' : ''}${effect.salary} ` : '');

            const summary = getEffectSummary(effect);
            const historyText = `イベント「${eventTitle}」: ${label} を選択した。${summary ? ` ${summary}` : ''}`;
            const newHistory: LogEntry[] = [...state.history, { text: historyText, type: 'event' } as LogEntry];

            return {
                ...state,
                status: {
                    tech: clamp(newTech, 0, 999),
                    biz: clamp(newBiz, 0, 999),
                    comm: clamp(newComm, 0, 999),
                    stamina: clamp(newStamina, 0, 100),
                    mental: clamp(newMental, 0, 100),
                    marketValue: newMarketValue,
                    salary: newSalary,
                },
                currentEvent: null, // Close event
                popupMessage: resultText, // Show result
                history: newHistory,
            };
        }

        case 'CLOSE_POPUP':
            return {
                ...state,
                popupMessage: null,
            };

        case 'RESTART_GAME':
            return {
                ...INITIAL_GAME_STATE,
                // Ensure deep copy for nested objects if needed, though INITIAL_GAME_STATE uses spread for status in constants.ts
                // But constants.ts does: status: { ...INITIAL_STATUS } which is good.
                // However, history array needs to be fresh.
                history: [...INITIAL_GAME_STATE.history],
                status: { ...INITIAL_GAME_STATE.status }
            };

        default:
            return state;
    }
}

export function useGameState() {
    const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);

    const selectAction = useCallback((actionId: string) => {
        dispatch({ type: 'SELECT_ACTION', actionId });
    }, []);

    const restartGame = useCallback(() => {
        dispatch({ type: 'RESTART_GAME' });
    }, []);

    const applyEventChoice = useCallback((effect: Partial<Status>, label: string, eventTitle: string) => {
        dispatch({ type: 'APPLY_EVENT_CHOICE', effect, label, eventTitle });
    }, []);

    const closePopup = useCallback(() => {
        dispatch({ type: 'CLOSE_POPUP' });
    }, []);

    return {
        state,
        selectAction,
        restartGame,
        applyEventChoice,
        closePopup,
    };
}
