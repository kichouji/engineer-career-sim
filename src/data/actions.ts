import type { Action } from '../types';

export const ACTIONS: Action[] = [
    // --- STUDY ---
    {
        id: 'study_tech_book',
        name: '技術書を読む',
        description: '基本を固めるのは大事。技術力が少し上がる。',
        type: 'STUDY',
        cost: { stamina: 10, mental: 5 },
        effect: { tech: 5, marketValue: 5 },
    },
    {
        id: 'study_personal_dev',
        name: '個人開発',
        description: '手を動かすのが一番の学習。技術力が大きく上がるが疲れる。',
        type: 'STUDY',
        cost: { stamina: 25, mental: 10 },
        effect: { tech: 15, marketValue: 20 },
    },

    // --- WORK ---
    {
        id: 'change_job',
        name: '転職活動',
        description: '市場価値に合わせて年収をリセットする。リスクも伴う。',
        type: 'WORK',
        cost: { stamina: 30, mental: 30 },
        effect: { marketValue: 5 }, // Minor boost to MV too
    },
    {
        id: 'work_hard',
        name: '案件に全力投入',
        description: '評価を上げるために必死に働く。業務理解と年収アップのチャンス。',
        type: 'WORK',
        cost: { stamina: 30, mental: 20 },
        effect: { biz: 10, salary: 20, marketValue: 15 },
    },
    {
        id: 'work_minimum',
        name: '最低限でやり過ごす',
        description: '定時退社は正義。体力とメンタルを温存する。',
        type: 'WORK',
        cost: { stamina: 5, mental: 5 },
        effect: { biz: 2, salary: 5 }, // Even minimum work gives tiny raise
    },

    // --- CONNECT ---
    {
        id: 'connect_sns',
        name: 'SNS発信',
        description: 'アウトプットは大事。知名度とコミュ力が上がる。',
        type: 'CONNECT',
        cost: { stamina: 5, mental: 15 },
        effect: { comm: 5, marketValue: 15 },
    },
    {
        id: 'connect_beer',
        name: '飲み会',
        description: '社内の人間関係を円滑にし、ストレスを発散する。',
        type: 'CONNECT',
        cost: { stamina: 15, mental: 0 },
        effect: { comm: 10, mental: 5, salary: 2 }, // Connection might help salary slightly
    },

    // --- REST ---
    {
        id: 'rest_sleep',
        name: '寝だめ',
        description: '泥のように眠る。体力が大幅に回復し、メンタルも回復する。',
        type: 'REST',
        cost: { stamina: 0, mental: 0 },
        effect: { stamina: 50, mental: 20 },
    },
    {
        id: 'rest_hobby',
        name: '趣味に没頭',
        description: '仕事のことを忘れる。メンタルが大幅に回復する。',
        type: 'REST',
        cost: { stamina: 5, mental: 0 },
        effect: { mental: 50 },
    },
];
