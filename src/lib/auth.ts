import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import{ prisma } from "./db";
import {checkout, polar,portal} from "@polar-sh/better-auth"
import { polarClient } from "./polar";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword:{
    enabled:true,
    autoSignIn: true,
  },

  plugins:[
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use:[
        checkout({
          products:[
            {
              productId:"cad60feb-b51c-4d3c-85e3-1e93f71c273f",
              slug:"pro",
              
            }
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly:true,
          
        }),
        portal(),
      ]
    })
  ]
});
