// <copyright file="User.cs" company="LocusNine">
// Copyright (c) LocusNine. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ABCPharmacy
{
    /// <summary>
    /// Represents Medicines table.
    /// </summary>
    [Display(Name = "'Medicine'")]
    [Table("Medicines")]
    public class Medicine
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Medicine"/> class.
        /// </summary>
        public Medicine()
        {
        }

        /// <summary>
        /// Gets or sets the Id of medicine.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the name of medicine.
        /// </summary>
        [Required]
        [MaxLength(128, ErrorMessage = "The field 'Name' must be a string with a minimum length of 1 and a maximum length of 128.")]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the brand of medicine.
        /// </summary>
        [MaxLength(50, ErrorMessage = "The field 'Brand' must be a string with a minimum length of 1 and a maximum length of 50.")]
        [Required]
        public string Brand { get; set; }

        /// <summary>
        /// Gets or sets the expiry date of medicine.
        /// </summary>
        [Display(Name = "Expiry Date")]
        [Required]   
        public DateTime ExpiryDate { get; set; }

        /// <summary>
        /// Gets or sets the quantity of medicine.
        /// </summary>
        [Required]
        public int Quantity { get; set; }

        /// <summary>
        /// Gets or sets the quantity of medicine.
        /// </summary>
        [Required]
        [RegularExpression(@"\d+(\.\d{1,2})?", ErrorMessage = "Please enter price upto 2 decimal places only.")]
        public decimal Price { get; set; }

        /// <summary>
        /// Gets or sets the notes of medicine.
        /// </summary>
        [MaxLength(500, ErrorMessage = "The field 'Notes' must be a string with a minimum length of 1 and a maximum length of 128.")]
        public string Notes { get; set; }
    }
}