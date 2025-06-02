namespace PhotoDocApi.Models;

public class Floor
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Apartment> Apartments { get; set; }

    public Floor(int id, string name)
    {
        Id = id;
        Name = name;
        Apartments = new List<Apartment> {
            new Apartment(1, "Apartment 1"),
            new Apartment(2, "Apartment 2"),
            new Apartment(3, "Apartment 3"),
            new Apartment(4, "Apartment 4")
        };
    }

}
