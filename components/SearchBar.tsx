import { database, SocialEvent } from '@/db/db';
import React, { useEffect } from 'react'
import { useState } from 'react';

const SearchBar = () => {

  return (
    <>
    <div className="flex justify-center items-center w-3/4 h-12 mx-auto text-center rounded-full bg-blue-600">
      <input 
        placeholder="Buscar..."
        className="w-3/4 h-full text-ellipsis bg-blue-600 text-xl focus:outline-none" type="text"
      />
    </div>
    </>
  )
}

export default SearchBar