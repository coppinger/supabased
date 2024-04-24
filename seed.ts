/**
 * ! Executing this script will delete all data in your database and seed it with 10 versions.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed"
import { copycat } from '@snaplet/copycat'

const main = async () => {
  const seed = await createSeedClient({
    dryRun: true
  })

  // Truncate all tables in the database
  // await seed.$resetDatabase();

  // Seed the database with 10 users
  await seed.profiles(x => x(5))
  await seed.roles(x => x(5))
  await seed.profiles_roles(x => x(5))
  // await seed.supabase_products_projects(x => x(5))
  console.log("Database seeded successfully!")

  process.exit()
}

main()