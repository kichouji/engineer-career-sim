import type { GameEvent } from '../types';

export const EVENTS: GameEvent[] = [
    // --- 初期イベント ---
    {
        id: 'start_game',
        title: 'SIer生活の始まり',
        description: '今日から君はSIerの新人エンジニアだ。「Excel方眼紙」と「スーツ」の世界へようこそ。まずは研修でビジネスマナーとJavaの基礎を叩き込まれる。',
        image: '/src/assets/bg_office.png',
        choices: [
            {
                label: '真面目に受ける',
                effect: { biz: 5, tech: 3, mental: -5 },
            },
            {
                label: 'こっそりモダン技術を勉強',
                effect: { tech: 8, biz: 0, mental: 5 },
            },
        ],
    },

    // --- 業務トラブル系 ---
    {
        id: 'legacy_system',
        title: '古の魔導書（レガシーコード）',
        description: '配属されたプロジェクトのソースコードは、誰も全容を知らない「秘伝のタレ」状態だった。コメントは10年前の日付...',
        image: '/src/assets/event_legacy_code.png',
        effects: { mental: -15 },
        choices: [
            {
                label: '解読に挑む',
                effect: { tech: 10, stamina: -20 },
            },
            {
                label: '見なかったことにする',
                effect: { mental: 5 }, // ストレス回避
            },
        ],
    },
    {
        id: 'spec_change',
        title: 'ちゃぶ台返し',
        description: '顧客「やっぱりこの機能、今の業務フローに合わないんで変えてください」\n納期は来週だ。',
        image: '/src/assets/action_work.png', // Fallback
        effects: { mental: -30 },
        choices: [
            {
                label: '残業でカバー',
                effect: { biz: 10, salary: 5, stamina: -40 },
            },
            {
                label: 'PMに調整を丸投げ',
                effect: { comm: 5, marketValue: -5 },
            },
        ],
    },
    {
        id: 'excel_hell',
        title: 'Excel方眼紙の悪夢',
        description: '設計書修正の依頼が来た。「セルの結合がズレてるから直して」という本質的でない指摘が100件...',
        image: '/src/assets/action_work.png', // Fallback
        effects: { mental: -10 },
        choices: [
            {
                label: '無心で直す',
                effect: { biz: 5, stamina: -10 },
            },
            {
                label: 'マクロで自動化を試みる',
                effect: { tech: 5, mental: 5 },
            },
        ],
    },

    // --- スキルアップ・キャリア系 ---
    {
        id: 'study_meeting',
        title: '社内勉強会への誘い',
        description: '意識高い系の先輩から、業務後の勉強会に誘われた。テーマは「最新クラウド技術について」。',
        image: '/src/assets/action_study.png', // Reuse
        choices: [
            {
                label: '参加する',
                effect: { tech: 8, comm: 5, stamina: -10 },
            },
            {
                label: '定時で帰る',
                effect: { mental: 10, stamina: 10 },
            },
        ],
    },
    {
        id: 'headhunter',
        title: '謎のヘッドハンター',
        description: 'LinkedInに英語のメッセージが来た。「あなたの経歴は素晴らしい。年収1.5倍の案件があります」...怪しいが気になる。',
        image: '/src/assets/bg_office.png', // Fallback
        choices: [
            {
                label: '話を聞いてみる',
                effect: { marketValue: 20, mental: 10 },
            },
            {
                label: '無視して業務に集中',
                effect: { biz: 5 },
            },
        ],
    },
    {
        id: 'new_tech_env',
        title: '隣の芝生は青い',
        description: 'Web系企業に行った大学時代の友人が、私服でフレックス出社し、Go言語で開発している話を聞いてしまった。',
        image: '/src/assets/action_work.png', // Fallback
        effects: { mental: -20 }, // 劣等感
        choices: [
            {
                label: '転職サイトに登録',
                effect: { marketValue: 10, mental: 5 },
            },
            {
                label: '今の現場で改革を起こす',
                effect: { biz: 10, tech: 5, stamina: -20 },
            },
        ],
    },

    // --- 人間関係系 ---
    {
        id: 'drinking_party',
        title: '炎上後の打ち上げ',
        description: 'デスマーチが終わり、プロジェクトメンバーで飲みに行くことに。',
        image: '/src/assets/action_connect.png', // Reuse
        choices: [
            {
                label: '朝まで飲む',
                effect: { comm: 15, stamina: -30, mental: 20 },
            },
            {
                label: '一次会で帰る',
                effect: { comm: 5, stamina: -10, mental: 10 },
            },
        ],
    }
];
