'use server'

import { getSubscriptionToken, Realtime  } from "@inngest/realtime"
import { inngest } from "@/inngest/client"
import { googleFormTriggerChannel } from "@/inngest/channels/google-form-trigger";

export type GoogleTriggerToken = Realtime.Token<typeof googleFormTriggerChannel,['status']>;

export async function fetchGoogleFormTriggerToken(): Promise<GoogleTriggerToken>{
    const token = await getSubscriptionToken(inngest, {channel: googleFormTriggerChannel(), topics: ['status']} )
    return token;
}