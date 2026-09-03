using TaskTrackerApplication.Data;
using TaskTrackerApplication.Interfaces;
using TaskTrackerApplication.Repositories;
using TaskTrackerApplication.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddSingleton<DbConnectionFactory>();
builder.Services.AddScoped<AuthRepository>();
builder.Services.AddScoped<DashboardRepository>();
builder.Services.AddScoped<TaskRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();
builder.Services.AddScoped<IReviewTasksService, ReviewTasksService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
 options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme { Name="Authorization", Type=SecuritySchemeType.Http, Scheme="Bearer", BearerFormat="JWT", In=ParameterLocation.Header, Description="Enter your JWT token." });
 options.AddSecurityRequirement(new OpenApiSecurityRequirement {{ new OpenApiSecurityScheme { Reference=new OpenApiReference { Type=ReferenceType.SecurityScheme, Id="Bearer" } }, Array.Empty<string>() }});
});
builder.Services.AddCors(options => options.AddPolicy("Frontend", policy => policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
 var jwtKey = builder.Configuration["Jwt:Key"];
 options.TokenValidationParameters = new TokenValidationParameters { ValidateIssuerSigningKey=true, IssuerSigningKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!)), ValidateIssuer=true, ValidIssuer=builder.Configuration["Jwt:Issuer"], ValidateAudience=true, ValidAudience=builder.Configuration["Jwt:Audience"], ValidateLifetime=true, ClockSkew=TimeSpan.Zero };
});
builder.Services.AddAuthorization();
var app = builder.Build();
if (app.Environment.IsDevelopment()) { app.UseSwagger(); app.UseSwaggerUI(); }
app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
