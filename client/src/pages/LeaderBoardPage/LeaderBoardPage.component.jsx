import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Chart from "react-apexcharts";
import { getUsers } from '../../redux/users/users.actions';

import './LeaderBoardPage.styles.scss'
import SideBar from '../../components/SideBar/SideBar.component';
import RightSideBar from '../../components/right-sideBar/right-sideBar.component';

const LeaderBoardPage = ({ getUsers, user: { users, loading }, auth}) => {
    useEffect(() => {
      getUsers();
    }, [getUsers]);

    let topscore = 0;

    let yourscore = 0;

    let authenticatedUser = auth.user && auth.user.username;

    const usernames = users.map(user => {
      return user.username
    });

    const userpoints = users.map(user => {
      if(topscore < user.posts_count * 5) {
        topscore = user.posts_count * 5;
      }
      if (authenticatedUser === user.username) {
        yourscore = user.posts_count * 5;
      }
      return user.posts_count * 5;
    });
    const options = {
        chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: true,
              columnWidth: '55%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: usernames,
          },
          yaxis: {
            title: {
              text: 'Users'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + " points"
              }
            }
        }
    }

    const series = [
        {
          name: "Points",
          data: userpoints
        }
    ]

    return loading || users === null ? <Fragment>Loading...</Fragment> : (
        <div className='page'>
            <SideBar/>
            <div className='tags-page'>
                <div className='main-bar'>
                    <h1 className='headline'>LeaderBoard</h1>
                    <div className='user-browser'>
                        <div className='grid-layout'>
                        <Chart
                            options={options}
                            series={series}
                            type="bar"
                            width="700"
                        />
                        </div>
                        { auth.isAuthenticated && ( (Math.round(yourscore/topscore * 100) !== 100 ?
                          <h2 style={{paddingLeft: 80, fontFamily: 'Concert One, cursive'}}>You need <span style={{color: '#ee770e'}}>{topscore-yourscore} points</span> to be at the top of the leaderboard</h2>
                          : <h2 style={{paddingLeft: 80, fontFamily: 'Concert One, cursive'}}><span style={{color: '#ee770e'}}>Congratulations!!</span> You are at the top of the leaderboard</h2>))
                        }
                    </div>
                </div>
            </div>
            <RightSideBar/>
        </div>
    )
};

LeaderBoardPage.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth
});

export default connect(mapStateToProps,{ getUsers })(LeaderBoardPage);