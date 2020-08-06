// <copyright file="User.cs" company="LocusNine">
// Copyright (c) LocusNine. All rights reserved.
// </copyright>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LocusNine
{
    /// <summary>
    /// Represents Users table.
    /// </summary>
    [Display(Name = "'Users'")]
    [Table("Users")]
    public class User
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="User"/> class.
        /// </summary>
        public User()
        {
        }

        /// <summary>
        /// Gets or sets the sequence of users.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the name of user.
        /// </summary>
        [Required]
        [MaxLength(128, ErrorMessage = "The field 'Name' must be a string with a minimum length of 1 and a maximum length of 128.")]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the email of user.
        /// </summary>
        [Display(Name = "Email address")]
        [MaxLength(254, ErrorMessage = "The field 'Name' must be a string with a minimum length of 1 and a maximum length of 128.")]
        [Required(ErrorMessage = "The field 'Email Address' is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the role type of user.
        /// </summary>
        [Display(Name = "Role Type")]
        [Required(ErrorMessage = "The field 'Role Type' is required")]
        [MaxLength(1, ErrorMessage = "The field 'Role Type' must be a string with a maximum length of 1.")]
        public string RoleType { get; set; }

        /// <summary>
        /// Gets or sets the mobile number of user.
        /// </summary>
        [Display(Name = "Mobile Number")]
        [RegularExpression(@"^$|^([0-9]{10})$", ErrorMessage = "Invalid Mobile Number.")]
        public string MobileNumber { get; set; }
    }
}