using INAMETApi.Models;
using WeatherServiceApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WeatherControl.Controllers
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