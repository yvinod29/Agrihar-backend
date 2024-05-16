import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Calendar } from 'react-multi-date-picker';

const CalenderComponent = ({ schedule }) => {
    const [selectedMode, setSelectedMode] = useState('offline');
    const [filteredDates, setFilteredDates] = useState([]);

    useEffect(() => {
        if (schedule) {
            const datesFromSchedule = schedule.flatMap(entry =>
                entry.classTime.map(timeEntry => ({
                    date: new Date(entry.classDate),
                    mode: timeEntry.mode
                }))
            );

            if (selectedMode === 'online') {
                const onlineDates = datesFromSchedule
                    .filter(entry => entry.mode === 'online')
                    .map(entry => entry.date);
                setFilteredDates(onlineDates);
            } else if (selectedMode === 'offline') {
                const offlineDates = datesFromSchedule
                    .filter(entry => entry.mode === 'offline')
                    .map(entry => entry.date);
                setFilteredDates(offlineDates);
            }
        }
    }, [schedule, selectedMode]);

    const handleModeChange = (e) => {
        setSelectedMode(e.target.value);
    };

    return (
        <div>
            <h2>Select Mode:</h2>
            <select value={selectedMode} onChange={handleModeChange}>
                <option value="">Select Mode</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
            </select>

            {selectedMode && (
                <>
                    <h2>{selectedMode === 'online' ? 'Online Dates:' : 'Offline Dates:'}</h2>
                    <Calendar value={filteredDates} readOnly className="" />
                </>
            )}
        </div>
    );
};

CalenderComponent.propTypes = {
    schedule: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CalenderComponent;
