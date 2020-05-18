using ClimateDataAnalyticsApi.Models;
using ClimateDataAnalyticsApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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


        // [HttpPost("{number}", Name = "GetCityNumber")]
        // public ActionResult<Weather> CreateJson(string number)
        // {
        //     var Weather = new Weather();

        //     _WeatherService.getjson(Weather,number);

        //     return Weather;
        // }


        [HttpPost("{IdForGets}", Name = "GetIdForGets")]
        public ActionResult<Weather> GetByday(string IdForGets)
        {

            var Weather = _WeatherService.Get_ByCity(IdForGets);

            if (Weather == null)
            {
              
                Weather = new Weather();
                string number = _WeatherService.CityToNumber(IdForGets);
                _WeatherService.getjson(Weather, number);
            }

            return Weather;
        }




        [HttpGet]
        public ActionResult<List<Weather>> Get() => _WeatherService.Get();

        [HttpGet("{id}", Name = "GetID")]
        public ActionResult<Weather> Get(string Id)
        {
            var Weather = _WeatherService.Get(Id);

            if (Weather == null)
                return NotFound();

            return Weather;
        }

        [HttpPost]
        public ActionResult<Weather> Create(Weather Weather)
        {
            _WeatherService.Create(Weather);

            return CreatedAtRoute("GetWeather", new { Id = Weather.Id.ToString() }, Weather);
        }

        [HttpPut("{Id:length(24)}")]
        public IActionResult Update(string Id, Weather WeatherIn)
        {
            var Weather = _WeatherService.Get(Id);

            if (Weather == null)
                return NotFound();

            _WeatherService.Update(Id, WeatherIn);

            return NoContent();
        }

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