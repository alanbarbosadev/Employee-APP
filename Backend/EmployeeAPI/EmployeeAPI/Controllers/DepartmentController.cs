using EmployeeAPI.Models;
using EmployeeAPI.Repositories.IRepositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentRepository _repository;

        public DepartmentController(IDepartmentRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Department>>> Get()
        {
            var departments = await _repository.ReadAllAsync();

            return Ok(departments);
        }

        [HttpGet]
        [Route("ById/{id}")]
        public async Task<ActionResult<Department>> GetById(Guid id)
        {
            var department = await _repository.ReadByIdAsync(id);

            if (department == null)
                return NotFound(new { message = "Department Not Found" });

            return Ok(department);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Department>> Post(
            [FromBody] Department department)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _repository.CreateAsync(department);

            return Ok(department);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<Department>> Put(
            Guid id,
            [FromBody] Department department)
        {
            if (id != department.Id)
                return BadRequest(new { message = "Invalid Department" });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _repository.UpdateAsync(department);
                return Ok(department);
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest(new { message = "Department Has Already Been Updated" });
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Unable To Update The Department" });
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<Department>> Delete(Guid id)
        {
            var department = await _repository.ReadByIdAsync(id);

            if (department == null)
                return NotFound(new { message = "Department Not Found" });

            try
            {
                await _repository.DeleteAsync(department);
                return Ok(department);
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Unable To Delete The Department" });
            }
        }
    }
}
