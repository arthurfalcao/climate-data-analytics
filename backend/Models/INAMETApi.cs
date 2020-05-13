using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace INAMETApi.Models
{
	public class User
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }

		[BsonElement("Name")]
		public string Nome { get; set; }
		public string Email { get; set; }
        public string Password { get; set; }
        public string Birthday { get; set; }
		public string Power { get; set; }
    }
	public class Weather
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }

		public DateTime issueDate { get; set; }
		public DateTime forecastDate { get; set; }
		public string Country { get; set; }
		public string  City { get; set; }
		public string weather { get; set; }
		public int minTemp { get; set; }
		public int maxTemp { get; set; }
		public string weatherIcon { get; set; }


	}
}    