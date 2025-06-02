using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PhotoDocApi.Models;

namespace PhotoDocApi.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IConfiguration configuration)
        {
            var client = new MongoClient(configuration["MongoDb:ConnectionString"]);
            var database = client.GetDatabase(configuration["MongoDb:Database"]);
            _users = database.GetCollection<User>("users");
        }

        public async Task<bool> LoginAsync(string username, string password)
        {
            // Wenn Benutzer existiert → Login prüfen
            var existing = await _users.Find(u => u.Username == username).FirstOrDefaultAsync();
            if (existing != null)
                return existing.Password == password;

            // Falls nicht vorhanden → registrieren
            var user = new User { Username = username, Password = password };
            await _users.InsertOneAsync(user);
            return true;
        }
    }
}
