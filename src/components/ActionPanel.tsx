import React from 'react';
import { ACTIONS } from '../data/actions';

interface ActionPanelProps {
    onSelectAction: (actionId: string) => void;
    stamina: number;
    mental: number;
    disabled?: boolean;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ onSelectAction, stamina, mental, disabled }) => {
    return (
        <div className="action-panel">
            <h3>行動選択</h3>
            <div className="action-list">
                {ACTIONS.map((action) => {
                    const canAfford = stamina >= action.cost.stamina && mental >= action.cost.mental;

                    // Calculate net changes
                    const netStamina = (action.effect.stamina || 0) - action.cost.stamina;
                    const netMental = (action.effect.mental || 0) - action.cost.mental;

                    const formatChange = (val: number, label: string) => {
                        if (val === 0) return null;
                        const sign = val > 0 ? '+' : '';
                        return <span className={val > 0 ? 'good' : 'bad'}>{label}{sign}{val}</span>;
                    };

                    return (
                        <button
                            key={action.id}
                            className={`action-button ${action.type.toLowerCase()}`}
                            onClick={() => onSelectAction(action.id)}
                            disabled={!canAfford || disabled}
                        >
                            <div className="action-name">{action.name}</div>
                            <div className="action-cost">
                                {formatChange(netStamina, '体')} {formatChange(netMental, 'メン')}
                                {/* Show other effects briefly if needed, but for now focus on Stamina/Mental as cost/resource */}
                                {/* Actually, user wants to know what happens. Maybe listing key ups is good? */}
                                {/* Let's at least ensure St/Me are clear. */}
                            </div>
                            <div className="action-desc">{action.description}</div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
