const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🏟️ Setting up enhanced sample data for QuickCourt...')

  // Create diverse users
  const users = [
    {
      email: 'admin@quickcourt.com',
      password: await bcrypt.hash('admin123', 12),
      fullName: 'Sarah Johnson',
      role: 'ADMIN',
      avatar: '/avatars/admin.jpg'
    },
    {
      email: 'owner1@quickcourt.com',
      password: await bcrypt.hash('owner123', 12),
      fullName: 'Michael Chen',
      role: 'FACILITY_OWNER',
      avatar: '/avatars/owner1.jpg'
    },
    {
      email: 'owner2@quickcourt.com',
      password: await bcrypt.hash('owner123', 12),
      fullName: 'Priya Sharma',
      role: 'FACILITY_OWNER',
      avatar: '/avatars/owner2.jpg'
    },
    {
      email: 'alex.tennis@gmail.com',
      password: await bcrypt.hash('user123', 12),
      fullName: 'Alex Rodriguez',
      role: 'USER',
      avatar: '/avatars/alex.jpg'
    },
    {
      email: 'emma.sports@gmail.com',
      password: await bcrypt.hash('user123', 12),
      fullName: 'Emma Thompson',
      role: 'USER',
      avatar: '/avatars/emma.jpg'
    },
    {
      email: 'raj.cricket@gmail.com',
      password: await bcrypt.hash('user123', 12),
      fullName: 'Raj Patel',
      role: 'USER',
      avatar: '/avatars/raj.jpg'
    },
    {
      email: 'lisa.badminton@gmail.com',
      password: await bcrypt.hash('user123', 12),
      fullName: 'Lisa Wang',
      role: 'USER',
      avatar: '/avatars/lisa.jpg'
    }
  ]

  const createdUsers = {}
  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        isVerified: true
      }
    })
    createdUsers[userData.email] = user
    console.log(`✅ User created: ${user.fullName} (${user.email})`)
  }

  // Create premium facilities with detailed information
  const facilities = [
    {
      id: 'premium-sports-hub',
      name: 'Premium Sports Hub',
      description: 'Mumbai\'s premier sports destination featuring world-class courts and professional training facilities. Perfect for tournaments and casual games alike.',
      address: '123 Marine Drive, Nariman Point, Mumbai 400021',
      location: 'Nariman Point',
      ownerId: createdUsers['owner1@quickcourt.com'].id,
      status: 'APPROVED',
      image: '/facilities/premium-hub-main.jpg',
      photos: [
        '/facilities/premium-hub-1.jpg',
        '/facilities/premium-hub-2.jpg',
        '/facilities/premium-hub-3.jpg',
        '/facilities/premium-hub-4.jpg'
      ],
      amenities: [
        'Valet Parking',
        'Premium Changing Rooms',
        'Sports Cafe',
        'Equipment Rental',
        'Air Conditioning',
        'Professional Coaching',
        'Tournament Hosting',
        'Live Streaming Setup'
      ]
    },
    {
      id: 'green-valley-sports',
      name: 'Green Valley Sports Complex',
      description: 'Eco-friendly sports facility nestled in lush greenery. Offers a perfect blend of nature and sport with sustainable practices.',
      address: '456 Powai Lake Road, Powai, Mumbai 400076',
      location: 'Powai',
      ownerId: createdUsers['owner2@quickcourt.com'].id,
      status: 'APPROVED',
      image: '/facilities/green-valley-main.jpg',
      photos: [
        '/facilities/green-valley-1.jpg',
        '/facilities/green-valley-2.jpg',
        '/facilities/green-valley-3.jpg'
      ],
      amenities: [
        'Free Parking',
        'Eco-friendly Facilities',
        'Garden Seating',
        'Healthy Snack Bar',
        'Equipment Rental',
        'Group Training',
        'Kids Play Area'
      ]
    },
    {
      id: 'urban-sports-arena',
      name: 'Urban Sports Arena',
      description: 'Modern indoor sports facility in the heart of Bandra. Features cutting-edge technology and premium amenities for the urban athlete.',
      address: '789 Linking Road, Bandra West, Mumbai 400050',
      location: 'Bandra West',
      ownerId: createdUsers['owner1@quickcourt.com'].id,
      status: 'APPROVED',
      image: '/facilities/urban-arena-main.jpg',
      photos: [
        '/facilities/urban-arena-1.jpg',
        '/facilities/urban-arena-2.jpg',
        '/facilities/urban-arena-3.jpg',
        '/facilities/urban-arena-4.jpg'
      ],
      amenities: [
        'Underground Parking',
        'Luxury Lounge',
        'Pro Shop',
        'Physiotherapy Center',
        'Smart Court Technology',
        'Live Score Display',
        'Premium Equipment',
        'Personal Training'
      ]
    },
    {
      id: 'community-sports-center',
      name: 'Community Sports Center',
      description: 'Affordable community sports facility promoting fitness and wellness for all ages. Family-friendly environment with flexible pricing.',
      address: '321 SV Road, Andheri West, Mumbai 400058',
      location: 'Andheri West',
      ownerId: createdUsers['owner2@quickcourt.com'].id,
      status: 'APPROVED',
      image: '/facilities/community-center-main.jpg',
      photos: [
        '/facilities/community-center-1.jpg',
        '/facilities/community-center-2.jpg'
      ],
      amenities: [
        'Free Parking',
        'Family Changing Rooms',
        'Canteen',
        'Basic Equipment',
        'Group Discounts',
        'Senior Citizen Rates',
        'Student Packages'
      ]
    }
  ]

  const createdFacilities = {}
  for (const facilityData of facilities) {
    const facility = await prisma.facility.upsert({
      where: { id: facilityData.id },
      update: {},
      create: facilityData
    })
    createdFacilities[facilityData.id] = facility
    console.log(`🏢 Facility created: ${facility.name}`)
  }

  // Create diverse courts with realistic pricing
  const courts = [
    // Premium Sports Hub Courts
    {
      id: 'premium-badminton-1',
      name: 'Championship Badminton Court 1',
      facilityId: 'premium-sports-hub',
      sportType: 'BADMINTON',
      pricePerHour: 800
    },
    {
      id: 'premium-badminton-2',
      name: 'Championship Badminton Court 2',
      facilityId: 'premium-sports-hub',
      sportType: 'BADMINTON',
      pricePerHour: 800
    },
    {
      id: 'premium-tennis-1',
      name: 'Professional Tennis Court',
      facilityId: 'premium-sports-hub',
      sportType: 'TENNIS',
      pricePerHour: 1200
    },
    {
      id: 'premium-squash-1',
      name: 'Glass Squash Court',
      facilityId: 'premium-sports-hub',
      sportType: 'SQUASH',
      pricePerHour: 600
    },
    
    // Green Valley Courts
    {
      id: 'green-badminton-1',
      name: 'Eco Badminton Court 1',
      facilityId: 'green-valley-sports',
      sportType: 'BADMINTON',
      pricePerHour: 500
    },
    {
      id: 'green-tennis-1',
      name: 'Garden Tennis Court',
      facilityId: 'green-valley-sports',
      sportType: 'TENNIS',
      pricePerHour: 900
    },
    {
      id: 'green-football-1',
      name: 'Natural Turf Football Field',
      facilityId: 'green-valley-sports',
      sportType: 'FOOTBALL',
      pricePerHour: 1500
    },
    
    // Urban Sports Arena Courts
    {
      id: 'urban-basketball-1',
      name: 'Pro Basketball Court',
      facilityId: 'urban-sports-arena',
      sportType: 'BASKETBALL',
      pricePerHour: 1000
    },
    {
      id: 'urban-table-tennis-1',
      name: 'Tournament Table Tennis',
      facilityId: 'urban-sports-arena',
      sportType: 'TABLE_TENNIS',
      pricePerHour: 300
    },
    {
      id: 'urban-volleyball-1',
      name: 'Indoor Volleyball Court',
      facilityId: 'urban-sports-arena',
      sportType: 'VOLLEYBALL',
      pricePerHour: 800
    },
    
    // Community Sports Center Courts
    {
      id: 'community-badminton-1',
      name: 'Community Badminton Court 1',
      facilityId: 'community-sports-center',
      sportType: 'BADMINTON',
      pricePerHour: 300
    },
    {
      id: 'community-badminton-2',
      name: 'Community Badminton Court 2',
      facilityId: 'community-sports-center',
      sportType: 'BADMINTON',
      pricePerHour: 300
    },
    {
      id: 'community-cricket-1',
      name: 'Practice Cricket Net',
      facilityId: 'community-sports-center',
      sportType: 'CRICKET',
      pricePerHour: 400
    }
  ]

  const operatingHours = {
    monday: { open: '06:00', close: '22:00' },
    tuesday: { open: '06:00', close: '22:00' },
    wednesday: { open: '06:00', close: '22:00' },
    thursday: { open: '06:00', close: '22:00' },
    friday: { open: '06:00', close: '22:00' },
    saturday: { open: '06:00', close: '23:00' },
    sunday: { open: '07:00', close: '23:00' }
  }

  const createdCourts = []
  for (const courtData of courts) {
    const court = await prisma.court.upsert({
      where: { id: courtData.id },
      update: {},
      create: {
        ...courtData,
        operatingHours,
        isActive: true
      }
    })
    createdCourts.push(court)
    console.log(`🏟️ Court created: ${court.name}`)
  }

  // Generate time slots for the next 7 days
  const timeSlots = []
  const timeSlotHours = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ]

  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const date = new Date()
    date.setDate(date.getDate() + dayOffset)
    
    for (const court of createdCourts) {
      for (let i = 0; i < timeSlotHours.length - 1; i++) {
        timeSlots.push({
          courtId: court.id,
          date: date,
          startTime: timeSlotHours[i],
          endTime: timeSlotHours[i + 1],
          isAvailable: Math.random() > 0.3 // 70% availability
        })
      }
    }
  }

  await prisma.timeSlot.createMany({
    data: timeSlots,
    skipDuplicates: true
  })
  console.log(`⏰ Created ${timeSlots.length} time slots`)

  // Create sample bookings
  const sampleBookings = [
    {
      userId: createdUsers['alex.tennis@gmail.com'].id,
      facilityId: 'premium-sports-hub',
      courtId: 'premium-tennis-1',
      bookingDate: new Date(),
      startTime: '18:00',
      endTime: '19:00',
      totalPrice: 1200,
      status: 'CONFIRMED',
      paymentStatus: 'PAID'
    },
    {
      userId: createdUsers['lisa.badminton@gmail.com'].id,
      facilityId: 'green-valley-sports',
      courtId: 'green-badminton-1',
      bookingDate: new Date(Date.now() + 86400000), // Tomorrow
      startTime: '19:00',
      endTime: '20:00',
      totalPrice: 500,
      status: 'CONFIRMED',
      paymentStatus: 'PAID'
    }
  ]

  for (const bookingData of sampleBookings) {
    // Find available time slot
    const timeSlot = await prisma.timeSlot.findFirst({
      where: {
        courtId: bookingData.courtId,
        date: bookingData.bookingDate,
        startTime: bookingData.startTime,
        isAvailable: true
      }
    })

    if (timeSlot) {
      await prisma.booking.create({
        data: {
          ...bookingData,
          timeSlotId: timeSlot.id
        }
      })
      
      // Mark time slot as unavailable
      await prisma.timeSlot.update({
        where: { id: timeSlot.id },
        data: { isAvailable: false }
      })
    }
  }
  console.log('📅 Sample bookings created')

  // Create engaging reviews
  const reviews = [
    {
      userId: createdUsers['alex.tennis@gmail.com'].id,
      facilityId: 'premium-sports-hub',
      rating: 5,
      comment: 'Absolutely fantastic facility! The courts are pristine and the staff is incredibly professional. Worth every penny!'
    },
    {
      userId: createdUsers['emma.sports@gmail.com'].id,
      facilityId: 'premium-sports-hub',
      rating: 5,
      comment: 'Best sports facility in Mumbai! The coaching staff is top-notch and the amenities are world-class.'
    },
    {
      userId: createdUsers['lisa.badminton@gmail.com'].id,
      facilityId: 'green-valley-sports',
      rating: 4,
      comment: 'Love the eco-friendly approach and the natural setting. Great for a peaceful game surrounded by greenery.'
    },
    {
      userId: createdUsers['raj.cricket@gmail.com'].id,
      facilityId: 'green-valley-sports',
      rating: 4,
      comment: 'Good value for money. The facilities are clean and well-maintained. Perfect for regular practice sessions.'
    },
    {
      userId: createdUsers['emma.sports@gmail.com'].id,
      facilityId: 'urban-sports-arena',
      rating: 5,
      comment: 'The smart court technology is amazing! Real-time stats and professional setup make every game exciting.'
    },
    {
      userId: createdUsers['alex.tennis@gmail.com'].id,
      facilityId: 'community-sports-center',
      rating: 4,
      comment: 'Great community facility with affordable rates. Perfect for beginners and casual players.'
    },
    {
      userId: createdUsers['raj.cricket@gmail.com'].id,
      facilityId: 'urban-sports-arena',
      rating: 5,
      comment: 'Premium experience with excellent facilities. The physiotherapy center is a great addition!'
    }
  ]

  await prisma.review.createMany({
    data: reviews,
    skipDuplicates: true
  })
  console.log(`⭐ Created ${reviews.length} reviews`)

  console.log('\n🎉 Enhanced sample data setup completed!')
  console.log('\n📊 Summary:')
  console.log(`👥 Users: ${users.length}`)
  console.log(`🏢 Facilities: ${facilities.length}`)
  console.log(`🏟️ Courts: ${courts.length}`)
  console.log(`⏰ Time Slots: ${timeSlots.length}`)
  console.log(`⭐ Reviews: ${reviews.length}`)
  console.log('\n🔐 Login Credentials:')
  console.log('Admin: admin@quickcourt.com / admin123')
  console.log('Owner: owner1@quickcourt.com / owner123')
  console.log('User: alex.tennis@gmail.com / user123')
  console.log('\n🚀 Your QuickCourt app is ready with pleasant sample data!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })