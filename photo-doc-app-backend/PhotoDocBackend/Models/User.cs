using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PhotoDocApi.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
