using Microsoft.AspNetCore.Mvc;
using PhotoDocApi.Models;
using PhotoService = PhotoDocApi.Services.PhotoService;

namespace PhotoDocApi.Controllers;

[ApiController]
[Route("api/photos")]
public class PhotoController : ControllerBase
{

    private readonly PhotoService _photoService;

    public PhotoController(PhotoService photoService)
    {
        _photoService = photoService;
    }

    [HttpGet("{photoId}")]
    public async Task<IActionResult> GetByPhotoId(string photoId)
    {
        var result = await _photoService.GetByPhotoIdAsync(photoId);
        return Ok(result);
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadPhoto([FromForm] PhotoUploadRequest request)
    {
        Console.WriteLine($"User: {request.Username}, Craft: {request.Craft}, Defect: {request.DefectType}, Description: {request.Description}, Start: {request.StartProcess}, Location: {request.Location}");

        if (request.Image == null || request.Image.Length == 0)
            return BadRequest("Bild fehlt.");

        if (string.IsNullOrEmpty(request.Username))
            return BadRequest("Benutzername fehlt.");


        using var ms = new MemoryStream();
        await request.Image.CopyToAsync(ms);

        var photo = new PhotoDocument
        {
            FileName = $"{request.Username}_{DateTime.UtcNow:yyyyMMdd_HHmmss}{Path.GetExtension(request.Image.FileName)}",
            Username = request.Username,
            Craft = request.Craft,
            DefectType = request.DefectType,
            Description = request.Description,
            StartProcess = request.StartProcess,
            Location = request.Location,
            ImageData = ms.ToArray(),
        };

        await _photoService.CreateAsync(photo);

        Console.WriteLine($"Foto gespeichert: {request.Image.FileName}");

        return Ok(new { message = "Foto erfolgreich gespeichert in MongoDB." });
    }

    [HttpGet("user/{username}")]
    public async Task<IActionResult> GetByUser(string username)
    {
        var results = await _photoService.GetByUserAsync(username);
        return Ok(results);
    }

}
