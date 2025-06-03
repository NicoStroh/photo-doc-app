using MongoDB.Driver;
using PhotoDocApi.Models;

namespace PhotoDocApi.Services;

public class LocationService
{
    private readonly IMongoCollection<Building> _buildings;

    public LocationService(IConfiguration configuration)
    {
        var client = new MongoClient(configuration["MongoDb:ConnectionString"]);
        var database = client.GetDatabase(configuration["MongoDb:Database"]);
        _buildings = database.GetCollection<Building>("buildings");
    }

    public async Task<List<Building>> GetBuildingsAsync()
    {
        return await _buildings.Find(_ => true).ToListAsync();
    }

    public async Task<List<Floor>> GetFloorsAsync(string buildingId)
    {
        var building = await _buildings.Find(b => b.Id == buildingId).FirstOrDefaultAsync();
        if (building != null)
            return building.Floors;
        return new();
    }

    public async Task<List<Apartment>> GetApartmentsAsync(string floorId)
    {
        var buildings = await _buildings.Find(_ => true).ToListAsync();
        foreach (var b in buildings)
        {
            var floor = b.Floors.FirstOrDefault(f => f.Id == floorId);
            if (floor != null)
                return floor.Apartments;
        }
        return new();
    }

    public async Task<List<Room>> GetRoomsAsync(string apartmentId)
    {
        var buildings = await _buildings.Find(_ => true).ToListAsync();
        foreach (var b in buildings)
        {
            foreach (var f in b.Floors)
            {
                var apt = f.Apartments.FirstOrDefault(a => a.Id == apartmentId);
                if (apt != null)
                    return apt.Rooms;
            }
        }
        return new();
    }
}
