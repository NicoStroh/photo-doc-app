using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PhotoDocApi.Models;

public class Apartment
{
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; }
    public List<Room> Rooms { get; set; }

    public Apartment(string name)
    {
        Id = ObjectId.GenerateNewId().ToString();
        Name = name;
        Rooms = new List<Room> {
            new Room("Office"),
            new Room("Dining Room"),
            new Room("Kitchen"),
            new Room("Bedroom")
        };
    }

}
