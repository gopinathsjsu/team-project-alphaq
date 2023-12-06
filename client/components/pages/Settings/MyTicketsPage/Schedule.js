import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
// import '@fullcalendar/common/main.css';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';

// this is used to make custom view in calendar for event

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    const cleanedEvents = this.props?.data.map(
      ({ movieName, startTime, endTime, showId }) => {
        const startDateTime = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
        const endDateTime = moment(endTime).format('YYYY-MM-DD HH:mm:ss');
        return {
          title: movieName,
          start: startDateTime,
          end: endDateTime,
          id: `/show/${showId}`,
        };
      },
    );
    this.setState({ events: cleanedEvents });
  }

  redirectToEventPage = (selectionInfo) => {
    window.open(selectionInfo.event._def.publicId, '_blank').focus();
  };

  setDate = (e) => {
    const calendarApi = this.calendarRef.current.getApi();
    calendarApi.gotoDate(e.target.value);
  };

  changeView = () => {
    const calendarApi = this.calendarRef.current.getApi();
    const currentOption = calendarApi.getOption('eventDisplay');
    const circleOfLife = [
      'auto',
      'block',
      'list-item',
      'background',
      'inverse-background',
      'none',
    ];
    const i = circleOfLife.indexOf(currentOption);
    const newI = (i + 1) % (circleOfLife.length - 1);
    calendarApi.setOption('eventDisplay', circleOfLife[newI]);
  };

  render() {
    return (
      <div>
        <FullCalendar
          ref={this.calendarRef}
          height="800px"
          stickyHeaderDates={true}
          stickyFooterScrollbar={true}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            center: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          eventColor="#B388DD"
          // eventBorderColor=""
          // dateClick={this.handleDateClick}
          // eventContent={renderEventContent}
          defaultView="timeGridWeek"
          events={this.state.events}
          eventDisplay="auto"
          eventTimeFormat={{
            // like '14:30:00'
            hour: '2-digit',
            minute: '2-digit',
            meridiem: false,
          }}
          eventClick={this.redirectToEventPage}
          eventMouseEnter={this.popOver}
          dayMaxEventRows={true}
          dayMaxEvents={true}
        />
        {this.state.alert}
        <div className="flex w-full mt-4">
          <div className="font-semibold text-lg">
            Jump to :
            <input type="date" className="ml-2 " onChange={this.setDate} />
          </div>
          <div className="ml-auto">
            <motion.button
              type="button"
              className="rounded-lg  font-semibold p-2 px-4 text-base text-white  hover:lightalpha active:lightalpha "
              onClick={this.changeView}
              style={{ backgroundColor: '#b388dd' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              {' '}
              <i className="fas fa-wrench text-sm" /> Toggle View
            </motion.button>
          </div>
        </div>
      </div>
    );
  }
}

Schedule.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      movieName: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      showId: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
