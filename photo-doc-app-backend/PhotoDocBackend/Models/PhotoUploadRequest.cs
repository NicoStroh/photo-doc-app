using Microsoft.AspNetCore.Http;

namespace PhotoDocApi.Models;

public class PhotoUploadRequest
{
    public string Username { get; set; } = string.Empty;
    public string Craft { get; set; } = string.Empty;
    public string DefectType { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool StartProcess { get; set; }
    public string Location { get; set; } = string.Empty;

    public IFormFile Image { get; set; } = null!;
}
