using System;
using System.Collections.Generic;

#nullable disable

namespace uomApi.Models
{
    public partial class SysUomeConversion
    {
        public long Uomkey { get; set; }
        public long FromUomkey { get; set; }
        public long ToUomkey { get; set; }
        public decimal UomBaseNbr { get; set; }
        public decimal UomOffsetNbr { get; set; }
        public decimal UomNumeratorNbr { get; set; }
        public decimal UomDenominatorNbr { get; set; }
        public string ConversionFormula { get; set; }

        public virtual SysUnitsOfMeasure FromUomkeyNavigation { get; set; }
    }
}
