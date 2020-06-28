using System.Collections.Generic;
using ClimateDataAnalytics.Models;
using MongoDB.Driver;

namespace ClimateDataAnalytics.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _user;

        public UserService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _user = database.GetCollection<User>(settings.UserCollectionName);
        }

        public List<User> Get() => _user.Find(User => true).ToList();

        public User Get(string Id) => _user.Find<User>(User => User.Id == Id).FirstOrDefault();

        public User Create(User User)
        {
            _user.InsertOne(User);
            return User;
        }

        public void Update(string Id, User UserIn) => _user.ReplaceOne(User => User.Id == Id, UserIn);

        public void Remove(User UserIn) => _user.DeleteOne(User => User.Id == UserIn.Id);

        public void Remove(string Id) => _user.DeleteOne(User => User.Id == Id);
    }
}