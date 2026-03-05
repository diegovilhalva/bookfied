"use server"

import { connectToDatabase } from "@/database/mongoose"
import { CreateBook, TextSegment } from "@/types"
import { escapeRegex, generateSlug, serializeData } from "../utils"
import Book from "@/database/models/book.model"
import BookSegment from "@/database/models/book-segment.model"


export const getAllBooks = async (search?: string) => {
    try {
        await connectToDatabase();

        let query = {};

        if (search) {
            const escapedSearch = escapeRegex(search);
            const regex = new RegExp(escapedSearch, 'i');
            query = {
                $or: [
                    { title: { $regex: regex } },
                    { author: { $regex: regex } },
                ]
            };
        }

        const books = await Book.find(query).sort({ createdAt: -1 }).lean();

        return {
            success: true,
            data: serializeData(books)
        }
    } catch (e) {
        console.error('Error connecting to database', e);
        return {
            success: false, error: e
        }
    }
}

export const getBookBySlug = async (slug: string) => {
    try {
        await connectToDatabase();

        const book = await Book.findOne({ slug }).lean();

        if (!book) {
            return { success: false, error: 'Book not found' };
        }

        return {
            success: true,
            data: serializeData(book)
        }
    } catch (e) {
        console.error('Error fetching book by slug', e);
        return {
            success: false, error: e
        }
    }
}

export const checkBookExists = async (title: string) => {
    try {

        await connectToDatabase()

        const slug = generateSlug(title)

        const existingBook = await Book.findOne({ slug }).lean()

        if (existingBook) {
            return {
                exists: true,
                book: serializeData(existingBook)
            }
        }

        return {
            exists: false,
        }
    } catch (error) {
        console.error('Error checking book exists', error);
        return {
            exists: false, error: error
        }
    }
}



export const createBook = async (data: CreateBook) => {
    try {
        await connectToDatabase()
        const slug = generateSlug(data.title)

        const existingBook = await Book.findOne({ slug }).lean()

        if (existingBook) {
            return {
                success: true,
                data: serializeData(existingBook),
                alreadyExists: true,
            }
        }

        // Todo: Check subscription limits before creating a book

        const book = await Book.create({ ...data, slug, totalSegments: 0 });

        return {
            success: true,
            data: serializeData(book),
        }
    } catch (error) {
        console.error('Error creating a book', error);

        return {
            success: false,
            error: error,
        }
    }
}



export const saveBookSegments = async (bookId: string, clerkId: string, segments: TextSegment[]) => {
    try {
        await connectToDatabase();
        const segmentsToInsert = segments.map(({ text, segmentIndex, pageNumber, wordCount }) => ({
            clerkId, bookId, content: text, segmentIndex, pageNumber, wordCount
        }));

        await BookSegment.insertMany(segmentsToInsert);

        await Book.findByIdAndUpdate(bookId, { totalSegments: segments.length });

        return {
            success: true,
            data: { segmentsCreated: segments.length }
        }
    } catch (error) {
        console.error('Error saving book segments', error);

        return {
            success: false,
            error: error
        }
    }
}