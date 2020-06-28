using System;
using System.Collections.Generic;
using System.Net;
using ClimateDataAnalytics.Models;
using Microsoft.VisualBasic.FileIO;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;

namespace ClimateDataAnalytics.Services
{
    public class WeatherService
    {
        private readonly IMongoCollection<Weather> _weather;

        public WeatherService(IDatabaseSettings weatherSettings)
        {
            var weatherClient = new MongoClient(weatherSettings.ConnectionString);
            var weatherDatabase = weatherClient.GetDatabase(weatherSettings.DatabaseName);

            _weather = weatherDatabase.GetCollection<Weather>(weatherSettings.WeatherCollectionName);
        }

        public Weather GetJson(Weather weather, string number, int day)
        {
            var address = "https://worldweather.wmo.int/en/json/" + number + "_en.json";

            var client = new WebClient {Encoding = System.Text.Encoding.UTF8};
            client.Headers.Add("Content-Type", "application/json");
            dynamic data = JObject.Parse(client.DownloadString(address));
            const int flag = 0;
            weather = JsonByDateDay(data, weather, day, flag);
            if (int.Parse(weather.MaxTemp) != 3) Create(weather);
            else
            {
                return null;
            }

            var idForGets = weather.Country + "-" + weather.City + "-" + ((weather.IssueDate.DayOfYear) - 1) + "-" +
                            (weather.ForecastDate.DayOfYear);
            try
            {
                RemoveByDay(idForGets);
            }
            catch (InvalidCastException e)
            {
            }

            return weather;
        }

        private static Weather JsonByDateDay(dynamic data, Weather weather, int day, int flag)
        {
            weather.Id = null; //"546c776b3e23f5f2ebdd3b03";
            try
            {
                weather.City = (data.city.cityName);
            }
            catch
            {
                weather.City = "N/A";
            }

            try
            {
                weather.Country = (data.city.member.memName);
            }
            catch
            {
                weather.Country = "N/A";
            }

            try
            {
                weather.IssueDate = Convert.ToDateTime(data.city.forecast.issueDate);
            }
            catch
            {
                weather.IssueDate = new DateTime(0001, 1, 1, 0, 0, 0);
            }

            try
            {
                weather.ForecastDate = Convert.ToDateTime(data.city.forecast.forecastDay[day].forecastDate);
            }
            catch
            {
                weather.ForecastDate = new DateTime(0001, 1, 1, 0, 0, 0);
            }

            try
            {
                weather.weather = (data.city.forecast.forecastDay[day].weather);
            }
            catch
            {
                weather.weather = "N/A";
                flag++;
            }

            try
            {
                weather.MinTemp = (data.city.forecast.forecastDay[day].minTemp);
            }
            catch
            {
                weather.MinTemp = "N/A";
                flag++;
            }

            try
            {
                weather.MaxTemp = (data.city.forecast.forecastDay[day].maxTemp);
            }
            catch
            {
                flag++;
                weather.MaxTemp = (flag).ToString();
            }

            try
            {
                weather.WeatherIcon = (data.city.forecast.forecastDay[day].weatherIcon);
            }
            catch
            {
                weather.WeatherIcon = (++flag).ToString();
            }

            try
            {
                weather.IdForGets = weather.Country + "-" + weather.City + "-" + weather.IssueDate.DayOfYear + "-" +
                                    weather.ForecastDate.DayOfYear;
            }
            catch
            {
                weather.IdForGets = "N/A";
            }


            return weather;
        }

        public static string CityToNumber(string number)
        {
            var words = number.Split('-');
            Console.WriteLine($"<{words[1]}>");

            const string path = @"cities.txt"; // "Argentina";"Cordoba";"855"
            using var csvParser = new TextFieldParser(path) {CommentTokens = new[] {"#"}};
            csvParser.SetDelimiters(";");
            csvParser.HasFieldsEnclosedInQuotes = true;

            // Skip the row with the column names
            csvParser.ReadLine();

            while (!csvParser.EndOfData)
            {
                // Read current line fields, pointer moves to the next line.
                var fields = csvParser.ReadFields();
                var country = fields[0];
                var city = fields[1];
                var cityId = fields[2];
                if (words[1] == fields[1])
                {
                    return fields[2];
                }
            }

            return number;
        }

        public List<Weather> GetStatsDates(string Country, string City, DateTime StartDate, DateTime FinishDate)
        {
            var days = (FinishDate.DayOfYear) - (StartDate.DayOfYear);
            if (days < 1) days = 1;

            var totalMax = 0;
            var totalMin = 0;
            var totalMean = 0;
            var tempWeatherList = new List<Weather>();

            for (var i = StartDate.DayOfYear; i <= FinishDate.DayOfYear; i++)
            {
                var search = Country + "-" + City + "-" + i + "-" + i;

                var tempSearch = Get_ByCity(search);

                tempWeatherList.Add(tempSearch);

                totalMax += int.Parse(tempSearch.MaxTemp);
                totalMin += int.Parse(tempSearch.MinTemp);
                totalMean += (int.Parse(tempSearch.MaxTemp) + int.Parse(tempSearch.MinTemp)) / 2;
            }

            totalMax /= days;
            totalMin /= days;
            totalMean /= days;

            Console.WriteLine(totalMax + ";" + totalMin + ";" + totalMean);

            return tempWeatherList;
        }


        public List<Weather> Get() => _weather.Find(Weather => true).ToList();

        public Weather Get(string Id) => _weather.Find<Weather>(Weather => Weather.Id == Id).FirstOrDefault();

        public Weather Get_ByCity(string IdForGets)
        {
            return _weather.Find(x => x.IdForGets == IdForGets).FirstOrDefault();
        }

        public Weather Create(Weather Weather)
        {
            _weather.InsertOne(Weather);
            return Weather;
        }

        public void Update(string Id, Weather WeatherIn) => _weather.ReplaceOne(Weather => Weather.Id == Id, WeatherIn);

        public void Remove(Weather WeatherIn) => _weather.DeleteOne(Weather => Weather.Id == WeatherIn.Id);

        public void Remove(string Id) => _weather.DeleteOne(Weather => Weather.Id == Id);

        public void RemoveByDay(string IdForGets) => _weather.DeleteOne(Weather => Weather.IdForGets == IdForGets);
    }
}