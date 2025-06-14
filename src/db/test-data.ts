import { inArray } from 'drizzle-orm';
import { db } from './db-config';
import { profile, user } from './schema';

/**
 * Small, disposable test dataset
 */
const demoUsers = [
  {
    id: 'test-user-1',
    name: 'Alice Test',
    email: 'alice@example.com',
    emailVerified: false,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'test-user-2',
    name: 'Bob Test',
    email: 'bob@example.com',
    emailVerified: false,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'test-user-3',
    name: 'Charlie Test',
    email: 'charlie@example.com',
    emailVerified: false,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
] as const;

const demoProfiles = [
  {
    id: 'test-user-1',
    username: 'alice_test',
    email: 'alice@example.com',
    avatar: null,
    phone: null,
    firstName: 'Alice',
    lastName: 'Test',
    fullName: 'Alice Test',
    isOnboarded: false,
    emailVerifiedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    accessedAt: new Date(),
  },
  {
    id: 'test-user-2',
    username: 'bob_test',
    email: 'bob@example.com',
    avatar: null,
    phone: null,
    firstName: 'Bob',
    lastName: 'Test',
    fullName: 'Bob Test',
    isOnboarded: false,
    emailVerifiedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    accessedAt: new Date(),
  },
] as const;

const demoFiles = [
  {
    id: 'file-1',
    clientId: 'client-1',
    fileType: 'txt',
    name: 'file1.txt',
    size: 123,
    url: 'https://example.com/file1.txt',
    createdAt: new Date(),
    updatedAt: new Date(),
    accessedAt: new Date(),
  },
  {
    id: 'file-2',
    clientId: 'client-2',
    fileType: 'jpg',
    name: 'file2.jpg',
    size: 456,
    url: 'https://example.com/file2.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
    accessedAt: new Date(),
  },
] as const;

export async function createAllTestData() {
  await db.transaction(async (tx) => {
    await tx.insert(user).values(demoUsers);
    await tx.insert(profile).values(demoProfiles);
    await tx.insert(files).values(demoFiles);
  });
}

export async function deleteAllTestData() {
  await db.transaction(async (tx) => {
    await tx.delete(files).where(
      inArray(
        files.id,
        demoFiles.map((f) => f.id)
      )
    );
    await tx.delete(profile).where(
      inArray(
        profile.id,
        demoProfiles.map((p) => p.id)
      )
    );
    await tx.delete(user).where(
      inArray(
        user.id,
        demoUsers.map((u) => u.id)
      )
    );
  });
}
