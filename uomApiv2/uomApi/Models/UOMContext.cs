using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace uomApi.Models
{
    public partial class UOMContext : DbContext
    {
        public UOMContext()
        {
        }

        public UOMContext(DbContextOptions<UOMContext> options)
            : base(options)
        {
        }

        public virtual DbSet<SysUnitsOfMeasure> SysUnitsOfMeasures { get; set; }
        public virtual DbSet<SysUomcSet> SysUomcSets { get; set; }
        public virtual DbSet<SysUomeConversion> SysUomeConversions { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<SysUnitsOfMeasure>(entity =>
            {
                entity.HasKey(e => e.Uomkey)
                    .HasName("PK_MI_UOME");

                entity.ToTable("SYS_UNITS_OF_MEASURE");

                entity.Property(e => e.Uomkey)
                    .ValueGeneratedNever()
                    .HasColumnName("UOMKEY");

                entity.Property(e => e.UmcsId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("UMCS_ID");

                entity.Property(e => e.UomeCaption)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("UOME_CAPTION");

                entity.Property(e => e.UomeCateg)
                    .HasMaxLength(50)
                    .HasColumnName("UOME_CATEG");

                entity.Property(e => e.UomeDesc)
                    .HasMaxLength(255)
                    .HasColumnName("UOME_DESC");

                entity.Property(e => e.UomeId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("UOME_ID");

                entity.Property(e => e.UomeSysFlg)
                    .IsRequired()
                    .HasMaxLength(1)
                    .HasColumnName("UOME_SYS_FLG")
                    .HasDefaultValueSql("('N')");
            });

            modelBuilder.Entity<SysUomcSet>(entity =>
            {
                entity.HasKey(e => e.Uomkey)
                    .HasName("PK_UMCS");

                entity.ToTable("SYS_UOMC_SETS");

                entity.Property(e => e.Uomkey)
                    .ValueGeneratedNever()
                    .HasColumnName("UOMKEY");

                entity.Property(e => e.UmcsDescTx)
                    .HasMaxLength(255)
                    .HasColumnName("UMCS_DESC_TX");

                entity.Property(e => e.UmcsId)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("UMCS_ID");
            });

            modelBuilder.Entity<SysUomeConversion>(entity =>
            {
                entity.HasKey(e => e.Uomkey)
                    .HasName("PK_MI_UOMC");

                entity.ToTable("SYS_UOME_CONVERSIONS");

                entity.Property(e => e.Uomkey)
                    .ValueGeneratedNever()
                    .HasColumnName("UOMKEY");

                entity.Property(e => e.ConversionFormula)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("CONVERSION_FORMULA");

                entity.Property(e => e.FromUomkey).HasColumnName("FROM_UOMKEY");

                entity.Property(e => e.ToUomkey).HasColumnName("TO_UOMKEY");

                entity.Property(e => e.UomBaseNbr)
                    .HasColumnType("decimal(28, 14)")
                    .HasColumnName("UOM_BASE_NBR");

                entity.Property(e => e.UomDenominatorNbr)
                    .HasColumnType("decimal(28, 14)")
                    .HasColumnName("UOM_DENOMINATOR_NBR");

                entity.Property(e => e.UomNumeratorNbr)
                    .HasColumnType("decimal(28, 14)")
                    .HasColumnName("UOM_NUMERATOR_NBR");

                entity.Property(e => e.UomOffsetNbr)
                    .HasColumnType("decimal(28, 14)")
                    .HasColumnName("UOM_OFFSET_NBR");

                entity.HasOne(d => d.FromUomkeyNavigation)
                    .WithMany(p => p.SysUomeConversions)
                    .HasForeignKey(d => d.FromUomkey)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UOMC_FUK");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
