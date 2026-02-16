import { createTRPCRouter, protectedProcedure } from '../init';
import {prisma} from '@/lib/db';
export const appRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ctx}) => {
    return prisma.user.findMany({
      where: {
        id: ctx.session.user.id
      }
    })
  })
});
export type AppRouter = typeof appRouter;