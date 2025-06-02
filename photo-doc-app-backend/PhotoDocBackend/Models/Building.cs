using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PhotoDocApi.Models;

public class Building
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    public int Number { get; set; }
    public string Name { get; set; } = string.Empty;
    public List<Floor> Floors { get; set; } = new();

    public Building(string name)
    {
        Name = name;
        Floors = new List<Floor>
        {
            new Floor(1, "Ground Floor"),
            new Floor(2, "Floor 1"),
            new Floor(3, "Floor 2"),
            new Floor(4, "Penthouse")
        };
    }
}