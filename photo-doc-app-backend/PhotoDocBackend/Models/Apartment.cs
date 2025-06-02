namespace PhotoDocApi.Models;

public class Apartment
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Room> Rooms { get; set; }

    public Apartment(int id, string name)
    {
        Id = id;
        Name = name;
        Rooms = new List<Room> {
            new Room(1, "Office"),
            new Room(2, "Dining Room"),
            new Room(3, "Kitchen"),
            new Room(4, "Bedroom")
        };
    }

}
