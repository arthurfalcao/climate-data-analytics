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

		[BsonRepresentation(BsonType.DateTime)]
		public DateTime issueDate { get; set; }
		[BsonRepresentation(BsonType.DateTime)]
		public DateTime forecastDate { get; set; }
		public string Country { get; set; }
		public string  City { get; set; }
		public string weather { get; set; }
		public string minTemp { get; set; }
		public string maxTemp { get; set; }
		public string weatherIcon { get; set; }


	}
}    