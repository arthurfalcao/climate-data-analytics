using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using INAMETApi.Models;
using Microsoft.Extensions.Options;
using UserServiceApi.Services;
//using WeatherServiceApi.Services;

//using INAMETDatabaseSettings.Models;



namespace INAMET
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // requires using Microsoft.Extensions.Options
    	   
            services.Configure<INAMETDatabaseSettings>(Configuration.GetSection(nameof(INAMETDatabaseSettings)));
        	services.AddSingleton<IDatabaseSettings>(sp =>sp.GetRequiredService<IOptions<INAMETDatabaseSettings>>().Value);

           
            //adicionar antes de services.AddControllers();
	        services.AddSingleton<UserService>();
            //services.AddSingleton<WeatherService>();
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

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
