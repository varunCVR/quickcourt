const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Setting up database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@quickcourt.com' },
    update: {},
    create: {
      email: 'admin@quickcourt.com',
      password: adminPassword,
      fullName: 'System Admin',
      role: 'ADMIN',
      isVerified: true
    }
  })

  console.log('Admin user created:', admin.email)

  // Create sample facility owner
  const ownerPassword = await bcrypt.hash('owner123', 12)
  
  const owner = await prisma.user.upsert({
    where: { email: 'owner@quickcourt.com' },
    update: {},
    create: {
      email: 'owner@quickcourt.com',
      password: ownerPassword,
      fullName: 'Facility Owner',
      role: 'FACILITY_OWNER',
      isVerified: true
    }
  })

  console.log('Facility owner created:', owner.email)

  // Create sample user
  const userPassword = await bcrypt.hash('user123', 12)
  
  const user = await prisma.user.upsert({
    where: { email: 'user@quickcourt.com' },
    update: {},
    create: {
      email: 'user@quickcourt.com',
      password: userPassword,
      fullName: 'John Doe',
      role: 'USER',
      isVerified: true
    }
  })

  console.log('Sample user created:', user.email)

  // Create sample facilities
  const facility1 = await prisma.facility.upsert({
    where: { id: 'facility-1' },
    update: {},
    create: {
      id: 'facility-1',
      name: 'Sports Complex Central',
      description: 'Premium sports facility with multiple courts and modern amenities',
      address: '123 Sports Street, City Center, Mumbai',
      location: 'Mumbai Central',
      ownerId: owner.id,
      status: 'APPROVED',
      photos: ['/images/facility1.jpg', '/images/facility2.jpg'],
      amenities: ['Parking', 'Changing Rooms', 'Cafeteria', 'Equipment Rental', 'AC']
    }
  })

  const facility2 = await prisma.facility.upsert({
    where: { id: 'facility-2' },
    update: {},
    create: {
      id: 'facility-2',
      name: 'Elite Sports Arena',
      description: 'State-of-the-art sports facility for professional training',
      address: '456 Arena Road, Bandra West, Mumbai',
      location: 'Bandra West',
      ownerId: owner.id,
      status: 'APPROVED',
      photos: ['/images/arena1.jpg', '/images/arena2.jpg'],
      amenities: ['Parking', 'Changing Rooms', 'Pro Shop', 'Coaching Available']
    }
  })

  console.log('Sample facilities created')

  // Create sample courts
  const courts = await Promise.all([
    prisma.court.upsert({
      where: { id: 'court-badminton-1' },
      update: {},
      create: {
        id: 'court-badminton-1',
        name: 'Badminton Court 1',
        facilityId: facility1.id,
        sportType: 'BADMINTON',
        pricePerHour: 500,
        operatingHours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '06:00', close: '23:00' },
          sunday: { open: '06:00', close: '23:00' }
        }
      }
    }),
    prisma.court.upsert({
      where: { id: 'court-tennis-1' },
      update: {},
      create: {
        id: 'court-tennis-1',
        name: 'Tennis Court 1',
        facilityId: facility1.id,
        sportType: 'TENNIS',
        pricePerHour: 800,
        operatingHours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '06:00', close: '23:00' },
          sunday: { open: '06:00', close: '23:00' }
        }
      }
    }),
    prisma.court.upsert({
      where: { id: 'court-football-1' },
      update: {},
      create: {
        id: 'court-football-1',
        name: 'Football Turf 1',
        facilityId: facility2.id,
        sportType: 'FOOTBALL',
        pricePerHour: 1200,
        operatingHours: {
          monday: { open: '06:00', close: '22:00' },
          tuesday: { open: '06:00', close: '22:00' },
          wednesday: { open: '06:00', close: '22:00' },
          thursday: { open: '06:00', close: '22:00' },
          friday: { open: '06:00', close: '22:00' },
          saturday: { open: '06:00', close: '23:00' },
          sunday: { open: '06:00', close: '23:00' }
        }
      }
    })
  ])

  console.log('Sample courts created:', courts.length)

  // Create sample time slots for today and tomorrow
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const timeSlots = []
  const hours = ['06:00', '07:00', '08:00', '09:00', '10:00', '18:00', '19:00', '20:00', '21:00']
  
  for (const court of courts) {
    for (const date of [today, tomorrow]) {
      for (let i = 0; i < hours.length - 1; i++) {
        timeSlots.push({
          courtId: court.id,
          date: date,
          startTime: hours[i],
          endTime: hours[i + 1],
          isAvailable: true
        })
      }
    }
  }

  await prisma.timeSlot.createMany({
    data: timeSlots,
    skipDuplicates: true
  })

  console.log('Sample time slots created')

  // Create sample reviews
  await prisma.review.createMany({
    data: [
      {
        userId: user.id,
        facilityId: facility1.id,
        rating: 5,
        comment: 'Excellent facility with great courts and amenities!'
      },
      {
        userId: user.id,
        facilityId: facility2.id,
        rating: 4,
        comment: 'Good courts, professional setup. Slightly expensive but worth it.'
      }
    ],
    skipDuplicates: true
  })

  console.log('Sample reviews created')

  console.log('Database setup completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })