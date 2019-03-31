import './appointment.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Alert, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';

const style98 = { width: '98px' };
const style172 = { width: '172px' };

export interface IAppointmentProp extends StateProps, DispatchProps {}
export class Appointment extends React.Component<IAppointmentProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        <div className="rbc-calendar">
          <div className="rbc-toolbar">
            <span className="rbc-btn-group">
              <button type="button">Today</button>
              <button type="button">Back</button>
              <button type="button">Next</button>
            </span>
            <span className="rbc-toolbar-label">4/1/2015 — 5/1/2015</span>
            <span className="rbc-btn-group">
              <button type="button" className="">
                Month
              </button>
              <button type="button" className="">
                Week
              </button>
              <button type="button" className="">
                Work Week
              </button>
              <button type="button" className="">
                Day
              </button>
              <button type="button" className="rbc-active">
                Agenda
              </button>
            </span>
          </div>
          <div className="rbc-agenda-view">
            <table className="rbc-agenda-table">
              <thead>
                <tr>
                  <th className="rbc-header" style={style98}>
                    Date
                  </th>
                  <th className="rbc-header" style={style172}>
                    Time
                  </th>
                  <th className="rbc-header">Event</th>
                </tr>
              </thead>
            </table>
            <div className="rbc-agenda-content">
              <table className="rbc-agenda-table">
                <tbody>
                  <tr>
                    <td rowSpan={1} className="rbc-agenda-date-cell">
                      Tue Apr 07
                    </td>
                    <td className="rbc-agenda-time-cell">
                      <span className="rbc-continues-after">12:00 AM</span>
                    </td>
                    <td className="rbc-agenda-event-cell">Long Event</td>
                  </tr>
                  <tr>
                    <td rowSpan={1} className="rbc-agenda-date-cell">
                      Wed Apr 08
                    </td>
                    <td className="rbc-agenda-time-cell">
                      <span className="rbc-continues-prior rbc-continues-after">All Day</span>
                    </td>
                    <td className="rbc-agenda-event-cell">Long Event</td>
                  </tr>
                  <tr>
                    <td rowSpan={2} className="rbc-agenda-date-cell">
                      Thu Apr 09
                    </td>
                    <td className="rbc-agenda-time-cell">
                      <span className="rbc-continues-prior rbc-continues-after">All Day</span>
                    </td>
                    <td className="rbc-agenda-event-cell">Long Event</td>
                  </tr>
                  <tr>
                    <td className="rbc-agenda-time-cell">
                      <span className="rbc-continues-after">12:00 AM</span>
                    </td>
                    <td className="rbc-agenda-event-cell">Some Event</td>
                  </tr>
                  <tr>
                    <td rowSpan={1} className="rbc-agenda-date-cell">
                      Sat Apr 11
                    </td>
                    <td className="rbc-agenda-time-cell">
                      <span className="rbc-continues-after">12:00 AM</span>
                    </td>
                    <td className="rbc-agenda-event-cell">Conference</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Appointment);
