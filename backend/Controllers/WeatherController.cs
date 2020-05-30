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
        [HttpPost("{IdForGets}", Name = "GetIdForGets")]
        public ActionResult<Weather> GetByday(string IdForGets)
        {
            var weather = _weatherService.Get_ByCity(IdForGets);

            if (weather == null)
            {
                weather = new Weather();
                string number = WeatherService.CityToNumber(IdForGets);
                string[] words = IdForGets.Split('-');
                int day = Int32.Parse(words[3]) - Int32.Parse(words[2]);
                weather = _weatherService.GetJson(weather, number, day);
                if (weather == null)
                {
                    return StatusCode(418);
                }
            }

            return weather;
        }

        [HttpPost("date", Name = "GetStatsDate")]
        public string GetStatsDate(string Country, string City, DateTime StartDate, DateTime FinishDate)
        {
            String tempVal = _weatherService.GetStatsDates(Country, City, StartDate, FinishDate);

            string[] words = tempVal.Split(';');

            return "Max Temp: " + words[0] + "\n Min Temp" + words[1] + "Between " + StartDate + " and " +
                   FinishDate;
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