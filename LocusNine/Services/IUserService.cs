// <copyright file="IUserService.cs" company="LocusNine">
// Copyright (c) LocusNine. All rights reserved.
// </copyright>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LocusNine.Services
{
    public interface IUserService
    {
        /// <summary>
        /// Creates a new user.
        /// </summary>
        /// <param name="user">Object of User to be created. </param>
        /// <returns> A single instance of the User object. </returns>
        Task<User> Add(User user);

        /// <summary>
        /// Updates an existing user.
        /// </summary>
        /// <param name="id">Id of user to be updated. </param>
        /// <param name="user">Object of user. </param>
        /// <returns> A single instance of the User object. </returns>
        Task<User> Update(int id, User user);

        /// <summary>
        /// Deletes an existing user.
        /// </summary>
        /// <param name="id">Id of user to be deleted. </param>
        /// <returns> No Content.</returns>
        Task Delete(int id);

        /// <summary>
        /// Gets all users.
        /// </summary>
        /// <returns> A list of User objects. </returns>
        Task<IEnumerable<User>> GetAll();

        /// <summary>
        /// Gets user by Id.
        /// </summary>
        /// <param name="id">Id of note to be fetched. </param>
        /// <returns> A single instance of the User object.</returns>
        Task<User> GetById(int id);
    }
}
