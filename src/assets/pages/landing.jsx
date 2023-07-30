import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import Logo from '../components/icons/Logo'
import SearchBar from '../components/SearchBar'
import OButton from '../components/buttons/OButton'
import OLink from '../components/links/OLink'

function Landing() {
  const navigate = useNavigate();

  return (
    <main className='text-white'>
      <div className="py-24 flex flex-col gap-8 px-8 md:px-80 lg:px-20">
        <header className='text-center flex flex-col gap-8'>
          <Logo center={true} />
          <div className="font-montserrat font-bold text-lg">The anime streaming-like for fun i guess</div>
        </header>
        <div className="text-center gap-2">
          <SearchBar
            placeholder="Type anime like One Piece, Jujutsu Kaisen..."
            theme='original'
            />
          <OButton click={() => navigate("/home")} className="mt-4">
            Home
          </OButton>
        </div>
        <article className="text-center">
          <p className='mx-auto w-auto lg:w-1/2 xl:w-2/6'>
            Anime database from <OLink blank={true} href="https://myanimelist.net/">MyAnimeList</OLink> with special search API from <OLink blank={true} href="https://jikan.moe/">Jikan API</OLink>. Initial purpose of making this website is for self-taught project practice.<br/><OLink blank={true} href="https://github.com/norman-andrians/jaozo">See source code</OLink>
          </p>
        </article>
        <article className='bg-orange-500 bg-opacity-30 text-amber-400 xl:mx-52 mx-0 p-4 text-sm border border-orange-600 border-opacity-60 rounded-md'>
          This is not really a place to watch streaming anime, it's really just a web to view anime details from MyAnimeList database. This website displays detailed anime data and then implements it into streaming anime but not watching streaming.
        </article>
      </div>
    </main>
  )
}

export default Landing
