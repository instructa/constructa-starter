import { boolean, pgTable, text } from 'drizzle-orm/pg-core';

import { timestamps, timestamptz } from './_shared';
import { user } from './auth.schema';

export const profile = pgTable('profile', {
  id: text('id')
    .primaryKey()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  username: text('username').unique(),
  email: text('email'),

  avatar: text('avatar'),
  phone: text('phone'),
  firstName: text('firstName'),
  lastName: text('lastName'),
  fullName: text('fullName'),
  isOnboarded: boolean('isOnboardingComplete').default(false),
  emailVerifiedAt: timestamptz('email_verified_at'),
  ...timestamps,
});
