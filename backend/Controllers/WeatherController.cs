using System;
using System.Collections.Generic;
using ClimateDataAnalyticsApi.Models;
using ClimateDataAnalyticsApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClimateDataAnalyticsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : Controller
    {
        private readonly WeatherService _weatherService;

        public WeatherController(WeatherService WeatherService)
        {
            _weatherService = WeatherService;
        }

        //Algoritmo
        [HttpPost, Route("GetByday/{value}")]
        public ActionResult<Weather> GetByday(string value)
        {
            var Weather = _weatherService.Get_ByCity(value);

            if (Weather == null)
            {

                Weather = new Weather();
                string number = _weatherService.CityToNumber(value);
                string[] words = value.Split('-');
                int day = Int32.Parse(words[3]) - Int32.Parse(words[2]);
                Weather = _weatherService.getjson(Weather, number, day);
                if (Weather == null)
                {
                    return StatusCode(418);
                }
            }

            return Weather;
        }

        [HttpPost, Route("GetStatsDate/{Country}/{City}/{StartDate}/{FinishDate}")]

        public ActionResult<List<Weather>> GetStatsDate(string Country, string City, int StartDate, int FinishDate)
        {


            int year = DateTime.Now.Year; //Or any year you want
            DateTime FStartDate = new DateTime(year, 1, 1).AddDays(StartDate - 1);
            DateTime FFinishDate = new DateTime(year, 1, 1).AddDays(FinishDate - 1);




            List<Weather> Temp_val = _weatherService.GetStatsDates(Country, City, FStartDate, FFinishDate);
            return Temp_val ;
            //string[] words = Temp_val.Split(';');
            //return "Max Temp: " + words[0] + "\nMin Temp: " + words[1] + "\nMedia: " + words[2] + "\nBettwen  " + FStartDate.ToString("d.M.yyyy") + "  And  " + FFinishDate.ToString("d.M.yyyy");
        }


        //GetAll
        [HttpGet]
        public ActionResult<List<Weather>> Index() => _weatherService.Get();


        //Get One from ID
        [HttpGet("{id}")]
        public ActionResult<Weather> Show(string Id)
        {
            var weather = _weatherService.Get(Id);
            if (weather == null)
                return NotFound();

            return weather;
        }

        //Create Object By Post
        [HttpPost]
        public ActionResult<Weather> Store(Weather Weather)
        {
            var weather = _weatherService.Create(Weather);
            return weather;
        }

        //Update from Id and object By PUT
        [HttpPut("{Id:length(24)}")]
        public IActionResult Update(string Id, Weather WeatherIn)
        {
            var weather = _weatherService.Get(Id);

            if (weather == null)
                return NotFound();

            _weatherService.Update(Id, WeatherIn);

            return NoContent();
        }

        //Delete From ID By Delete
        [HttpDelete("{Id:length(24)}")]
        public IActionResult Destroy(string Id)
        {
            var weather = _weatherService.Get(Id);
            if (weather == null)
                return NotFound();

            _weatherService.Remove(weather.Id);

            return NoContent();
        }
    }
}