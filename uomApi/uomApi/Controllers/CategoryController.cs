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
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly UOMContext _context;

        public CategoryController(UOMContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SysUomcSet>>> GetSysUomcSets()
        {
            return await _context.SysUomcSets.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SysUnitsOfMeasure>> GetSysUnitsOfMeasure(long id)
        {
            var sysUnitsOfMeasure = await _context.SysUnitsOfMeasures.Where(x => x.UmcsId == id.ToString()).ToListAsync();

            if (sysUnitsOfMeasure == null)
            {
                return NotFound();
            }

            return new JsonResult(sysUnitsOfMeasure);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSysUomcSet(long id, SysUomcSet sysUomcSet)
        {
            if (id != sysUomcSet.Uomkey)
            {
                return BadRequest();
            }

            _context.Entry(sysUomcSet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SysUomcSetExists(id))
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
        public async Task<ActionResult<SysUomcSet>> PostSysUomcSet(SysUomcSet sysUomcSet)
        {
            var lastrecordid = _context.SysUomcSets.Max(x => x.Uomkey);
            sysUomcSet.Uomkey = lastrecordid + 1;
            _context.SysUomcSets.Add(sysUomcSet);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SysUomcSetExists(sysUomcSet.Uomkey))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSysUomcSet", new { id = sysUomcSet.Uomkey }, sysUomcSet);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSysUomcSet(long id)
        {
            var sysUomcSet = await _context.SysUomcSets.FindAsync(id);
            if (sysUomcSet == null)
            {
                return NotFound();
            }

            _context.SysUomcSets.Remove(sysUomcSet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SysUomcSetExists(long id)
        {
            return _context.SysUomcSets.Any(e => e.Uomkey == id);
        }
    }
}
