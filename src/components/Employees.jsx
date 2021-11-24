import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../redux/user/user.actions.js';
import { getUsers } from './api.js';

const EmployeesList = (props) => {
  const [activeUser, setActiveUser] = useState([]);

  useEffect(() => {
    getUsers().then((response) => {
      props.setUser(response.data);
    });
  }, []);
  useEffect(() => {
    setActiveUser(JSON.parse(window.localStorage.getItem('activeUser')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('activeUser', JSON.stringify(activeUser));
  }, [activeUser]);
  const userMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'Octember',
    'November',
    'December',
  ];

  return (
    <div className="App">
      <div>
        <h1 style={{ textAlign: 'center' }}>Employees</h1>
        <div className="alphabet-wrap">
          {props.alphabet.map((s) => (
            <div>
              <h2>{s}</h2>
              {props.user.some((u) => u.firstName[0] === s) ? (
                props.user
                  .sort((a, b) => {
                    if (a.firstName > b.firstName) {
                      return 1;
                    }
                    if (a.firstName < b.firstName) {
                      return -1;
                    }
                    return 0;
                  })
                  .map((u) =>
                    u.firstName[0] === s ? (
                      <div key={u.id} className={u.id}>
                        <div
                          className={
                            activeUser.map((a) => a.id).includes(u.id) === true
                              ? 'active-user'
                              : ''
                          }
                        >
                          <b>
                            {u.firstName} {u.lastName}
                          </b>
                        </div>
                        <div>
                          <p>
                            <input
                              type="radio"
                              checked={
                                activeUser.map((a) => a.id).includes(u.id) ==
                                false
                                  ? true
                                  : false
                              }
                              onChange={() => {
                                activeUser.splice(
                                  activeUser.map((a) => a.id).indexOf(u.id),
                                  1
                                );
                                setActiveUser([...activeUser]);
                              }}
                            />
                            not active
                          </p>
                          <p>
                            <input
                              type="radio"
                              onChange={() => setActiveUser([...activeUser, u])}
                              checked={
                                activeUser.map((a) => a.id).includes(u.id) ===
                                true
                                  ? true
                                  : false
                              }
                            />
                            active
                          </p>
                        </div>
                      </div>
                    ) : (
                      ''
                    )
                  )
              ) : (
                <h4>No Employees</h4>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ width: '50vw' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '15px' }}>
          Employees birthday
        </h1>
        {activeUser.length != 0 ? (
          <div
            style={{
              borderTop: '1px solid ',
              borderLeft: '1px solid',
              borderBottom: '1px solid',
              padding: '15px 0 15px 4vw',
            }}
          >
            {props.months.map((m) => (
              <div>
                <h3>{m}</h3>
                {activeUser.some(
                  (u) => userMonths[new Date(u.dob).getMonth()] === m
                ) ? (
                  activeUser
                    .sort((a, b) => {
                      if (a.lastName > b.lastName) {
                        return 1;
                      }
                      if (a.lastName < b.lastName) {
                        return -1;
                      }
                      return 0;
                    })
                    .map((u) =>
                      userMonths[new Date(u.dob).getMonth()] === m ? (
                        <div key={u.id} className={u.id}>
                          <div>
                            <b>
                              {u.firstName} {u.lastName} -{' '}
                              {new Date(u.dob).getDay()}{' '}
                              {userMonths[new Date(u.dob).getMonth()]},
                              {new Date(u.dob).getFullYear()} year
                            </b>
                          </div>
                        </div>
                      ) : (
                        ''
                      )
                    )
                ) : (
                  <h4>No Employees</h4>
                )}
              </div>
            ))}
          </div>
        ) : (
          <h3
            style={{
              padding: '15px 0 15px 4vw',
            }}
          >
            Employees List is empty
          </h3>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
  alphabet: state.alphabet.alphabet,

  months: state.months.months,
});
export default connect(mapStateToProps, { setUser })(EmployeesList);
