import * as React from 'react';
import PropTypes from 'prop-types';

import {gettext} from '../../utils';
import {Dropdown} from '../../components/Dropdown';
import {processBuckets} from '../../components/DropdownFilter';

import {getDropdownItems} from './AgendaFilters';

export class AgendaCalendarAgendaFilter extends React.PureComponent<any, any> {
    static propTypes: any;
    render() {
        const isActive = !!(this.props.activeFilter.calendar) || !!(this.props.activeFilter.agendas);
        const calendarFilter = {
            label: gettext('Any calendar'),
            field: 'calendar',
            itemTypes: ['events', 'combined'],
            isItemActive: (key: any) => (
                (this.props.activeFilter.calendar || []).includes(key)
            ),
        };
        const agendaFilter = {
            label: gettext('Any agenda'),
            field: 'agendas',
            nestedField: 'agenda',
            itemTypes: ['planning', 'combined'],
            isItemActive: (key: any) => (
                (this.props.activeFilter.agendas || []).includes(key)
            ),
        };
        const calendarItems = getDropdownItems(
            calendarFilter,
            this.props.aggregations,
            this.props.toggleFilter,
            processBuckets,
            {}
        );
        const agendaItems = getDropdownItems(
            agendaFilter,
            this.props.aggregations,
            this.props.toggleFilter,
            processBuckets,
            {}
        );

        const allCalendarsButton = (
            <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                    this.props.toggleFilter('calendar', null);
                    this.props.toggleFilter('agendas', null);
                }}
            >
                {gettext('All Calendars')}
            </button>
        );

        return (
            <Dropdown
                isActive={isActive}
                label={isActive
                    ? (this.props.activeFilter.calendar ?? this.props.activeFilter.agendas)
                    : gettext('Calendars')
                }
                optionLabel={gettext('Calendar')}
            >
                {allCalendarsButton}
                {!calendarItems.length
                    ? (
                        <div className='dropdown-item__empty'>{gettext('No Calendars available')}</div>
                    ) : (
                        <>
                            <h6 className="dropdown-header">{gettext('Events')}</h6>
                            {calendarItems}
                            <div className="dropdown-divider" />
                        </>
                    )}
                {!agendaItems.length ? null : (
                    <>
                        <h6 className="dropdown-header">{gettext('Planning')}</h6>
                        {agendaItems}
                    </>
                )}
            </Dropdown>
        );
    }
}

AgendaCalendarAgendaFilter.propTypes = {
    aggregations: PropTypes.object,
    activeFilter: PropTypes.object,
    toggleFilter: PropTypes.func,
    itemTypeFilter: PropTypes.string,
};
