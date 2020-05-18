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

<<<<<<< HEAD:backend/Controllers/WeatherController.cs

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




=======
>>>>>>> cd3ee575bce2326ed0665539fbf779716250f38d:backend/Controllers/INAMETApiWeatherr.cs
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

<<<<<<< HEAD:backend/Controllers/WeatherController.cs
=======
        [HttpPost("{number}", Name = "GetCityNumber")]
        public ActionResult<Weather> CreateJson(string number)
        {
            var Weather = new Weather();
            string url="https://worldweather.wmo.int/en/json/";
            url+=number;
            url+="_en.json";
            _WeatherService.getjson(url ,Weather);
            _WeatherService.Create(Weather);

            return CreatedAtRoute("GetWeather", new { Id = Weather.Id.ToString() }, Weather);
        }

>>>>>>> cd3ee575bce2326ed0665539fbf779716250f38d:backend/Controllers/INAMETApiWeatherr.cs
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