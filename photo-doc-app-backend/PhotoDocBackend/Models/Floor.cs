using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PhotoDocApi.Models;

public class Floor
{
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; }
    public List<Apartment> Apartments { get; set; }

    public Floor(string name)
    {
        Id = ObjectId.GenerateNewId().ToString();
        Name = name;
        Apartments = new List<Apartment> {
            new Apartment("Apartment 1"),
            new Apartment("Apartment 2"),
            new Apartment("Apartment 3"),
            new Apartment("Apartment 4")
        };
    }

}
