using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Data;
using System;
using Newtonsoft.Json.Linq;
using ClimateDataAnalyticsApi.Models;
using GenericParsing;


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

        public Weather getjson(Weather weather, string number)
        {


            string address = "https://worldweather.wmo.int/en/json/" + number + "_en.json";

            WebClient client = new WebClient();
            client.Encoding = System.Text.Encoding.UTF8;
            client.Headers.Add("Content-Type", "application/json");
            dynamic data = JObject.Parse(client.DownloadString(address));

            for (int day = 0; day < 5; day++)
            {
                weather = JsonByDateDay(data, weather, day);
                Create(weather);
                weather.IdForGets = weather.Country + "/" + weather.City + "/" + (weather.IssueDate.DayOfYear - 1) + "/" + weather.ForecastDate.DayOfYear;
                try
                {
                    RemoveByDay(weather.IdForGets);
                }
                catch (InvalidCastException e)
                {

                }


            }

            return weather;
        }

        public Weather JsonByDateDay(dynamic data, Weather weather, int day)
        {

            weather.Id = null;//"546c776b3e23f5f2ebdd3b03";
            weather.City = (data.city.cityName);
            weather.Country = (data.city.member.memName);
            weather.IssueDate = Convert.ToDateTime(data.city.forecast.issueDate);
            weather.ForecastDate = Convert.ToDateTime(data.city.forecast.forecastDay[day].forecastDate);
            weather.weather = (data.city.forecast.forecastDay[day].weather);
            weather.MinTemp = (data.city.forecast.forecastDay[day].minTemp);
            weather.MaxTemp = (data.city.forecast.forecastDay[day].maxTemp);
            weather.WeatherIcon = (data.city.forecast.forecastDay[day].weatherIcon);
            weather.IdForGets = weather.Country + "-" + weather.City + "-" + weather.IssueDate.DayOfYear + "-" + weather.ForecastDate.DayOfYear;
            return weather;
        }

        public string CityToNumber(string number)
        {

            DataSet dsResult;
            number="11";
            // Using an XML Config file. 
            using (GenericParserAdapter parser = new GenericParserAdapter("cities.txt"))
            {
                parser.Load("cities.txt");
                dsResult = parser.GetDataSet();
            }
            return number;

        }

        public List<Weather> Get() => _Weather.Find(Weather => true).ToList();

        public Weather Get(string Id) => _Weather.Find<Weather>(Weather => Weather.Id == Id).FirstOrDefault();


        public Weather Get_ByCity(string IdForGets)
        {
            var results = _Weather.Find(x => x.IdForGets == IdForGets).FirstOrDefault();
            return results;
            // var filter = Builders<Weather>.Filter.Eq(x => x.IdForGets, IdForGets);
            // var results = collection.Find(filter).ToList();

        }

        public Weather Create(Weather Weather)
        {
            _Weather.InsertOne(Weather);

            return Weather;
        }

        public void Update(string Id, Weather WeatherIn) => _Weather.ReplaceOne(Weather => Weather.Id == Id, WeatherIn);

        public void Remove(Weather WeatherIn) => _Weather.DeleteOne(Weather => Weather.Id == WeatherIn.Id);

        public void Remove(string Id) => _Weather.DeleteOne(Weather => Weather.Id == Id);

        public void RemoveByDay(string IdForGets) => _Weather.DeleteOne(Weather => Weather.IdForGets == IdForGets);
    }

}