import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import $ from './lib/jquery';
class WeatherApp extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	        city: undefined,
            country: undefined,
            temperature: undefined,
            weather:undefined,
            wind: undefined
        };
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.getWeatherInfo = this.getWeatherInfo.bind(this);

    };

	getWeatherInfo(city){
	    var  city = $.trim(city);
	    const self = this;
	    let query = null;
	    self.setState({
	        infoStatus: 'loading'
        });
	    if(!city || city==''){
	        query = this.props.city;
        } else {
	        query = city;
        };
	    let key = null;//key为HeWeather的用户 个人认证key
	    let url = 'https://free-api.heweather.com/v5/now?city='
                + query + '&key=3aee973354a94955bedffd1034c4faa7';

        fetch(url).then(function (response) {
            return response;
        }).then(function (response) {
            setTimeout(function () {
                self.setState({
                    infoStatus: 'loaded'
                });
            }, 300);
            return response.json();
        }).then(function (data) {
            let result = data.HeWeather5[0];
            if(result.status == 'ok'){

                self.setState({
                    city: result.basic.city,
                    country: result.basic.cnty,
                    temperature: result.now.tmp,
                    weather: result.now.cond.txt,
                    wind: result.now.wind.spd
                });
            } else {
                alert("请输入正确的地名");
            }
        }).catch(function() {
            self.setState({
                infoStatus: 'error'
            });
        });
	};

	componentWillMount(){
	    this.getWeatherInfo();
    }


	handleSubmit(event) {
	    event.preventDefault();
	    this.getWeatherInfo(event.target.search.value);
    }
    render() {
	    const {city, country, temperature, wind, weather, infoStatus} = this.state;
        let data = null;
        if (infoStatus == 'loaded') {
            data = <div className="weatherInfo">
                <div className="cityName">
                    <div>{city} <span>({country})</span></div>
                </div>
                <div className="tempInfo">
                    <div>温度<span>{temperature}º</span></div>
                    <div>天气<span>{weather}</span></div>
                    <div>风速<span>{wind}m/s</span></div>
                </div>
            </div>
        } else if (infoStatus == 'loading') {
            data = <div className="info loading">Loading weather data...</div>
        } else if (infoStatus == 'error') {
            data = <div className="info error">Error while loading weather data. Try again later.</div>
        }
        return (
            <div className="weatherApp">
                <div className="weatherQuery">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search a City..." autoComplete="off"
                        />
                    </form>
                </div>
                {data}
            </div>
        );
    }
}

WeatherApp.defaultProps = {city: 'beijing'};
ReactDOM.render(<WeatherApp />, document.getElementById('content'));
