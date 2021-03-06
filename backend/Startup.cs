using ClimateDataAnalytics.Models;
using ClimateDataAnalytics.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace ClimateDataAnalytics
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        private IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // requires using Microsoft.Extensions.Options
            services.Configure<ClimateDataAnalyticsDatabaseSettings>(
                Configuration.GetSection(nameof(ClimateDataAnalyticsDatabaseSettings))
            );
            services.AddSingleton<IDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<ClimateDataAnalyticsDatabaseSettings>>().Value
            );

            services.AddCors(options => { options.AddDefaultPolicy(builder => { builder.WithOrigins("*"); }); });

            // adicionar antes de services.AddControllers();
            services.AddSingleton<UserService>();
            services.AddSingleton<WeatherService>();
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}