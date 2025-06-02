using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PhotoDocApi.Models;

public class PhotoDocument
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Craft { get; set; } = string.Empty;
    public string DefectType { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool StartProcess { get; set; }
    public string Location { get; set; } = string.Empty;

    public byte[] ImageData { get; set; } = Array.Empty<byte>();

}
