using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace API.Middleware
{
    public class ExceptionMiddleware(IHostEnvironment env, ILogger<ExceptionMiddleware> logger) : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleException(context, ex);
            }
        }

        private async Task HandleException(HttpContext context, Exception ex) 
        /* metoda prima 2 parametra: 
         context → predstavlja trenutni HTTP zahtev i odgovor
         ex → greška koja se desila*/

        {
            logger.LogError(ex, ex.Message); //ne salje nista korisniku, samo zapisuje grešku u log
            context.Response.ContentType = "application/json"; //ovim govorimo serveru da ce odgovor biti json
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = new ProblemDetails
            {
                Status = 500,
                Detail = env.IsDevelopment() //proverava da li je dev okruzenje, ukoliko ne je detail=null, ne vraca odgovor
                    ? ex.StackTrace?.ToString()
                    : null,
                Title = ex.Message
            };

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var json = JsonSerializer.Serialize(response, options); //pretvara ceo dobijeni respons u json

            await context.Response.WriteAsync(json); //trenutak kada server salje odgovor front-endu
        }
    }
}
