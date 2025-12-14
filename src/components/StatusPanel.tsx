import React from 'react';
import type { Status } from '../types';

interface StatusPanelProps {
    status: Status;
    year: number;
    season: number;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ status, year, season }) => {
    const seasons = ['春', '夏', '秋', '冬'];

    return (
        <div className="status-panel">
            <h2>現在のステータス</h2>
            <div className="status-time">
                {year}年目 {seasons[season]}
            </div>

            <div className="status-grid">
                <StatusItem label="技術力" value={status.tech} />
                <StatusItem label="業務理解" value={status.biz} />
                <StatusItem label="コミュ力" value={status.comm} />
                <StatusItem label="体力" value={status.stamina} max={100} />
                <StatusItem label="メンタル" value={status.mental} max={100} />
                <StatusItem label="市場価値" value={status.marketValue} unit="万円" />
                <StatusItem label="現在年収" value={status.salary} unit="万円" highlight />
            </div>
        </div>
    );
};

interface StatusItemProps {
    label: string;
    value: number;
    max?: number;
    unit?: string;
    highlight?: boolean;
}

const StatusItem: React.FC<StatusItemProps> = ({ label, value, max, unit = '', highlight }) => (
    <div className={`status-item ${highlight ? 'highlight' : ''}`}>
        <div className="label">{label}</div>
        <div className="value">
            {value}{unit} {max && <span className="max">/ {max}</span>}
        </div>
        {max && (
            <div className="bar-container">
                <div
                    className="bar"
                    style={{ width: `${(value / max) * 100}%` }}
                />
            </div>
        )}
    </div>
);
