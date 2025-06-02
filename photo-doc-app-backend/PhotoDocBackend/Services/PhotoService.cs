using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PhotoDocApi.Models;

namespace PhotoDocApi.Services;

public class PhotoService
{
    private readonly IMongoCollection<PhotoDocument> _photos;

    public PhotoService(IConfiguration configuration)
    {
        var client = new MongoClient(configuration["MongoDb:ConnectionString"]);
        var database = client.GetDatabase(configuration["MongoDb:Database"]);
        _photos = database.GetCollection<PhotoDocument>("photos");
    }

    public async Task<PhotoDocument> GetByPhotoIdAsync(string photoId)
    {
        var photo = await _photos.Find(p => p.Id == photoId).FirstOrDefaultAsync();
        return photo;
    }

    public async Task<List<PhotoDocument>> GetByUserAsync(string username)
    {
        return await _photos.Find(p => p.Username == username).ToListAsync();
    }

    public async Task CreateAsync(PhotoDocument photo)
    {
        await _photos.InsertOneAsync(photo);
    }

    public async Task<List<PhotoDocument>> GetAllAsync() => await _photos.Find(_ => true).ToListAsync();

}
