using EmployeeAPI.Models;
using EmployeeAPI.Repositories.IRepositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _repository;

        public EmployeeController(IEmployeeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Employee>>> Get(Guid? departmentId = null)
        {
            IEnumerable<Employee> employees = null;

            if (departmentId == null)
            {
                employees = await _repository.ReadAllAsync();
            }
            else
            {
                employees = await _repository.ReadAllAsync(x => x.DepartmentId == departmentId);
            }

            return Ok(employees);
        }

        [HttpGet]
        [Route("ById/{id}")]
        public async Task<ActionResult<Employee>> GetById(Guid id)
        {
            var employee = await _repository.ReadByIdAsync(id);

            if (employee == null)
                return NotFound(new { message = "Employee Not Found!" });

            return Ok(employee);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Employee>> Post(
            [FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _repository.CreateAsync(employee);

            return Ok(employee);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<Employee>> Put(
            Guid id,
            [FromBody] Employee employee)
        {
            if (id != employee.Id)
                return BadRequest(new { message = "Invalid Employee" });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _repository.UpdateAsync(employee);
                return Ok(employee);
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest(new { message = "Employee Has Already Been Updated" });
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Unable To Update the Employee" });
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<Employee>> Delete(Guid id)
        {
            var employee = await _repository.ReadByIdAsync(id);

            if (employee == null)
                return NotFound(new { message = "Employee Not Found" });

            try
            {
                await _repository.DeleteAsync(employee);
                return Ok(employee);
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Unable To Remove The Employee" });
            }
        }
    }
}
