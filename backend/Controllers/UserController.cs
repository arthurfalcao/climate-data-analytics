using System.Collections.Generic;
using ClimateDataAnalytics.Models;
using ClimateDataAnalytics.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClimateDataAnalytics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserService _userService;

        public UserController(UserService UserService)
        {
            _userService = UserService;
        }

        //Get All
        [HttpGet]
        public ActionResult<List<User>> Get() => _userService.Get();

        //Get One From Email By Get opperation 
        [HttpGet("{Email}", Name = "GetEmail")]
        public ActionResult<User> Get(string Id)
        {
            var user = _userService.Get(Id);
            if (user == null)
                return NotFound();

            return user;
        }

        //Create User By Post Opperation
        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            _userService.Create(user);
            return CreatedAtRoute("GetUser", new {Id = user.Id.ToString()}, user);
        }

        //Update User From ID and Obj By Put Opperation
        [HttpPut("{Id:length(24)}")]
        public IActionResult Update(string Id, User UserIn)
        {
            var user = _userService.Get(Id);

            if (user == null)
                return NotFound();

            _userService.Update(Id, UserIn);

            return NoContent();
        }

        //Update User From ID By Del Opperation
        [HttpDelete("{Id:length(24)}")]
        public IActionResult Delete(string Id)
        {
            var user = _userService.Get(Id);

            if (user == null)
                return NotFound();

            _userService.Remove(user.Id);

            return NoContent();
        }
    }
}