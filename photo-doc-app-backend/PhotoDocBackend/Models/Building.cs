using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PhotoDocApi.Models;

public class Building
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;
    public List<Floor> Floors { get; set; } = new();

    public Building(string name)
    {
        Name = name;
        Floors = new List<Floor>
        {
            new Floor("Ground Floor"),
            new Floor("Floor 1"),
            new Floor("Floor 2"),
            new Floor("Penthouse")
        };
    }
}