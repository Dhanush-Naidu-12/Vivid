import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import {prisma} from '@/lib/db';
export const appRouter = createTRPCRouter({
  getUser: protectedProcedure.query(({ctx}) => {
    return prisma.user.findMany({
      where: {
        id: ctx.session.user.id
      }
    })
  }),
  testAi: protectedProcedure.mutation(async () =>{
    await inngest.send({
      name: 'execute/ai',
    });
    return {success: true, message: 'Job is going'}
  })
});
export type AppRouter = typeof appRouter;