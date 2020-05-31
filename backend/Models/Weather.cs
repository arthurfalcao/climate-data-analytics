using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ClimateDataAnalyticsApi.Models
{
    public class Weather
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.DateTime)]
        public DateTime IssueDate { get; set; }

        [BsonRepresentation(BsonType.DateTime)]
        public DateTime ForecastDate { get; set; }

        public string Country { get; set; }
        public string City { get; set; }
        public string weather { get; set; }
        public string MinTemp { get; set; }
        public string MaxTemp { get; set; }
        public string WeatherIcon { get; set; }

        public string IdForGets { get; set; }
    }
}