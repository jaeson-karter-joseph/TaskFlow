using Microsoft.EntityFrameworkCore;
using TaskFlow.API.Models;
namespace TaskFlow.API.Data;

public class TaskDbContext(DbContextOptions<TaskDbContext> options) : DbContext(options)
{
    public DbSet<TaskItem> TaskItems { get; set; }
}
