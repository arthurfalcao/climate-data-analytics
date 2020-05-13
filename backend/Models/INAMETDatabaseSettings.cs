namespace INAMETApi.Models
{
	public class INAMETDatabaseSettings : IDatabaseSettings
	{
		public string ConnectionString { get; set; }
		public string DatabaseName { get; set; }
		public string UserCollectionName { get; set; }
		public string WeatherCollectionName { get; set; }
	}

	public interface IDatabaseSettings
	{
		string ConnectionString { get; set; }
		string DatabaseName { get; set; }
		string UserCollectionName { get; set; }
		string WeatherCollectionName { get; set; }
	}
}