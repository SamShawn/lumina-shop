import type { Role } from '@/types';

// Augment NextAuth types for next-auth v4
declare module 'next-auth' {
  interface User {
    id: string;
    role: Role;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: Role;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
  }
}
