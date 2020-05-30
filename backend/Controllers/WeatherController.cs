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
        [Route("api/[controller]")]
        public ActionResult<List<Weather>> Get() => _weatherService.Get();

        //Get One from ID
        [HttpGet("{id}", Name = "GetID")]
        public ActionResult<Weather> Get(string Id)
        {
            var weather = _weatherService.Get(Id);
            if (weather == null)
                return NotFound();

            return weather;
        }

        //Create Object By Post
        [HttpPost]
        public ActionResult<Weather> Create(Weather Weather)
        {
            _weatherService.Create(Weather);

            return CreatedAtRoute("GetWeather", new {Id = Weather.Id.ToString()}, Weather);
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
        public IActionResult Delete(string Id)
        {
            var weather = _weatherService.Get(Id);
            if (weather == null)
                return NotFound();

            _weatherService.Remove(weather.Id);

            return NoContent();
        }
    }
}