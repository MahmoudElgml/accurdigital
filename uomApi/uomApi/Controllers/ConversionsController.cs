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
    [Route("api/conversions")]
    [ApiController]
    public class ConversionsController : ControllerBase
    {
        private readonly UOMContext _context;

        public ConversionsController(UOMContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SysUomeConversion>>> GetSysUomeConversions()
        {
            return await _context.SysUomeConversions.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SysUomeConversion>> GetSysUomeConversion(long id)
        {
            var sysUomeConversion = await _context.SysUomeConversions.FindAsync(id);

            if (sysUomeConversion == null)
            {
                return NotFound();
            }

            return sysUomeConversion;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSysUomeConversion(long id, SysUomeConversion sysUomeConversion)
        {
            if (id != sysUomeConversion.Uomkey)
            {
                return BadRequest();
            }

            _context.Entry(sysUomeConversion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SysUomeConversionExists(id))
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
        public async Task<ActionResult<SysUomeConversion>> PostSysUomeConversion(SysUomeConversion sysUomeConversion)
        {
            var haveElements = _context.SysUomeConversions.Any();
            long lastrecordid;
            if (!haveElements)
            {
                sysUomeConversion.Uomkey = 5;
            }
            else
            {
                lastrecordid = _context.SysUomeConversions.Max(x => x.Uomkey);
                sysUomeConversion.Uomkey = lastrecordid + 1;
            }
            _context.SysUomeConversions.Add(sysUomeConversion);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SysUomeConversionExists(sysUomeConversion.Uomkey))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSysUomeConversion", new { id = sysUomeConversion.Uomkey }, sysUomeConversion);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSysUomeConversion(long id)
        {
            var sysUomeConversion = await _context.SysUomeConversions.FindAsync(id);
            if (sysUomeConversion == null)
            {
                return NotFound();
            }

            _context.SysUomeConversions.Remove(sysUomeConversion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SysUomeConversionExists(long id)
        {
            return _context.SysUomeConversions.Any(e => e.Uomkey == id);
        }
    }
}
