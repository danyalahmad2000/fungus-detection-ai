"use client";
import { useState } from "react";
import Image from "next/image";
// import logo from "../../../public/imgs/logo.svg";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

import Link from "next/link";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <>
      <header className="w-full md:top-0 md:z-30 text-white bg-[#0a0a0a]">
        <div className="w-full lg:container mx-auto">
          <div className="flex flex-row justify-between items-center p-3">
            {/* Hamburger Menu for small and medium screens */}
            <div className="flex md:hidden">
              {isMenuOpen ? (
                <IoCloseSharp
                  className="h-6 w-6 text-white cursor-pointer"
                  onClick={toggleMenu}
                />
              ) : (
                <AiOutlineMenu
                  className="h-6 w-6 text-white cursor-pointer"
                  onClick={toggleMenu}
                />
              )}
            </div>

            {/* Logo in the center on small and medium screens */}
            {/* <div className="flex-grow text-center flex justify-center md:flex-grow-0 size-[130px] items-center md:mb-4">
              <Link href="/">
                <Image
                  src={logo}
                  alt="Logo"
                  width={175}
                  height={20}
                  className="object-contain"
                />
              </Link>
            </div> */}

            {/* Navigation links - hidden on small screens, visible on medium and above */}
            <div className="hidden md:flex gap-10 items-center">
              <Link
                href="/"
                className="cursor-pointer text-white hover:decoration-primaryColor hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                onClick={closeMenu}
              >
                Home
              </Link>
              <div className="relative">
                <button
                  className="cursor-pointer text-white hover:decoration-primaryColor hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                  onClick={toggleServices}
                >
                  Services
                </button>
                {isServicesOpen && (
                  <div className="flex flex-col gap-4 absolute left-0 mt-2 border text-primaryColor shadow-md rounded-xl z-20 w-60 p-6">
                    <Link
                      href="/services/amazon"
                      className="cursor-pointer text-white hover:decoration-primaryColor hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                      onClick={toggleServices}
                    >
                      Amazon Automation
                    </Link>
                    <Link
                      href="/services/shopify"
                      className="cursor-pointer text-white hover:decoration-primaryColor hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                      onClick={toggleServices}
                    >
                      Shopify Automation
                    </Link>
                    <Link
                      href="/services/tiktok"
                      className="cursor-pointer text-white hover:decoration-primaryColor hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                      onClick={toggleServices}
                    >
                      TikTok Automation
                    </Link>
                    <Link
                      href="/services/digital-marketing"
                      className="cursor-pointer text-white hover:decoration-primaryColor hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                      onClick={toggleServices}
                    >
                      Digital Marketing
                    </Link>
                    <Link
                      href="/services/graphic-designing"
                      className="cursor-pointer text-white hover:decoration-primaryColor hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                      onClick={toggleServices}
                    >
                      Graphic Designing
                    </Link>
                    <Link
                      href="/services/website-development"
                      className="cursor-pointer text-white hover:decoration-primaryColor hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                      onClick={toggleServices}
                    >
                      Website Development
                    </Link>
                    <Link
                      href="/services/branding"
                      className="cursor-pointer text-white hover:decoration-primaryColor hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                      onClick={toggleServices}
                    >
                      Branding
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/about"
                className="cursor-pointer text-white hover:decoration-primaryColor hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                href="/contact-us"
                className="cursor-pointer text-white hover:decoration-primaryColor hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </div>

            {/* Book a Call Button - hidden on small screens */}
            <Link href={"/contact-us"} className="z-20">
              <InteractiveHoverButton className="text-black hover:text-white">Sign Out</InteractiveHoverButton>
            </Link>
          </div>

          {/* Dropdown Menu for small and medium screens */}
          {isMenuOpen && (
            <div className="md:hidden mt-14 space-y-2 text-white p-5 rounded-lg">
              <Link
                href="/"
                className="block cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                onClick={closeMenu}
              >
                Home
              </Link>
              <div className="block">
                <button
                  className="block cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                  onClick={toggleServices}
                >
                  Services
                </button>
                {isServicesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      href="/services/amazon"
                      className="block px-4 py-2"
                      onClick={closeMenu}
                    >
                      Amazon Automation
                    </Link>
                    <Link
                      href="/services/shopify"
                      className="block px-4 py-2"
                      onClick={closeMenu}
                    >
                      Shopify Automation
                    </Link>
                    <Link
                      href="/services/tiktok"
                      className="block px-4 py-2"
                      onClick={closeMenu}
                    >
                      TikTok Automation
                    </Link>
                    <Link
                      href="/services/digital-marketing"
                      className="block px-4 py-2"
                      onClick={closeMenu}
                    >
                      Digital Marketing
                    </Link>
                    <Link
                      href="/services/graphic-designing"
                      className="block px-4 py-2"
                      onClick={closeMenu}
                    >
                      Graphic Designing
                    </Link>
                    <Link
                      href="/services/website-development"
                      className="block px-4 py-2"
                      onClick={closeMenu}
                    >
                      Website Development
                    </Link>
                    <Link
                      href="/services/branding"
                      className="block px-4 py-2"
                      onClick={closeMenu}
                    >
                      Branding
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/about"
                className="block cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                href="/contact-us"
                className="block cursor-pointer hover:underline hover:decoration-2 hover:underline-offset-4 hover:scale-110 transition-transform duration-200"
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
