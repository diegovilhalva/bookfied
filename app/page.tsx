"use client"
import BookCard from '@/components/BookCard'
import HeroSection from '@/components/HeroSection'
import Search from '@/components/Search'
import { sampleBooks } from '@/lib/constants'
import { useSearchParams } from 'next/navigation'

const Page = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get("query")?.toLowerCase() || ""

  const filteredBooks = sampleBooks.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  )
  return (
    <main className="wrapper  container">
      <HeroSection />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
        <h2 className="text-3xl font-serif font-bold text-[#212a3b]">Recent Books</h2>
        <Search />
      </div>
      <div className="library-books-grid">
        {filteredBooks.map((book) => (
          <BookCard key={book._id} title={book.title} author={book.author} coverURL={book.coverURL} slug={book.slug} />
        ))}
      </div>
    </main>
  )
}

export default Page