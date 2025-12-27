import React from 'react';
import type { GameEvent, EventChoice } from '../types';
import { IMAGES } from '../data/images';

interface EventModalProps {
    event: GameEvent;
    onChoose: (choice: EventChoice) => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onChoose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{event.title}</h2>
                </div>

                <div className="modal-body">
                    {event.image && (
                        <div className="event-image-container-modal">
                            <img src={IMAGES[event.image]} alt={event.title} className="event-modal-image" />
                        </div>
                    )}
                    <p className="event-description">{event.description}</p>
                </div>

                <div className="modal-choices">
                    {event.choices && event.choices.map((choice, index) => (
                        <button
                            key={index}
                            className="choice-button"
                            onClick={() => onChoose(choice)}
                        >
                            {choice.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
