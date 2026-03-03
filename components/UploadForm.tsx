"use client"

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadSchema } from '@/lib/zod';
import { BookUploadFormValues } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES, DEFAULT_VOICE } from '@/lib/constants';
import { toast } from 'sonner'
import FileUploader from "./FileUploader";
import { ImageIcon, Upload } from "lucide-react";
import VoiceSelector from "./VoiceSelector";
import LoadingOverlay from "./LoadingOverlay";

const UploadForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { userId } = useAuth();
    const router = useRouter()

    useEffect(() => {
        setIsMounted(true);
    }, []);


    const form = useForm<BookUploadFormValues>({
        resolver: zodResolver(UploadSchema),
        defaultValues: {
            title: '',
            author: '',
            persona: '',
            pdfFile: undefined,
            coverImage: undefined,
        },
    });

    const onSubmit = async (data: BookUploadFormValues) => {
        if (!userId) {
            return toast.error("Please login to upload books");
        }
        setIsSubmitting(true);

    }
    if (!isMounted) return null;
    return (
        <>
            {isSubmitting && <LoadingOverlay />}
            <div className="new-book-wrapper">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FileUploader control={form.control}
                            name="pdfFile"
                            label="Book PDF File"
                            acceptTypes={ACCEPTED_PDF_TYPES}
                            icon={Upload}
                            placeholder="Click to upload PDF"
                            hint="PDF file (max 50MB)"
                            disabled={isSubmitting} />
                        <FileUploader
                            control={form.control}
                            name="coverImage"
                            label="Cover Image (Optional)"
                            acceptTypes={ACCEPTED_IMAGE_TYPES}
                            icon={ImageIcon}
                            placeholder="Click to upload cover image"
                            hint="Leave empty to auto-generate from PDF"
                            disabled={isSubmitting}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="form-input"
                                            placeholder="ex: Rich Dad Poor Dad"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Author Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="form-input"
                                            placeholder="ex: Robert Kiyosaki"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="persona"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                                    <FormControl>
                                        <VoiceSelector
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="form-btn" disabled={isSubmitting}>
                            Begin Synthesis
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default UploadForm