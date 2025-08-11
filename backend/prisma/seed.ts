import { PrismaClient, Role, BookingStatus, PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // --- USERS ---
  await prisma.user.createMany({
    data: [
      { email: 'admin@quickcourt.com', password: 'hashedpassword', fullName: 'Admin User', role: Role.ADMIN },
      { email: 'owner1@quickcourt.com', password: 'hashedpassword', fullName: 'John Owner', role: Role.OWNER },
      { email: 'owner2@quickcourt.com', password: 'hashedpassword', fullName: 'Priya Facility', role: Role.OWNER },
      { email: 'player1@quickcourt.com', password: 'hashedpassword', fullName: 'Amit Player', role: Role.USER },
      { email: 'player2@quickcourt.com', password: 'hashedpassword', fullName: 'Sara Singh', role: Role.USER },
    ]
  });

  const owner1 = await prisma.user.findUnique({ where: { email: 'owner1@quickcourt.com' } });
  const owner2 = await prisma.user.findUnique({ where: { email: 'owner2@quickcourt.com' } });
  const player1 = await prisma.user.findUnique({ where: { email: 'player1@quickcourt.com' } });
  const player2 = await prisma.user.findUnique({ where: { email: 'player2@quickcourt.com' } });

  // --- FACILITIES ---
  const facility1 = await prisma.facility.create({
    data: {
      ownerId: owner1!.id,
      name: 'Greenfield Sports Arena',
      description: 'Premium indoor and outdoor courts in the heart of Bangalore.',
      city: 'Bangalore',
      country: 'India',
      latitude: 12.9716,
      longitude: 77.5946,
      sports: { football: true, badminton: true },
      amenities: { parking: true, refreshments: true },
      photos: [
        "https://source.unsplash.com/800x600/?badminton,court",
        "https://source.unsplash.com/800x600/?football,turf"
      ],
      approved: true
    }
  });

  const facility2 = await prisma.facility.create({
    data: {
      ownerId: owner1!.id,
      name: 'Sunshine Sports Complex',
      description: 'Outdoor cricket and football turf with night lights.',
      city: 'Mumbai',
      country: 'India',
      latitude: 19.0760,
      longitude: 72.8777,
      sports: { cricket: true, football: true },
      amenities: { changingRooms: true, lights: true },
      photos: [
        "https://source.unsplash.com/800x600/?cricket,ground",
        "https://source.unsplash.com/800x600/?football,stadium"
      ],
      approved: true
    }
  });

  const facility3 = await prisma.facility.create({
    data: {
      ownerId: owner2!.id,
      name: 'Ace Tennis & Badminton Club',
      description: 'State-of-the-art indoor courts with coaching services.',
      city: 'Hyderabad',
      country: 'India',
      latitude: 17.3850,
      longitude: 78.4867,
      sports: { tennis: true, badminton: true },
      amenities: { coaching: true, equipmentRental: true },
      photos: [
        "https://source.unsplash.com/800x600/?tennis,court",
        "https://source.unsplash.com/800x600/?badminton,indoor"
      ],
      approved: true
    }
  });

  const facility4 = await prisma.facility.create({
    data: {
      ownerId: owner2!.id,
      name: 'City Football Grounds',
      description: 'Professional football turfs with FIFA-standard dimensions.',
      city: 'Delhi',
      country: 'India',
      latitude: 28.6139,
      longitude: 77.2090,
      sports: { football: true },
      amenities: { parking: true, refreshments: true },
      photos: [
        "https://source.unsplash.com/800x600/?football,field",
        "https://source.unsplash.com/800x600/?football,players"
      ],
      approved: true
    }
  });

  // --- COURTS ---
  const court1 = await prisma.court.create({
    data: {
      facilityId: facility1.id,
      name: 'Indoor Badminton Court 1',
      sportType: 'Badminton',
      pricePerHour: 300,
      currency: "INR",
      operatingHours: { start: '06:00', end: '22:00' },
      active: true
    }
  });

  const court2 = await prisma.court.create({
    data: {
      facilityId: facility1.id,
      name: 'Football Turf A',
      sportType: 'Football',
      pricePerHour: 1200,
      currency: "INR",
      operatingHours: { start: '06:00', end: '23:00' },
      active: true
    }
  });

  const court3 = await prisma.court.create({
    data: {
      facilityId: facility2.id,
      name: 'Cricket Turf',
      sportType: 'Cricket',
      pricePerHour: 1500,
      currency: "INR",
      operatingHours: { start: '08:00', end: '22:00' },
      active: true
    }
  });

  const court4 = await prisma.court.create({
    data: {
      facilityId: facility3.id,
      name: 'Tennis Court 1',
      sportType: 'Tennis',
      pricePerHour: 500,
      currency: "INR",
      operatingHours: { start: '06:00', end: '21:00' },
      active: true
    }
  });

  const court5 = await prisma.court.create({
    data: {
      facilityId: facility4.id,
      name: 'Football Turf B',
      sportType: 'Football',
      pricePerHour: 1300,
      currency: "INR",
      operatingHours: { start: '05:00', end: '23:00' },
      active: true
    }
  });

  // --- BOOKINGS ---
  const booking1 = await prisma.booking.create({
    data: {
      userId: player1!.id,
      courtId: court1.id,
      startTime: new Date('2025-08-15T10:00:00'),
      endTime: new Date('2025-08-15T11:00:00'),
      totalAmount: 300,
      currency: "INR",
      status: BookingStatus.CONFIRMED
    }
  });

  const booking2 = await prisma.booking.create({
    data: {
      userId: player2!.id,
      courtId: court2.id,
      startTime: new Date('2025-08-20T18:00:00'),
      endTime: new Date('2025-08-20T19:30:00'),
      totalAmount: 1200,
      currency: "INR",
      status: BookingStatus.PENDING
    }
  });

  // --- MATCHES ---
  await prisma.match.create({
    data: {
      creatorId: player1!.id,
      sportType: 'Football',
      maxPlayers: 10,
      startsAt: new Date('2025-08-20T18:00:00'),
      booking: { connect: { id: booking2.id } }
    }
  });

  // --- PAYMENTS ---
  await prisma.payment.create({
    data: {
      userId: player1!.id,
      bookingId: booking1.id,
      amount: 300,
      currency: "INR",
      status: PaymentStatus.SUCCEEDED
    }
  });

  console.log('✅ Seeding completed with realistic data!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
