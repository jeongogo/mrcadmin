import React, { useState, useEffect } from 'react';
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { format } from 'date-fns';
import { WiCloudy, WiDaySunny, WiSnow, WiRain, WiDayRain, WiThunderstorm, WiFog } from "react-icons/wi";
import styled from 'styled-components';

const Detail = ({ feed }) => {
  const [time, setTime] = useState('');
  const [paceDetail, setPaceDetail] = useState([]);
  const [altitude, setAltitude] = useState([]);

  /** 총 시간 */
  const onSetTotalTime = () => {
    let recordHours = Math.floor(feed.totalTime/60/60);
    let recordMinutes = Math.floor(feed.totalTime/60) - (recordHours * 60);
    let recordSeconds = (feed.totalTime) - (Math.floor(feed.totalTime/60) * 60);
    recordHours = recordHours < 1 ? '' : recordHours + ':';
    recordMinutes = recordMinutes < 10 ? '0' + recordMinutes : recordMinutes;
    recordSeconds = recordSeconds < 10 ? '0' + recordSeconds : recordSeconds;
    setTime(recordHours + recordMinutes + ':' + recordSeconds);
  }

  /** 고도 */
  const onSetAltitude = () => {
    const altitudeCount = Math.ceil((feed.altitude.length)/10) - 1;
    let currentCount = [];
    for (let i=0; i <= altitudeCount; i++) {
      currentCount.push(i);
    }
    setAltitude(currentCount);
  }

  /** 페이스 상세 */
  const onSetPaceDetail = () => {
    let filterData = feed.paceDetail.map((item, index) => {
      if (index === 0) {
        return item;
      }
      return item - feed.paceDetail[index-1];
    });

    const max = Math.max.apply(Math, filterData);
    const processData = filterData.map((item, index) => {
      let time = 0;
      if (index === filterData.length - 1 && (feed.distance - Math.floor(feed.distance)).toFixed(2) >= 0.1) {
        time = (1000/(feed.distance - Math.floor(feed.distance)).toFixed(2)) * (item/1000);
      } else {
        time = item;
      }
      const m = (Math.floor(time / 60)).toFixed(0);
      const s = (time - m * 60).toFixed(0);
      const minutes = m < 1 ? '00' : m < 10 ? '0' + m : m;
      const seconds = s < 1 ? '00' : s < 10 ? '0' + s : s;
      let newItem = {
        seconds: time,
        pace: minutes + ':' + seconds,
        percent: (time/max) * 100,
      }
      return newItem;
    });
    setPaceDetail(processData);
  }

  /** 날씨 */
  const Weather = () => {
    switch (feed.weather) {
      case 'Clouds':
        return <WiCloudy size={18} />
      case 'Clear':
        return <WiDaySunny size={18} />
      case 'Snow':
        return <WiSnow size={18} />
      case 'Rain':
        return <WiRain size={18} />
      case 'Drizzle':
        return <WiDayRain size={18} />
      case 'Thunderstorm':
        return <WiThunderstorm size={18} />
      default:
        return <WiFog size={18} />
    }
  }

  const options = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: altitude,
      text: '제9회 레이크러너 팀전 레이스'
    },
    yAxis: {
      min: feed.altitude[feed.altitude.length-1] - 50,
      max: feed.altitude[feed.altitude.length-1] + 50,
      title: {
        text: "단위: m",
      },
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
            radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },
    series: [{type: 'area', name: '단위: 1/10km', marker: {enabled: false}, data: feed.altitude}],
  };

  useEffect(() => {
    onSetTotalTime();
    if (feed.paceDetail.length > 0) {
      onSetPaceDetail();
    }    
    onSetAltitude();
  }, []);

  return (
    <Container>
      <div className="profile">
        <div>
          <div className="date">{format(new Date(feed.date.toDate()), 'yy.MM.dd HH:mm')}</div>
          <div className="name">{feed.name}</div>
        </div>
        <div className="area">
          <span className="area-text">{feed.areaName}</span>
          <Weather />
        </div>
      </div>
      <div className="distance">{feed.distance}<span>km</span></div>
      <div className="record-wrap">
        <div className="record-item border-right">
          <div className="record-text">{time}</div>
          <div className="record-label">시간</div>
        </div>
        <div className="record-item border-right">
          <div className="record-text">{feed.pace}</div>
          <div className="record-label">페이스</div>
        </div>
        <div className="record-item">
          <div className="record-text">{feed.calorie}</div>
          <div className="record-label">칼로리</div>
        </div>
      </div>
      <div className="image-wrap">
        {feed.photoURL
          ?
            <img src={feed.photoURL} alt="" />
          :
            <img src={feed.captureURL} alt="" />
        }
      </div>
      <div className="section-wrap">
        <h1 className="section-title">페이스</h1>
        {paceDetail.length > 0 &&
          paceDetail.map((item, index) => (
            <div key={index} className="pace-item">
              <span className="pace-label">{index+1}</span>
              <div className="pace-bar">
                <div className="pace-bar-current" style={{width: item.percent + '%'}}></div>
              </div>
              <span className="pace-text">{item.pace}</span>
            </div>
          ))
        }
      </div>
      <div className="section-wrap">
        <h1 className="section-title">고도</h1>
        {feed.altitude.length > 0 &&
          <HighchartsReact highcharts={Highcharts} options={options} />
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
  .profile {
    margin-top: 0.5rem;
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ededed;
  }
  .avatar {
    margin-right: 1rem;
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
    background-color: #eee;
    overflow: hidden;
  }
  .circle {
    width: 4rem;
    height: 4rem;
  }
  .name {
    font-size: 1.5rem;
    color: #222;
  }
  .date {
    font-size: 1.3rem;
    color: #454545;
  }
  .area {
    margin-left: auto;
    display: flex;
    justify-content: center;
  }
  .area-text {
    margin-right: 0.5rem;
    font-size: 1.3rem;
    color: #999;
  }
  .subject {
    font-size: 1.8rem;
    color: #222;
  }
  .distance {
    padding-top: 2rem;
    font-size: 5.6rem;
    font-weight: 700;
    color: #222;
    text-align: center;
    border-top: 7px solid #f3f3f3;
    span {
      font-size: 2.4rem;
      font-weight: 500;
    }
  }
  .record-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: 36rem;
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
    margin-left: auto;
    margin-right: auto;
    padding: 0 2rem;
  }
  .record-item {
    text-align: center;
    flex-grow: 1;
  }
  .border-right {
    border-right: 1px solid #ededed;
  }
  .record-text {
    font-size: 2.2rem;
    color: #222;
  }
  .record-label {
    font-size: 1.4rem;
    color: #666;
  }
  .image-wrap {
    padding-bottom: 5rem;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #ededed;
    img {
      width: 100%;
      max-width: 30rem;
    }
  }
  .section-wrap {
    padding: 4rem 2rem;
    border-top: 7px solid #f3f3f3;
    border-bottom: 1px solid #ededed;
  }
  .section-title {
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 500;
    color: #222;
  }
  .pace-item {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
  }
  .pace-label {
    width: 2rem;
    font-size: 1.4rem;
    color: #222;
  }
  .pace-bar {
    position: relative;
    height: 1.6rem;
    margin-right: 2rem;
    background-color: #ededed;
    flex-grow: 1;
  }
  .pace-bar-current {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #ff7473;
    z-index: 2;
  }
  .pace-text {
    font-size: 1.4rem;
    color: #454545;
  }
`;

export default Detail;