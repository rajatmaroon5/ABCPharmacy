// <copyright file="IUserService.cs" company="LocusNine">
// Copyright (c) LocusNine. All rights reserved.
// </copyright>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ABCPharmacy.Services
{
    public interface IMedicineService
    {
        /// <summary>
        /// Creates a new medicine.
        /// </summary>
        /// <param name="user">Object of medicine to be created. </param>
        /// <returns> A single instance of the medicine object. </returns>
        Task<Medicine> Add(Medicine user, bool overrideWarning);

        /// <summary>
        /// Updates an existing medicine.
        /// </summary>
        /// <param name="id">Id of medicine to be updated. </param>
        /// <param name="user">Object of medicine. </param>
        /// <returns> A single instance of the medicine object. </returns>
        Task<Medicine> Update(int id, bool overrideWarning, Medicine user);

        /// <summary>
        /// Gets all medicines.
        /// </summary>
        /// <returns> A list of medicine objects. </returns>
        Task<IEnumerable<Medicine>> GetAll();

        /// <summary>
        /// Gets medicine by Id.
        /// </summary>
        /// <param name="id">Id of medicine to be fetched. </param>
        /// <returns> A single instance of the medicine object.</returns>
        Task<Medicine> GetById(int id);
    }
}
