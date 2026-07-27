import { seedUsers } from "./seeds/user-seed";

async function main() {
  await seedUsers();
}

main()
  .then(() => {
    console.log("🌱 Seed executada com sucesso.");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
