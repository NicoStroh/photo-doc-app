using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PhotoDocApi.Models;

public class Room
{
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; }

    public Room(string name)
    {
        Id = ObjectId.GenerateNewId().ToString();
        Name = name;
    }

}
