import React from 'react'
import TopBar from './TopBar'
import MiddleBar from './MiddleBar'
import BottomBar from './BottomBar'

export default function NavBar({ locale }: { locale: string }) {
    return (
        <>
            <header  className="bg-dark hidden md:block">
                <div className="container">
                    <TopBar />
                    <MiddleBar locale={locale} />
                </div>
            </header>

            <div className="hidden md:block">
                <BottomBar />
            </div>
        </>
    )
}
