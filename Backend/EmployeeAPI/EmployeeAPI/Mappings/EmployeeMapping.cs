using EmployeeAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeAPI.Mappings
{
    public class EmployeeMapping : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.ToTable("Employee");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .HasColumnType("varchar(30)")
                .IsRequired();

            builder.Property(x => x.Surname)
                .HasColumnType("varchar(50)")
                .IsRequired();

            builder.Property(x => x.Salary)
                .HasColumnType("numeric(18,2)")
                .IsRequired();

            builder.Property(x => x.Birthday)
                .HasColumnType("datetime")
                .IsRequired();

            builder.Property(x => x.DepartmentId)
                .HasColumnType("int")
                .IsRequired();

            builder.HasOne(x => x.Department).WithMany(x => x.Employees).HasForeignKey(x => x.DepartmentId);
        }
    }
}
