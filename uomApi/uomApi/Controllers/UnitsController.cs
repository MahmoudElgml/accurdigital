using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using uomApi.Models;

namespace uomApi.Controllers
{
    [Route("api/units")]
    [ApiController]
    public class UnitsController : ControllerBase
    {
        private readonly UOMContext _context;

        public UnitsController(UOMContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SysUnitsOfMeasure>>> GetSysUnitsOfMeasures()
        {
            return await _context.SysUnitsOfMeasures.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SysUnitsOfMeasure>> GetSysUnitsOfMeasure(long id)
        {
            var sysUnitsOfMeasure = await _context.SysUnitsOfMeasures.FindAsync(id);

            if (sysUnitsOfMeasure == null)
            {
                return NotFound();
            }

            return sysUnitsOfMeasure;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutSysUnitsOfMeasure(long id, SysUnitsOfMeasure sysUnitsOfMeasure)
        {
            
                if (id != sysUnitsOfMeasure.Uomkey)
            {
                return BadRequest();
            }

            _context.Entry(sysUnitsOfMeasure).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SysUnitsOfMeasureExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult<SysUnitsOfMeasure>> PostSysUnitsOfMeasure(SysUnitsOfMeasure sysUnitsOfMeasure)
        {
            var lastrecordid = _context.SysUnitsOfMeasures.Max(x => x.Uomkey);
            sysUnitsOfMeasure.Uomkey = lastrecordid + 1;
            _context.SysUnitsOfMeasures.Add(sysUnitsOfMeasure);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SysUnitsOfMeasureExists(sysUnitsOfMeasure.Uomkey))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSysUnitsOfMeasure", new { id = sysUnitsOfMeasure.Uomkey }, sysUnitsOfMeasure);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSysUnitsOfMeasure(long id)
        {
            var sysUnitsOfMeasure = await _context.SysUnitsOfMeasures.FindAsync(id);
            if (sysUnitsOfMeasure == null)
            {
                return NotFound();
            }

            _context.SysUnitsOfMeasures.Remove(sysUnitsOfMeasure);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SysUnitsOfMeasureExists(long id)
        {
            return _context.SysUnitsOfMeasures.Any(e => e.Uomkey == id);
        }
    }
}
