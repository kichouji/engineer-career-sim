export interface Status {
  tech: number; // 技術力
  biz: number;  // 業務理解
  comm: number; // コミュ力
  stamina: number; // 体力
  mental: number; // メンタル
  marketValue: number; // 市場価値
  salary: number; // 年収
}

export type ActionType = 'STUDY' | 'WORK' | 'CONNECT' | 'REST';

export interface Action {
  id: string;
  name: string;
  description: string;
  type: ActionType;
  cost: {
    stamina: number;
    mental: number;
  };
  effect: Partial<Status>;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  image?: string;
  choices?: EventChoice[];
  effects?: Partial<Status>;
}

export interface EventChoice {
  label: string;
  effect: Partial<Status>;
  nextEventId?: string;
}

export type LogType = 'info' | 'study' | 'work' | 'connect' | 'rest' | 'event' | 'danger' | 'success';

export interface LogEntry {
  text: string;
  type: LogType;
}

export interface GameState {
  year: number;
  season: number; // 0: Spring, 1: Summer, 2: Autumn, 3: Winter
  status: Status;
  currentEvent: GameEvent | null;
  popupMessage: string | null;
  lastActionType: ActionType | null;
  lastActionId: string | null;
  history: LogEntry[];
  isGameOver: boolean;
  gameResult: 'S' | 'A' | 'B' | 'C' | null;
}

export type GameAction =
  | { type: 'NEXT_TURN' }
  | { type: 'SELECT_ACTION'; actionId: string }
  | { type: 'APPLY_EVENT'; event: GameEvent }
  | { type: 'APPLY_EVENT_CHOICE'; effect: Partial<Status>; label: string; eventTitle: string }
  | { type: 'CLOSE_POPUP' }
  | { type: 'RESTART_GAME' };
