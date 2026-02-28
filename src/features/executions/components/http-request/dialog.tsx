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
    endpoint: z.url({message: "Please enter a valid URL"}),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
    body: z.string().optional()
})

export type HttpRequestFormValues = z.infer<typeof formSchema>

interface Props {
    open:boolean;
    onOpenChange:(open:boolean) => void;
    onSubmit: (values:z.infer<typeof formSchema>) => void;
    defaultValues?: Partial<HttpRequestFormValues>;
}


export const HttpRequestDialog =({open,onOpenChange, onSubmit, defaultValues={}}:Props) =>{
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            endpoint: defaultValues.endpoint || '',
            method: defaultValues.method || 'GET',
            body: defaultValues.body || '',
        }
    })

    useEffect(()=>{
        if(open){
            form.reset({
                endpoint: defaultValues.endpoint || '',
                method: defaultValues.method || 'GET',
                body: defaultValues.body || '',
            })
        }
    },[open, defaultValues, form])

    const watchMethod = form.watch('method');
    const showBodyField = ['POST', 'PUT', 'PATCH'].includes(watchMethod);
    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);
        onOpenChange(false);
    }

    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-primary">HTTP Request</DialogTitle>
                    <DialogDescription className="text-sm text-black ">
                        Configure settings for the HTTP request node.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 mt-4">
                       <FormField control={form.control} name="method" render={({field}) =>(
                        <FormItem>
                            <FormLabel>Method</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                               <FormControl>
                                <SelectTrigger className="w-full ">
                                    <SelectValue placeholder="Select a method"/>
                                </SelectTrigger>
                               </FormControl>
                               <SelectContent className="bg-background"> 
                                    <SelectItem value="GET">GET</SelectItem>
                                    <SelectItem value="POST">POST</SelectItem>
                                    <SelectItem value="PUT">PUT</SelectItem>
                                    <SelectItem value="DELETE">DELETE</SelectItem>
                                    <SelectItem value="PATCH">PATCH</SelectItem>
                               </SelectContent>
                            </Select>
                            <FormDescription>
                                The HTTP method to use for this request.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                       )}/>
                         <FormField control={form.control} name="endpoint" render={({field}) =>(
                        <FormItem>
                            <FormLabel>Endpoint URL</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="https://api.example.com/users/{{httpResponse.data.id}}"/>
                            </FormControl>
                            <FormDescription>
                                Static URL or use {'{variables}'} for simple values or {'{{json variables}}'} to stringify objects
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                       )}/>
                       {showBodyField && (
                        <FormField control={form.control} name="body" render={({field}) =>(
                           <FormItem>
                            <FormLabel>Request Body</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder={'{\n "userId": "{{httpResponse.data.id}}",\n "name": "{{httpResponse.data.name}}"\n "items":"{{httpResponse.data.items}}"\n}'} className="min-h-30 font-mono text-sm"/>
                            </FormControl>
                            <FormDescription>
                                JSON with template variables. Use {'{variables}'} for simple values or {'{{json variables}}'} to stringify objects
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                        )}/>
                       )}
                       <DialogFooter className="mt-4">
                        <Button type="submit">Save</Button>
                       </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}