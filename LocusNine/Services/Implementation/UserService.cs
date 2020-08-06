using Abp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LocusNine.Services.Implementation
{
    /// <summary>
    /// This class is responsible to perform CRUD operations on Users table.
    /// </summary>
    public class UserService : IUserService
    {
        /// <summary>
        /// Class name property for logging purpose.
        /// </summary>
        private const string ClassName = nameof(UserService);

        /// <summary>
        /// Logger for logging events.
        /// </summary>
        private readonly ILogger<UserService> Logger;

        /// <summary>
        /// Database Context.
        /// </summary>
        private readonly LocusNineContext Context;

        /// <summary>
        /// Initializes a new instance of the <see cref="UserService"/> class.
        /// </summary>
        /// <param name="context">LocusNineDbContext object.</param>
        /// <param name="logger">ILogger object.</param>
        public UserService(LocusNineContext context, ILogger<UserService> logger)
        {
            this.Context = context;
            this.Logger = logger;
        }

        public async Task<User> Add(User user)
        {
            const string methodName = nameof(this.Add);
            this.Logger.LogInformation($"{ClassName};{methodName};{user}");

            this.ValidateRoleType(user.RoleType);

            if (user.Id != 0)
            {
                throw new InvalidDataException("To add an user, Id should be set to zero.");
            }

            this.Context.Add<User>(user); // adds the user to the DbSet in memory
            this.Context.SaveChanges(); // commits the changes to the database
            var response = await Task.FromResult(this.Context.Users.OrderByDescending(user => user.Id).First()); // returns newly created user from database.

            return response;
        }

        /// <summary>
        /// Updates an existing user.
        /// </summary>
        /// <param name="id">Id of user to be updated. </param>
        /// <param name="user">Object of user. </param>
        /// <returns> A single instance of the User object. </returns>
        public async Task<User> Update(int id, User user)
        {
            const string methodName = nameof(this.Update);
            this.Logger.LogInformation($"{ClassName};{methodName};{id};{user}");

            this.ValidateRoleType(user.RoleType);

            var response = await Task.FromResult(this.Context.Users.Single(user => user.Id == id));
            if (response is null)
            {
                throw new EntityNotFoundException("Specified User does not exist.");
            }
            else
            {
                response.Email = user.Email;
                response.Name = user.Name;
                response.MobileNumber = user.MobileNumber;
                response.RoleType = user.RoleType;

                this.Context.SaveChanges(); // commits the changes to the database
            }

            return response;
        }

        /// <summary>
        /// Deletes an existing user.
        /// </summary>
        /// <param name="id">Id of user to be deleted. </param>
        /// <returns> No Content.</returns>
        public async Task Delete(int id)
        {
            const string methodName = nameof(this.Delete);
            this.Logger.LogInformation($"{ClassName};{methodName}");

            var response = await Task.FromResult(this.Context.Users.Single(user => user.Id == id));
            if (response is null)
            {
                throw new EntityNotFoundException("Specified User does not exist.");
            }
            else
            {
                this.Context.Users.Remove(response);
                this.Context.SaveChanges(); // commits the changes to the database
            }
        }

        /// <summary>
        /// Gets user by Id.
        /// </summary>
        /// <param name="id">Id of user to be fetched. </param>
        /// <returns> A single instance of the User object.</returns>
        public async Task<User> GetById(int id)
        {
            const string methodName = nameof(this.GetById);
            this.Logger.LogInformation($"{ClassName};{methodName};{id}");

            var response = await Task.FromResult(this.Context.Users.Single(user => user.Id == id)).ConfigureAwait(false);
            if (response is null)
            {
                throw new EntityNotFoundException("Specified User does not exist.");
            }

            return response;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            const string methodName = nameof(this.GetAll);
            this.Logger.LogInformation($"{ClassName};{methodName}");

            var response = await (from users in Context.Users
                                 select users).ToListAsync().ConfigureAwait(false);

            return response;
        }

        private void ValidateRoleType(string roleType)
        {
            if (roleType == "A" || roleType == "E")
            {
                return;
            }
            else
            {
                throw new InvalidDataException("The Role Type can either be 'A'(Admin) or 'E'(Customer Executive).");
            }
        }
    }
}
