using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using PhotoDocApi.Models;

namespace PhotoDocApi.Controllers;

[ApiController]
[Route("api/locations/init")]
public class LocationInitController : ControllerBase
{
    private readonly IMongoCollection<Building> _buildings;

    public LocationInitController(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDb:ConnectionString"]);
        var database = client.GetDatabase(config["MongoDb:Database"]);
        _buildings = database.GetCollection<Building>("buildings");
    }

    [HttpPost]
    public async Task<IActionResult> Seed()
    {
        // Sicherheits-Check: Nicht erneut ausführen, wenn Daten vorhanden
        var count = await _buildings.CountDocumentsAsync(_ => true);
        if (count > 0)
            return BadRequest("Gebäude sind bereits vorhanden.");


        var buildings = new List<Building>
        {
            new Building("Building 1"),
            new Building("Building 2"),
            new Building("Building 3"),
            new Building("Project 1")
        };

        await _buildings.InsertManyAsync(buildings);
        return Ok("Gebäude wurden erfolgreich initialisiert.");
    }
}
