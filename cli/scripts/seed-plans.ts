import 'dotenv/config'

import { seedPlans } from '../../src/server/seed-plans'

async function main() {
  try {
    await seedPlans()
    console.log('Plans seeded successfully')
  } catch (error) {
    console.error('Failed to seed plans', error)
    process.exitCode = 1
  }
}

void main()
