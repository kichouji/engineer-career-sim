import type { GameState, Status } from '../types';

export const INITIAL_STATUS: Status = {
    tech: 10,
    biz: 10,
    comm: 10,
    stamina: 100,
    mental: 100,
    marketValue: 300,
    salary: 300,
};

export const INITIAL_GAME_STATE: GameState = {
    year: 1,
    season: 0,
    status: { ...INITIAL_STATUS },
    currentEvent: null,
    popupMessage: null,
    lastActionType: null,
    lastActionId: null,
    history: ['新卒エンジニアとしての生活が始まった。'],
    isGameOver: false,
    gameResult: null,
};

export const MAX_YEAR = 20; // Maximum years to play
export const TARGET_SALARY = 1000; // 1000万円
