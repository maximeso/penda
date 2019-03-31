import './agenda.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Alert, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

import { getSession } from 'app/shared/reducers/authentication';

const style15: React.CSSProperties = {
  width: '15px',
  textAlign: 'left',
  textTransform: 'capitalize'
};

export interface IAgendaProp extends StateProps, DispatchProps {}
export class Agenda extends React.Component<IAgendaProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <Row>
        <div className="content-expanded ">
          <div className="control-buttons">
            <button className="button-control">
              <i className="zoom-plus-icon" />
            </button>
            <button className="button-control">
              <i className="zoom-minus-icon" />
            </button>
            <button className="button-control">
              <i className="schedule-icon" />
            </button>
            <button className="button-control"> 7 jours</button>
            <button className="button-control"> 4 jours</button>
            <button className="button-control"> 3 jours</button>
            <button className="button-control"> un jour</button>
          </div>
          <div className="agenda" id="agenda-wrapper">
            <div className="agenda__table --header">
              <table>
                <thead>
                  <tr>
                    <th className="agenda__cell --head">dim. 31 mars</th>
                    <th className="agenda__cell --head">lun. 01 avr.</th>
                    <th className="agenda__cell --head">mar. 02 avr.</th>
                    <th className="agenda__cell --head">mer. 03 avr.</th>
                    <th className="agenda__cell --head">jeu. 04 avr.</th>
                    <th className="agenda__cell --head">ven. 05 avr.</th>
                    <th className="agenda__cell --head">sam. 06 avr.</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="agenda__table --body">
              <table cellSpacing="0" cellPadding="0">
                <tbody>
                  <tr draggable={false} className="agenda__row   --hour-start">
                    <td className="agenda__cell " id="2019-03-31T08:00:00" style={style15}>
                      Éducatrice:
                    </td>
                    <td className="agenda__cell " id="2019-04-01T08:00:00" style={style15}>
                      Éducatrice:
                    </td>
                    <td className="agenda__cell " id="2019-04-02T08:00:00" style={style15}>
                      Éducatrice:
                    </td>
                    <td className="agenda__cell " id="2019-04-03T08:00:00" style={style15}>
                      Éducatrice:
                    </td>
                    <td className="agenda__cell " id="2019-04-04T08:00:00" style={style15}>
                      Éducatrice:
                    </td>
                    <td className="agenda__cell " id="2019-04-05T08:00:00" style={style15}>
                      Éducatrice:
                    </td>
                    <td className="agenda__cell " id="2019-04-06T08:00:00" style={style15}>
                      Éducatrice:
                    </td>
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T08:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T08:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T08:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T08:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T08:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T08:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T08:15:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell" id="2019-03-31T08:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T08:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T08:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T08:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T08:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T08:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T08:30:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T08:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T08:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T08:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T08:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T08:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T08:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T08:45:00" style={style15} />
                  </tr>
                  <tr draggable={false} className="agenda__row   --hour-start">
                    <td className="agenda__cell " id="2019-03-31T09:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T09:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T09:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T09:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T09:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T09:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T09:00:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T09:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T09:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T09:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T09:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T09:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T09:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T09:15:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T09:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T09:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T09:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T09:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T09:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T09:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T09:30:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T09:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T09:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T09:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T09:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T09:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T09:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T09:45:00" style={style15} />
                  </tr>
                  <tr draggable={false} className="agenda__row   --hour-start">
                    <td className="agenda__cell " id="2019-03-31T10:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T10:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T10:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T10:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T10:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T10:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T10:00:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T10:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T10:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T10:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T10:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T10:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T10:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T10:15:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T10:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T10:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T10:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T10:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T10:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T10:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T10:30:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T10:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T10:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T10:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T10:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T10:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T10:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T10:45:00" style={style15} />
                  </tr>
                  <tr draggable={false} className="agenda__row   --hour-start">
                    <td className="agenda__cell " id="2019-03-31T11:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T11:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T11:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T11:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T11:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T11:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T11:00:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T11:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T11:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T11:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T11:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T11:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T11:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T11:15:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell" id="2019-03-31T11:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T11:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T11:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T11:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T11:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T11:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T11:30:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T11:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T11:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T11:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T11:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T11:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T11:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T11:45:00" style={style15} />
                  </tr>
                  <tr draggable={false} className="agenda__row   --hour-start">
                    <td className="agenda__cell" id="2019-03-31T12:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T12:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T12:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T12:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T12:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T12:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T12:00:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T12:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T12:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T12:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T12:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T12:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T12:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T12:15:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T12:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T12:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T12:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T12:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T12:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T12:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T12:30:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T12:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T12:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T12:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T12:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T12:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T12:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T12:45:00" style={style15} />
                  </tr>
                  <tr draggable={false} className="agenda__row   --hour-start">
                    <td className="agenda__cell " id="2019-03-31T13:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T13:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T13:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T13:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T13:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T13:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T13:00:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T13:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T13:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T13:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T13:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T13:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T13:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T13:15:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T13:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T13:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T13:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T13:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T13:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T13:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T13:30:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T13:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T13:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T13:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T13:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T13:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T13:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T13:45:00" style={style15} />
                  </tr>
                  <tr draggable={false} className="agenda__row   --hour-start">
                    <td className="agenda__cell " id="2019-03-31T14:00:00" style={style15}>
                      Parent:
                    </td>
                    <td className="agenda__cell " id="2019-04-01T14:00:00" style={style15}>
                      Parent:
                    </td>
                    <td className="agenda__cell " id="2019-04-02T14:00:00" style={style15}>
                      Parent:
                    </td>
                    <td className="agenda__cell " id="2019-04-03T14:00:00" style={style15}>
                      Parent:
                    </td>
                    <td className="agenda__cell " id="2019-04-04T14:00:00" style={style15}>
                      Parent:
                    </td>
                    <td className="agenda__cell " id="2019-04-05T14:00:00" style={style15}>
                      Parent:
                    </td>
                    <td className="agenda__cell " id="2019-04-06T14:00:00" style={style15}>
                      Parent:
                    </td>
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T14:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T14:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T14:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T14:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T14:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T14:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T14:15:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T14:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T14:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T14:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T14:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T14:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T14:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T14:30:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T14:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T14:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T14:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T14:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T14:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T14:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T14:45:00" style={style15} />
                  </tr>
                  <tr draggable={false} className="agenda__row   --hour-start">
                    <td className="agenda__cell " id="2019-03-31T15:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T15:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T15:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T15:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T15:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T15:00:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T15:00:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T15:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T15:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T15:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T15:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T15:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T15:15:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T15:15:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T15:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T15:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T15:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T15:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T15:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T15:30:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T15:30:00" style={style15} />
                  </tr>
                  <tr>
                    <td className="agenda__cell " id="2019-03-31T15:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-01T15:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-02T15:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-03T15:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-04T15:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-05T15:45:00" style={style15} />
                    <td className="agenda__cell " id="2019-04-06T15:45:00" style={style15} />
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
)(Agenda);
