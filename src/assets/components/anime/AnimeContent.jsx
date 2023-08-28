import React, { useEffect, useState } from 'react'
import FButton from '../buttons/FButton';
import Episodes from './lists/episodes/Episodes';
import { ReactComponent as StarIcon } from '../../icons/star.svg';
import { ReactComponent as PlayIcon } from '../../icons/play.svg';
import { ReactComponent as MarkIcon } from '../../icons/mark.svg';
import { ReactComponent as GridIcon } from '../../icons/grid.svg';
import { ReactComponent as RowIcon } from '../../icons/row.svg';
import { Link } from 'react-router-dom';
import HeaderButton from '../buttons/header/HeaderButton';
import Header from "../sections/Header";
import FefoGrids from "../sections/FefoGrids";
import Section from '../sections/Section';
import NoB from "../../images/no.png";
import ColList from './lists/ColList';

function AnimeContent ({animeData, episodeData, recommendData}) {
    const { data } = animeData;
    const {
        status,
        genres,
        type,
        themes,
        synopsis,
        score,
        rating,
        year
    } = data;

    const title = data.title_english ? data.title_english : data.title
    const trailer = data.trailer.embed_url;
    const trailerImage = data.trailer.images.medium_image_url;
    const episodes = episodeData.data;

    const [expandSynopsis, toggleSynopsis] = useState(false);
    const synopsisMaxLength = 150;

    function TagsElement ({ to, children }) {
        return (
            <Link to={to}>
                <button className="px-5 py-1 rounded bg-border-primary bg-opacity-30 hover:bg-opacity-50 transition duration-150 text-sm">{children}</button>
            </Link>
        );
    }

    useEffect(() => {
        console.log(type);
    }, []);

    function EpisodeSection () {
        const [rowMode, setRowMode] = useState(true);

        const toggleMode = () => {
            if (episodes.length > 0) setRowMode(!rowMode)
        }

        return (
            <Section>
                <header className='font-montserrat flex justify-between items-center'>
                    <h2 className='text-2xl'>Episodes</h2>
                    <HeaderButton onClick={toggleMode}>
                        {rowMode == true ? <RowIcon className="w-5 h-5" /> : <GridIcon className="w-5 h-5" />}
                    </HeaderButton>
                </header>
                <Episodes episodes={episodes} images={trailerImage} mode={rowMode == true && 'col'} />
            </Section>
        )
    }

    return (
    <div className='flex flex-col gap-20 pt-10'>
        <section className='flex flex-col md:flex-row gap-8'>
            <div className="relative md:flex-1 w-full h-[315px] md:w-[560px] md:h-[315px]">
                <iframe
                    className="rounded-xl absolute z-10 w-full h-full"
                    src={trailer}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                >    
                </iframe>
                <div
                    className={`
                        absolute
                        top-0
                        left-0
                        scale-110
                        w-full
                        h-full
                        blur-xl
                        opacity-30
                    `}
                    style={{
                        background: `url('${trailerImage}')`
                    }}
                ></div>
                <div
                    className={`
                        absolute
                        top-0
                        left-0
                        rounded-xl
                        bg-cover
                        bg-no-repeat
                        bg-center
                        w-full
                        h-full
                    `}
                    style={{
                        backgroundImage: trailerImage ? `url('${trailerImage}')` : `url('${NoB}')`
                    }}
                >
                    {episodes < 1 && <p className='absolute left-1/2 -translate-x-1/2 bottom-6 text-2xl font-bold'>No Preview?</p>}
                </div>
            </div>
            <div className="text-white md:flex-1 flex flex-col gap-4">
                <header className='font-bold font-montserrat'>
                    <div className="text-3xl">
                        {title}
                    </div>
                    <div className="text-xl text-primary">{status}</div>
                </header>
                <div className="font-noto-sans">
                    <article className="relative">
                        <p className={!expandSynopsis && `
                            before:content-['']
                            before:absolute
                            before:bottom-0
                            before:left-0
                            before:w-full
                            before:h-1/2
                            before:from-transparent
                            before:to-yawn-primary
                            before:bg-gradient-to-b
                            before:pointer-events-none
                        `}>
                            {synopsis &&
                                !expandSynopsis ? 
                                    synopsis.length > synopsisMaxLength ? synopsis.slice(0, synopsisMaxLength) + "..." : synopsis :
                                    synopsis
                                
                            }
                        </p>
                    </article>
                    {synopsis &&
                        synopsis.length > synopsisMaxLength && <button className="text-primary" onClick={() => { toggleSynopsis(!expandSynopsis) }}>
                            {expandSynopsis ? "Read Less" : "Read More"
                    }
                    </button>}
                </div>
                <div className="flex flex-row items-center gap-4">
                    <div className="border-2 flex flex-row font-bold leading-8 p-1 gap-1 w-20 justify-center items-center border-gold text-gold rounded-md">
                        <div><StarIcon /></div>
                        <div>{score}</div>
                    </div>
                    <div className="font-bold font-noto-sans text-lg">{rating} | {year}</div>
                </div>
                <div className="flex flex-row flex-wrap items-center gap-4">
                    {genres.map(({ name }, k) => {
                        return <TagsElement to={"/genre/" + name.toLowerCase()} key={k}>{name}</TagsElement>
                    })}
                    {themes.map(({ name }, k) => {
                        return <TagsElement to={"/theme/" + name.toLowerCase()} key={k}>{name}</TagsElement>
                    })}
                </div>
                <div className="flex flex-row gap-4">
                    <FButton mode="original">
                        <div><PlayIcon /></div>
                        <div>Play</div>
                    </FButton>
                    <FButton mode="invert">
                        <div><MarkIcon /></div>
                        <div>Add to list</div>
                    </FButton>
                </div>
            </div>
        </section>
        {(type === 'TV' || type === 'OVA') && <EpisodeSection />}
        <Section>
            <Header>More like {title}</Header>
            <FefoGrids gap={6}>
                {recommendData.map((rec, key) => {
                    return (
                        <div className="col-span-2">
                            <ColList.Anime anime={rec} key={key} />
                        </div>
                    )
                })}
            </FefoGrids>
        </Section>
    </div>
    )
}

export default AnimeContent;