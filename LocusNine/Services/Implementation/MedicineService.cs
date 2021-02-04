using Abp.Domain.Entities;
using Castle.DynamicProxy.Generators.Emitters.SimpleAST;
using CsvHelper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ABCPharmacy.Services.Implementation
{
    /// <summary>
    /// This class is responsible to perform CRUD operations on medicine table.
    /// </summary>
    public class MedicineService : IMedicineService
    {
        /// <summary>
        /// Class name property for logging purpose.
        /// </summary>
        private const string ClassName = nameof(MedicineService);

        /// <summary>
        /// Logger for logging events.
        /// </summary>
        private readonly ILogger<MedicineService> Logger;

        /// <summary>
        /// Database Context.
        /// </summary>
        private readonly ABCPharmacyContext Context;

        /// <summary>
        /// Initializes a new instance of the <see cref="MedicineService"/> class.
        /// </summary>
        /// <param name="context">ABCPharmacyContext object.</param>
        /// <param name="logger">ILogger object.</param>
        public MedicineService(ABCPharmacyContext context, ILogger<MedicineService> logger)
        {
            this.Context = context;
            this.Logger = logger;
        }

        public async Task<Medicine> Add(Medicine medicine, bool overrideWarning)
        {
            const string methodName = nameof(this.Add);
            this.Logger.LogInformation($"{ClassName};{methodName};{medicine};{overrideWarning}");

            if (medicine.Id != 0)
            {
                throw new InvalidDataException("To add a medicine, Id should be set to zero.");
            }

            this.ValidateExpiryDate(medicine.ExpiryDate, overrideWarning);

            this.Context.Add<Medicine>(medicine); // adds the medicine to the DbSet in memory
            this.Context.SaveChanges(); // commits the changes to the database
            var response = await Task.FromResult(this.Context.Medicines.OrderByDescending(user => user.Id).First()); // returns newly created user from database.

            return response;
        }

        /// <summary>
        /// Updates an existing medicine.
        /// </summary>
        /// <param name="id">Id of user to be updated. </param>
        /// <param name="user">Object of user. </param>
        /// <returns> A single instance of the User object. </returns>
        public async Task<Medicine> Update(int id, bool overrideWarning, Medicine medicine)
        {
            const string methodName = nameof(this.Update);
            this.Logger.LogInformation($"{ClassName};{methodName};{id};{medicine};{overrideWarning}");

            this.ValidateExpiryDate(medicine.ExpiryDate, overrideWarning);

            if(id != medicine.Id)
            {
                throw new InvalidDataException("Id in url should match Id in object");
            }

            var response = await Task.FromResult(this.Context.Medicines.FirstOrDefault(medicine => medicine.Id == id));
            if (response is null)
            {
                throw new EntityNotFoundException("Specified Medicine does not exist.");
            }
            else
            {
                response.Id = medicine.Id;
                response.Name = medicine.Name;
                response.Brand = medicine.Brand;
                response.ExpiryDate = medicine.ExpiryDate;
                response.Price = medicine.Price;
                response.Quantity = medicine.Quantity;
                response.Notes = medicine.Notes;
                this.Context.SaveChanges(); // commits the changes to the database
            }

            return medicine;
        }

        /// <summary>
        /// Gets medicine by Id.
        /// </summary>
        /// <param name="id">Id of user to be fetched. </param>
        /// <returns> A single instance of the User object.</returns>
        public async Task<Medicine> GetById(int id)
        {
            const string methodName = nameof(this.GetById);
            this.Logger.LogInformation($"{ClassName};{methodName};{id}");

            var response = await Task.FromResult(this.Context.Medicines.FirstOrDefault(medicine => medicine.Id == id)).ConfigureAwait(false);
            if (response is null)
            {
                throw new EntityNotFoundException("Specified Medicine does not exist.");
            }

            return response;
        }

        public async Task<IEnumerable<Medicine>> GetAll()
        {
            const string methodName = nameof(this.GetAll);
            this.Logger.LogInformation($"{ClassName};{methodName}");

            var response = await (from medicines in Context.Medicines
                                 select medicines).ToListAsync().ConfigureAwait(false);

            return response;
        }

        private void ValidateExpiryDate(DateTime expiryDate, bool overrideWarning)
        {
            double daysDifference = (expiryDate - DateTime.Now).TotalDays;

            if (daysDifference < 30)
            {
                if (daysDifference < 15) {
                    throw new InvalidDataException("Expiry date less than 15 days is not allowed to be entered.");
                }
                else
                {
                    if (!overrideWarning)
                    {
                        throw new WarningException("Expiry date is less than 30 days. Do you want to continue?");
                    }
                }
               
            }
        }
    }
}
