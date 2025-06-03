using Microsoft.AspNetCore.Mvc;
using PhotoDocApi.Services;
using PhotoDocApi.Models;

namespace PhotoDocApi.Controllers;

[ApiController]
[Route("api/location")]
public class LocationController : ControllerBase
{
    private readonly LocationService _locationService;

    public LocationController(LocationService locationService)
    {
        _locationService = locationService;
    }

    [HttpGet("buildings")]
    public async Task<ActionResult<List<Building>>> GetBuildings()
    {
        var buildings = await _locationService.GetBuildingsAsync();
        return Ok(buildings);
    }

    [HttpGet("buildings/{buildingId}/floors")]
    public async Task<ActionResult<List<Floor>>> GetFloors(string buildingId)
    {
        var floors = await _locationService.GetFloorsAsync(buildingId);
        return Ok(floors);
    }

    [HttpGet("floors/{floorId}/apartments")]
    public async Task<ActionResult<List<Apartment>>> GetApartments(string floorId)
    {
        var apartments = await _locationService.GetApartmentsAsync(floorId);
        return Ok(apartments);
    }

    [HttpGet("apartments/{apartmentId}/rooms")]
    public async Task<ActionResult<List<Room>>> GetRooms(string apartmentId)
    {
        var rooms = await _locationService.GetRoomsAsync(apartmentId);
        return Ok(rooms);
    }
}
