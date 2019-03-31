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
              <button type="button">Aujourd'hui</button>
              <button type="button">Retour</button>
              <button type="button">Suivant</button>
            </span>
            <span className="rbc-toolbar-label">4/1/2015 — 5/1/2015</span>
            <span className="rbc-btn-group">
              <button type="button" className="">
                Mois
              </button>
              <button type="button" className="">
                Semaine
              </button>
              <button type="button" className="">
                Semaine de travail
              </button>
              <button type="button" className="">
                Jour
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
                    Heure
                  </th>
                  <th className="rbc-header">Événements</th>
                </tr>
              </thead>
            </table>
            <div className="rbc-agenda-content">
              <table className="rbc-agenda-table">
                <tbody>
                  <tr>
                    <td rowSpan={1} className="rbc-agenda-date-cell">
                      Lundi le 1 avril 2019
                    </td>
                    <td className="rbc-agenda-time-cell">
                      <span className="">19:00</span>
                    </td>
                    <td className="rbc-agenda-event-cell">Réunion du C.A</td>
                  </tr>
                  <tr>
                    <td rowSpan={1} className="rbc-agenda-date-cell">
                      Mercredi le 3 avril 2019
                    </td>
                    <td className="rbc-agenda-time-cell">
                      <span className="">19:00</span>
                    </td>
                    <td className="rbc-agenda-event-cell">Réunion de parent</td>
                  </tr>
                  <tr>
                    <td rowSpan={1} className="rbc-agenda-date-cell">
                      Vendredi le 12 avril 2019
                    </td>
                    <td className="rbc-agenda-time-cell">
                      <span className="">13:00</span>
                    </td>
                    <td className="rbc-agenda-event-cell">BBQ au CPE</td>
                  </tr>
                  <tr>
                    <td rowSpan={1} className="rbc-agenda-date-cell">
                      Lundi le 29 avril 2019
                    </td>
                    <td className="rbc-agenda-time-cell">
                      <span className="">9:00</span>
                    </td>
                    <td className="rbc-agenda-event-cell">Déjeuner collectif</td>
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
