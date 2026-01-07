import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$connect()
    console.log('✅ Successfully connected to database!')

    // Test database connection
    const userCount = await prisma.user.count()
    const teacherCount = await prisma.teacher.count()
    const studentCount = await prisma.student.count()
    const classCount = await prisma.class.count()

    console.log('\n📊 Database Statistics:')
    console.log(`- Users: ${userCount}`)
    console.log(`- Teachers: ${teacherCount}`)
    console.log(`- Students: ${studentCount}`)
    console.log(`- Classes: ${classCount}`)

    console.log('\n🎉 Database connection test passed!')
  } catch (error) {
    console.error('❌ Failed to connect to database:', error)
    console.error('\n🔧 Troubleshooting Tips:')
    console.error('1. Check if MySQL server is running:')
    console.error('   sudo systemctl status mysql')
    console.error('\n2. Check DATABASE_URL in .env file:')
    console.error('   cat .env')
    console.error('\n3. Check if database exists:')
    console.error('   mysql -u root -p -e "SHOW DATABASES;"')
    console.error('\n4. Check MySQL credentials:')
    console.error('   mysql -u root -p -e "SELECT user();"')
  } finally {
    await prisma.$disconnect()
  }
}

main()
