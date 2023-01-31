/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const admin = [
    {
      name: "admin",// will get id 1
      username: "admin",
      password: "serafina0607",
      email: "porpan00@hotmail.com"
    },
  ];

  return knex("admins")
  .insert(admin)
  .then(() => console.log("\n== Seed data for admins table added. ==\n"));
};
