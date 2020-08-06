// <copyright file="UsersController.cs" company="LocusNine">
// Copyright (c) LocusNine. All rights reserved.
// </copyright>

using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using LocusNine.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LocusNine.Controllers
{
    [Route("api/users")]
    [ApiVersion("1.0")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        /// <summary>
        /// Class name property for logging purpose.
        /// </summary>
        private const string ClassName = nameof(UsersController);

        /// <summary>
        /// Business logic service instance.
        /// </summary>
        private readonly IUserService service;

        /// <summary>
        /// Logger for logging events.
        /// </summary>
        private readonly ILogger<UsersController> logger;

        public LocusNineContext DbContext { get; }

        /// <summary>
        /// Initializes a new instance of the <see cref="UsersController"/> class with necessary dependencies.
        /// </summary>
        /// <param name="service">Business logic service object.</param>
        /// <param name="logger">Logger object.</param>
        public UsersController(IUserService service, ILogger<UsersController> logger)
        {
            this.service = service;
            this.logger = logger;
        }

        /// <summary>
        /// Creates a new user.
        /// </summary>
        /// <param name="user">Object of User to be created. </param>
        /// <returns> A single instance of the User object. </returns>
        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.Created, Type = typeof(User))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.PreconditionFailed)]
        public async Task<ActionResult<User>> Post([FromBody]User user)
        {
            const string methodName = nameof(this.Post);
            this.logger.LogInformation($"{ClassName};{methodName};{user}");
            return this.Ok(await this.service.Add(user).ConfigureAwait(false));
        }

        /// <summary>
        /// Updates an existing user.
        /// </summary>
        /// <param name="id">Id of user to be updated. </param>
        /// <param name="user">Object of user. </param>
        /// <returns> A single instance of the User object. </returns>
        [HttpPut("{id}")]
        [Produces(typeof(User))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.PreconditionFailed)]
        public async Task<ActionResult<User>> Put(int id, [FromBody] User user)
        {
            const string methodName = nameof(this.Put);
            this.logger.LogInformation($"{ClassName};{methodName};{id};{user}");
            return this.Ok(await this.service.Update(id, user).ConfigureAwait(false));
        }

        /// <summary>
        /// Deletes an existing user.
        /// </summary>
        /// <param name="id">Id of user to be deleted. </param>
        /// <returns> No Content.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        [ProducesResponseType((int)HttpStatusCode.PreconditionFailed)]
        public async Task<ActionResult> Delete(int id)
        {
            const string methodName = nameof(this.Delete);
            this.logger.LogInformation($"{ClassName};{methodName}{id}");
            await this.service.Delete(id).ConfigureAwait(false);
            return this.NoContent();
        }


        /// <summary>
        /// Gets all users.
        /// </summary>
        /// <returns> A list of User objects. </returns>
        [HttpGet]
        [Produces(typeof(IEnumerable<User>))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.PreconditionFailed)]
        public async Task<ActionResult<IEnumerable<User>>> GetAll()
        {
            const string methodName = nameof(this.GetAll);
            this.logger.LogInformation($"{ClassName};{methodName}");
            return this.Ok(await this.service.GetAll().ConfigureAwait(false));
        }

        /// <summary>
        /// Gets user by Id.
        /// </summary>
        /// <param name="id">Id of note to be fetched. </param>
        /// <returns> A single instance of the User object.</returns>
        [HttpGet("{id}", Name = "GetUsers")]
        [Produces(typeof(User))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.PreconditionFailed)]
        public async Task<ActionResult<User>> GetById(int id)
        {
            const string methodName = nameof(this.GetById);
            this.logger.LogInformation($"{ClassName};{methodName};{id}");
            return this.Ok(await this.service.GetById(id).ConfigureAwait(false));
        }
    }
}
