using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System;
using Newtonsoft.Json.Linq;
using ClimateDataAnalyticsApi.Models;

namespace ClimateDataAnalyticsApi.Services
{
    public class WeatherService
    {
        private readonly IMongoCollection<Weather> _Weather;

        public WeatherService(IDatabaseSettings Weathersettings)
        {

            var Weather_client = new MongoClient(Weathersettings.ConnectionString);
            var Weather_database = Weather_client.GetDatabase(Weathersettings.DatabaseName);

            _Weather = Weather_database.GetCollection<Weather>(Weathersettings.WeatherCollectionName);
        }

        public Weather getjson(string address, Weather weather)
        {
            WebClient client = new WebClient();
            client.Encoding = Encoding.UTF8;
            client.Headers.Add("Content-Type", "application/json");
            dynamic data = JObject.Parse(client.DownloadString(address));

            weather.Id = "346c716b3e43f5f2ebdd3b41";

            weather.City = (data.city.cityName);
            weather.Country = (data.city.member.memName);
            weather.IssueDate = Convert.ToDateTime(data.city.forecast.issueDate);
            weather.ForecastDate = Convert.ToDateTime(data.city.forecast.forecastDay[0].forecastDate);

            weather.weather = "11";
            weather.MinTemp = "1332";
            weather.MaxTemp = "13";
            weather.WeatherIcon = "2332d";

            return weather;
        }

        public List<Weather> Get() => _Weather.Find(Weather => true).ToList();

        public Weather Get(string Id) => _Weather.Find<Weather>(Weather => Weather.Id == Id).FirstOrDefault();

        public Weather Create(Weather Weather)
        {
            _Weather.InsertOne(Weather);
            return Weather;
        }

        public void Update(string Id, Weather WeatherIn) => _Weather.ReplaceOne(Weather => Weather.Id == Id, WeatherIn);

        public void Remove(Weather WeatherIn) => _Weather.DeleteOne(Weather => Weather.Id == WeatherIn.Id);

        public void Remove(string Id) => _Weather.DeleteOne(Weather => Weather.Id == Id);
    }

}