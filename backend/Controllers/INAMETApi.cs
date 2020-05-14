using INAMETApi.Models;
using UserServiceApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace UserControl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserService _userservice;
        
        public UserController(UserService UserService)
        {
            _userservice = UserService;
        }

        [HttpGet]
        public ActionResult<List<User>> Get() => _userservice.Get();

        [HttpGet("{Email}", Name = "GetEmail")]
        public ActionResult<User> Get(string Id)
        {
            var User = _userservice.Get(Id);

            if (User == null)
                return NotFound();

            return User;
        }

        [HttpPost]
        public ActionResult<User> Create(User User)
        {
            _userservice.Create(User);

            return CreatedAtRoute("GetUser", new { Id = User.Id.ToString() }, User);
        }

        [HttpPut("{Id:length(24)}")]
        public IActionResult Update(string Id, User UserIn)
        {
            var User = _userservice.Get(Id);

            if (User == null)
                return NotFound();

            _userservice.Update(Id, UserIn);

            return NoContent();
        }

        [HttpDelete("{Id:length(24)}")]
        public IActionResult Delete(string Id)
        {
            var User = _userservice.Get(Id);

            if (User == null)
                return NotFound();

            _userservice.Remove(User.Id);

            return NoContent();
        }
    }

}