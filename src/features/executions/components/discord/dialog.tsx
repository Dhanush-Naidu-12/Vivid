'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";




const formSchema = z.object({
   
    variableName: z.string().min(1, {message: "Variable name is required"}).regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {message: "Variable name must start with a letter or underscore and contain only letters, numbers, and underscores"}),
    username: z.string().optional(),
    content: z.string().min(1, "Message content is required").max(2000, "Message content must be less than 2000 characters"),
    webhookUrl: z.string().min(1, "Webhook URL is required")
})

export type DiscordFormValues = z.infer<typeof formSchema>

interface Props {
    open:boolean;
    onOpenChange:(open:boolean) => void;
    onSubmit: (values:z.infer<typeof formSchema>) => void;
    defaultValues?: Partial<DiscordFormValues>;
}


export const DiscordDialog =({open,onOpenChange, onSubmit, defaultValues={}}:Props) =>{
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            content: defaultValues.content || "",
            variableName: defaultValues.variableName || '',
            username: defaultValues.username || "",
            webhookUrl: defaultValues.webhookUrl || "",
        }
    })

    useEffect(()=>{
        if(open){
            form.reset({
                 content: defaultValues.content || "",
                 variableName: defaultValues.variableName || '',
                username: defaultValues.username || "",
                webhookUrl: defaultValues.webhookUrl || "",
            })
        }
    },[open, defaultValues, form])


    const watchVariableName = form.watch('variableName') || 'myDiscord';
    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);
        onOpenChange(false);
    }

    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-primary">Discord Configuration</DialogTitle>
                    <DialogDescription className="text-sm text-black ">
                        Configure the Discord webhook settings for this Discord node.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 mt-4">
                        <FormField control={form.control} name="variableName" render={({field}) =>(
                        <FormItem>
                            <FormLabel>Variable Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="mydiscord"/>

                            </FormControl>
                            <FormDescription>
                                Use this name to reference the result in other nodes:{" "} {`{{${watchVariableName}.aiResponse}}`}
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                       )}/>
                      <FormField control={form.control} name="webhookUrl" render={({field}) =>(
                                                  <FormItem>
                                                      <FormLabel>Webhook URL</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="https://discord.com/api/webhooks/..."/>
                                                        </FormControl>
                                                        <FormDescription>
                                                            Get this from your Discord server settings: Server Settings → Integrations → Webhooks
                                                        </FormDescription>
                                                      <FormMessage/>
                                                  </FormItem>
                                              )}/>
                        <FormField control={form.control} name="content" render={({field}) =>(
                           <FormItem>
                            <FormLabel>Message Content</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="Summary: {{myGemini.aiResponse}}" className="min-h-12.5 font-mono text-sm "/>
                            </FormControl>
                            <FormDescription>
                                The message to send. Use {"{{variables}}"} for simple values or {"{{json variables}}"} for stringify objects.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                        )}/>
                       <FormField control={form.control} name="username" render={({field}) =>(
                                                  <FormItem>
                                                      <FormLabel>Bot username (optional)</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="Workflow Bot"/>
                                                        </FormControl>
                                                        <FormDescription>
                                                            Override the webhook's default username
                                                        </FormDescription>
                                                      <FormMessage/>
                                                  </FormItem>
                                              )}/>
                       <DialogFooter className="mt-4">
                        <Button type="submit">Save</Button>
                       </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}