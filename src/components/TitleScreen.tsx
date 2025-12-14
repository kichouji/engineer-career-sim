import React from 'react';

interface TitleScreenProps {
    onStart: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart }) => {
    return (
        <div className="title-screen">
            <h1>SIer新人エンジニア育成録</h1>
            <p className="subtitle">〜目指せ！年収1000万円エンジニア〜</p>

            <div className="intro-text">
                <p>あなたは文系卒の新入社員。</p>
                <p>プログラミング未経験の状態から、</p>
                <p>過酷なSIer業界を生き抜き、</p>
                <p>最強のエンジニアを目指せ！</p>
            </div>

            <button className="start-button" onClick={onStart}>
                ゲームスタート
            </button>
        </div>
    );
};
