using ClimateDataAnalyticsApi.Models;
using ClimateDataAnalyticsApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;

namespace ClimateDataAnalyticsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : Controller
    {
        private readonly WeatherService _WeatherService;

        public WeatherController(WeatherService WeatherService)
        {
            _WeatherService = WeatherService;
        }

        //Algoritmo
        [HttpPost("{IdForGets}", Name = "GetIdForGets")]
        
        public ActionResult<Weather> GetByday(string IdForGets)
        {

            var Weather = _WeatherService.Get_ByCity(IdForGets);

            if (Weather == null)
            {

                Weather = new Weather();
                string number = _WeatherService.CityToNumber(IdForGets);
                string[] words = IdForGets.Split('-');
                int day = Int32.Parse(words[3]) - Int32.Parse(words[2]);
                Weather = _WeatherService.getjson(Weather, number, day);
                if (Weather == null) { return StatusCode(418); }
            }

            return Weather;
        }


        [HttpPost] 
        [Route("api/[controller]/Date")] 
        public string GetStatsDate(string Country, string City, DateTime StartDate, DateTime FinishDate)
        {

            String Temp_val = _WeatherService.GetStatsDates(Country, City, StartDate, FinishDate);

            string[] words = Temp_val.Split(';');

            return "Max Temp: "+words[0]+"\n Min Temp"+words[1]+"Bettwen "+StartDate+" And "+FinishDate;



        }









        //GetAll
        [HttpGet]
        [Route("api/[controller]")]
        public ActionResult<List<Weather>> Get() => _WeatherService.Get();
        //Get One from ID
        [HttpGet("{id}", Name = "GetID")]
        public ActionResult<Weather> Get(string Id)
        {
            var Weather = _WeatherService.Get(Id);

            if (Weather == null)
                return NotFound();

            return Weather;
        }
        //Create Object By Post
        [HttpPost]
        public ActionResult<Weather> Create(Weather Weather)
        {
            _WeatherService.Create(Weather);

            return CreatedAtRoute("GetWeather", new { Id = Weather.Id.ToString() }, Weather);
        }
        //Update from Id and object By PUT
        [HttpPut("{Id:length(24)}")]
        public IActionResult Update(string Id, Weather WeatherIn)
        {
            var Weather = _WeatherService.Get(Id);

            if (Weather == null)
                return NotFound();

            _WeatherService.Update(Id, WeatherIn);

            return NoContent();
        }
        //Delete From ID By Delete
        [HttpDelete("{Id:length(24)}")]
        public IActionResult Delete(string Id)
        {
            var Weather = _WeatherService.Get(Id);

            if (Weather == null)
                return NotFound();

            _WeatherService.Remove(Weather.Id);

            return NoContent();
        }
    }




}