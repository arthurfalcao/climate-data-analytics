using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Xml.Serialization;
using System.Text.Json;
using System.Text.Json.Serialization;
using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


using INAMETApi.Models;

namespace WeatherServiceApi.Services
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
            client.Encoding = System.Text.Encoding.UTF8;
            client.Headers.Add("Content-Type", "application/json");
            dynamic data = JObject.Parse(client.DownloadString(address));

            weather.Id = "346c716b3e43f5f2ebdd3b41";

            weather.City = (data.city.cityName);
            weather.Country = (data.city.member.memName);
            weather.issueDate = Convert.ToDateTime(data.city.forecast.issueDate);
            weather.forecastDate = Convert.ToDateTime(data.city.forecast.forecastDay[0].forecastDate);

            weather.weather = "11";
            weather.minTemp = "1332";
            weather.maxTemp = "13";
            weather.weatherIcon = "2332d";


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