using System;
using System.Collections.Generic;
using ClimateDataAnalytics.Models;
using ClimateDataAnalytics.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClimateDataAnalytics.Controllers
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
        [HttpPost, Route("GetByDay/{value}")]
        public ActionResult<Weather> GetByDay(string value)
        {
            var weatherByCity = _weatherService.Get_ByCity(value);

            if (weatherByCity != null) return weatherByCity;

            var number = WeatherService.CityToNumber(value);
            var words = value.Split('-');
            var day = int.Parse(words[3]) - int.Parse(words[2]);

            var weather = _weatherService.GetJson(new Weather(), number, day);

            if (weather == null)
                return StatusCode(418);

            return weather;
        }

        [HttpPost, Route("GetStatsDate/{Country}/{City}/{StartDate}/{FinishDate}")]
        public ActionResult<List<Weather>> GetStatsDate(string Country, string City, int StartDate, int FinishDate)
        {
            var year = DateTime.Now.Year; //Or any year you want
            var fStartDate = new DateTime(year, 1, 1).AddDays(StartDate - 1);
            var fFinishDate = new DateTime(year, 1, 1).AddDays(FinishDate - 1);

            return _weatherService.GetStatsDates(Country, City, fStartDate, fFinishDate);
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