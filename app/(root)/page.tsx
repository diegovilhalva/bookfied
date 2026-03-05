
import BookCard from '@/components/BookCard'
import HeroSection from '@/components/HeroSection'
import Search from '@/components/Search'
import { getAllBooks } from '@/lib/actions/book.actions'
//import { sampleBooks } from '@/lib/constants'
//import { useSearchParams } from 'next/navigation'

const Page = async() => {
  

  const bookResults = await getAllBooks()
  const books = bookResults.success  ? bookResults.data ?? [] : []

  /*const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.author.toLowerCase().includes(query)
  )*/
  return (
    <main className="wrapper  container">
      <HeroSection />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
        <h2 className="text-3xl font-serif font-bold text-[#212a3b]">Recent Books</h2>
        <Search />
      </div>
      <div className="library-books-grid">
        {books.map((book) => (
          <BookCard key={book._id} title={book.title} author={book.author} coverURL={book.coverURL} slug={book.slug} />
        ))}
      </div>
    </main>
  )
}

export default Page