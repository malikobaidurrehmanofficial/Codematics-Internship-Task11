import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import MovixMovieGrid from '../components/movie/MovixMovieGrid';
import MovixMovieSkeleton from '../components/movie/MovixMovieSkeleton';
import MovixButton from '../components/ui/MovixButton';
import { searchMovies } from '../services/movixTmdb';
import { classNames } from '../utils/helpers';

const inputClass =
  'h-[54px] w-full rounded-2xl border border-app bg-black/30 px-4 pl-12 text-app outline-none transition placeholder:text-muted focus:border-[#E50914]/50 focus:bg-black/45';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 450);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    setSearchParams(debouncedQuery ? { q: debouncedQuery } : {});
  }, [debouncedQuery, setSearchParams]);

  useEffect(() => {
    const loadResults = async () => {
      if (!debouncedQuery) {
        setResults([]);
        setTotalResults(0);
        setTotalPages(1);
        setPage(1);
        return;
      }

      setIsLoading(true);

      try {
        const data = await searchMovies(debouncedQuery, page);
        setTotalResults(data.total_results || 0);
        setTotalPages(data.total_pages || 1);
        setResults((current) =>
          page === 1 ? data.results || [] : [...current, ...(data.results || [])]
        );
      } catch (error) {
        console.error('Search error', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResults();
  }, [debouncedQuery, page]);

  const hasResults = results.length > 0;
  const canLoadMore = page < totalPages && !isLoading;

  const handleClear = () => {
    setQuery('');
    setDebouncedQuery('');
    setResults([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (!canLoadMore) {
      return;
    }
    setPage((current) => current + 1);
  };

  const showEmpty = !isLoading && debouncedQuery && !hasResults;
  const showIntro = !debouncedQuery && !isLoading;

  const resultSummary = useMemo(() => {
    if (!debouncedQuery) {
      return null;
    }
    if (isLoading && page === 1) {
      return 'Searching...';
    }
    return `${totalResults} result${totalResults === 1 ? '' : 's'} found`;
  }, [debouncedQuery, isLoading, page, totalResults]);

  return (
    <div className="bg-app pb-24 pt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-muted text-xs uppercase tracking-[0.35em]">Movix Search</p>
            <h1 className="text-app mt-3 text-3xl font-semibold md:text-4xl">Find your next movie.</h1>
            <p className="text-muted mt-2 max-w-2xl text-sm">
              Search the catalog by title and jump straight into the details.
            </p>
          </div>
          <Link to="/#discover">
            <MovixButton variant="secondary">Browse Discover</MovixButton>
          </Link>
        </div>

        <div className="surface-card border-app mb-10 rounded-[28px] border p-4 md:p-6">
          <div className="relative">
            <SearchIcon className="text-muted absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" />
            <input
              className={inputClass}
              onChange={(event) => {
                setPage(1);
                setQuery(event.target.value);
              }}
              placeholder="Search movies..."
              value={query}
            />
            {query ? (
              <button
                aria-label="Clear search"
                className="text-muted absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 transition hover:bg-white/10"
                onClick={handleClear}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
          {resultSummary ? (
            <p className="text-muted mt-3 text-sm">{resultSummary}</p>
          ) : null}
        </div>

        {isLoading && page === 1 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <MovixMovieSkeleton count={10} />
          </div>
        ) : null}

        {hasResults ? (
          <>
            <MovixMovieGrid isLoading={isLoading} movies={results} showHint={false} />
            <div className="mt-10 flex justify-center">
              <MovixButton
                className={classNames(canLoadMore ? '' : 'opacity-40')}
                disabled={!canLoadMore}
                onClick={handleLoadMore}
                variant="secondary"
              >
                {canLoadMore ? 'Load more' : 'No more results'}
              </MovixButton>
            </div>
          </>
        ) : null}

        {showEmpty ? (
          <div className="surface-card border-app mt-10 rounded-[32px] border p-10 text-center">
            <h2 className="text-app text-2xl font-semibold">No matches yet.</h2>
            <p className="text-muted mt-3">
              Try a different title or browse the trending rows instead.
            </p>
          </div>
        ) : null}

        {showIntro ? (
          <div className="surface-card border-app mt-10 rounded-[32px] border p-10 text-center">
            <h2 className="text-app text-2xl font-semibold">Start typing to search.</h2>
            <p className="text-muted mt-3">
              Look up any movie title and Movix will pull the results instantly.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
