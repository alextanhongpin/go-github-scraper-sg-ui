import { Page } from '@/types'

export function newPage (limit = 20): Page {
  return {
    total: 0,
    offset: 0,
    limit
  }
}

export function offsetToPage (limit = 0, offset = 0): number {
  return Math.floor(offset / limit) + 1
}

export function pageToOffset (limit = 20, page = 0): number {
  return (page - 1) * limit
}

export function paginate (total = 0, page = 1, perPage = 0) {
  if (total <= 0) {
    return {
      hasNextPage: false,
      hasPrevPage: false,
      current: 0,
      next: 0,
      prev: 0,
      onlyPage: true,
      pages: 0,
      total: 0
    }
  }
  const pages = Math.ceil(total / perPage)
  if (page > pages) page = pages
  if (page < 1) page = 1
  const next = Math.min(page + 1, pages)
  const prev = Math.max(1, page - 1)

  return {
    hasNextPage: page + 1 <= pages,
    hasPrevPage: page - 1 > 0,
    current: page,
    next,
    prev,
    onlyPage: total <= perPage,
    pages,
    total,
    page
  }
}
