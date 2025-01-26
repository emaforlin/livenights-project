"use client";
import Image from "next/image";

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Image
                    aria-hidden
                    src="/logo.svg"
                    alt="Brand logo with slogan: Where events come to life"
                    width={700}
                    height={500}
                    className="flex justify-center"
                    priority
                />
            </main>
        </div>
    );
}
