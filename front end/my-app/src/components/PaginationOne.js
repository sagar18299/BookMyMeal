import React from 'react'

export default function PaginationOne() {
  return (
    <div className="flex items-center">
      <a href="#" className="mx-1 cursor-not-allowed text-sm font-semibold text-gray-900">
        &larr; Previous
      </a>
      <a
        href="#"
        className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
      >
        1
      </a>
      <a
        href="#"
        className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
      >
        2
      </a>
      <a
        href="#"
        className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
      >
        3
      </a>
      <a
        href="#"
        className="mx-1 flex items-center rounded-md border border-gray-400 px-3 py-1 text-gray-900 hover:scale-105"
      >
        4
      </a>
      <a href="#" className="mx-2 text-sm font-semibold text-gray-900">
        Next &rarr;
      </a>
    </div>
  )
}
