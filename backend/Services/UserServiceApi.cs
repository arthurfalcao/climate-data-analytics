using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using INAMETApi.Models;
//using INAMETDatabaseSettings.Models;

namespace UserServiceApi.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _User;

        public UserService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _User = database.GetCollection<User>(settings.UserCollectionName);

        }

        public List<User> Get() => _User.Find(User => true).ToList();

        public User Get(string Id) => _User.Find<User>(User => User.Id == Id).FirstOrDefault();

        public User Create(User User)
        {
            _User.InsertOne(User);
            return User;
        }

        public void Update(string Id, User UserIn) => _User.ReplaceOne(User => User.Id == Id, UserIn);

        public void Remove(User UserIn) => _User.DeleteOne(User => User.Id == UserIn.Id);

        public void Remove(string Id) => _User.DeleteOne(User => User.Id == Id);
    }
  
}