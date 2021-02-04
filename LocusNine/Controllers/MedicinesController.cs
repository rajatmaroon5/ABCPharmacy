// <copyright file="MedicinesController.cs" company="ABC Pharmacy">
// Copyright (c) ABC Pharmacy. All rights reserved.
// </copyright>

using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using ABCPharmacy;
using ABCPharmacy.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Medicines.Controllers
{
    [Route("api/medicines")]
    [ApiVersion("1.0")]
    [ApiController]
    public class MedicinesController : ControllerBase
    {
        /// <summary>
        /// Class name property for logging purpose.
        /// </summary>
        private const string ClassName = nameof(MedicinesController);

        /// <summary>
        /// Business logic service instance.
        /// </summary>
        private readonly IMedicineService service;

        /// <summary>
        /// Logger for logging events.
        /// </summary>
        private readonly ILogger<MedicinesController> logger;

        public ABCPharmacyContext DbContext { get; }

        /// <summary>
        /// Initializes a new instance of the <see cref="MedicinesController"/> class with necessary dependencies.
        /// </summary>
        /// <param name="service">Business logic service object.</param>
        /// <param name="logger">Logger object.</param>
        public MedicinesController(IMedicineService service, ILogger<MedicinesController> logger)
        {
            this.service = service;
            this.logger = logger;
        }

        /// <summary>
        /// Creates a new medicine.
        /// </summary>
        /// <param name="user">Object of medicine to be created. </param>
        /// <returns> A single instance of the medicine object. </returns>
        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.Created, Type = typeof(Medicine))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.PreconditionFailed)]
        public async Task<ActionResult<Medicine>> Post(bool overrideWarning, [FromBody]Medicine medicine)
        {
            const string methodName = nameof(this.Post);
            this.logger.LogInformation($"{ClassName};{methodName};{medicine}");
            return this.Ok(await this.service.Add(medicine, overrideWarning).ConfigureAwait(false));
        }

        /// <summary>
        /// Updates an existing medicine.
        /// </summary>
        /// <param name="id">Id of medicine to be updated. </param>
        /// <param name="user">Object of medicine. </param>
        /// <returns> A single instance of the medicine object. </returns>
        [HttpPut("{id}")]
        [Produces(typeof(Medicine))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.PreconditionFailed)]
        public async Task<ActionResult<Medicine>> Put(int id, bool overrideWarning, [FromBody] Medicine user)
        {
            const string methodName = nameof(this.Put);
            this.logger.LogInformation($"{ClassName};{methodName};{id};{user}");
            return this.Ok(await this.service.Update(id, overrideWarning, user).ConfigureAwait(false));
        }

        /// <summary>
        /// Gets all medicines.
        /// </summary>
        /// <returns> A list of Medicine objects. </returns>
        [HttpGet]
        [Produces(typeof(IEnumerable<Medicine>))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.PreconditionFailed)]
        public async Task<ActionResult<IEnumerable<Medicine>>> GetAll()
        {
            const string methodName = nameof(this.GetAll);
            this.logger.LogInformation($"{ClassName};{methodName}");
            return this.Ok(await this.service.GetAll().ConfigureAwait(false));
        }

        /// <summary>
        /// Gets medicine by Id.
        /// </summary>
        /// <param name="id">Id of medicine to be fetched. </param>
        /// <returns> A single instance of the medicine object.</returns>
        [HttpGet("{id}", Name = "GetUsers")]
        [Produces(typeof(Medicine))]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.PreconditionFailed)]
        public async Task<ActionResult<Medicine>> GetById(int id)
        {
            const string methodName = nameof(this.GetById);
            this.logger.LogInformation($"{ClassName};{methodName};{id}");
            return this.Ok(await this.service.GetById(id).ConfigureAwait(false));
        }
    }
}
