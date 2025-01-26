"use client";
import Link from "next/link";
import "../styles/global.css";
import Magnet from "./Magnet";
export default function Footer() {
  return (
    <footer className="w-full  bg-black/40 backdrop-blur-lg  md:mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">About League</h3>
            <p className="text-gray-400 text-sm">
              Join the ultimate eFootball experience. Compete with the best,
              rise through the ranks, and become a legend in the digital
              football world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Tournaments", "Rankings", "Rules", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`}>
                    <span className="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
            <ul className="space-y-2">
              {[
                
                { name: "Instagram", icon: "🐺" , link:"https://www.instagram.com/efootballpremierleague"},
                { name: "Twitter", icon: "🐦" , link:"/twitter"},
                { name: "Whatsapp", icon: "👀", link:"https://chat.whatsapp.com/Ep8tPP3Ys6NL8bLjIp3ZGk" },
              ].map((social) => (
                <li key={social.name}>
                  <Link href={social.link}>
                    <span className="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">
                      {social.icon} {social.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Follow to get the latest updates and news.
            </p>
            <div className="flex flex-col space-y-2">
              
              <Magnet padding={500} disabled={false} magnetStrength={50}>
                <Link href="https://www.instagram.com/efootballpremierleague">
                <button className="bg-gradient-to-r w-full from-teal-400 to-emerald-500 text-black font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">
                  Follow Us
                </button>
                </Link>
              </Magnet>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © eFootball Premier League. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy">
                <span className="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-gray-400 hover:text-teal-400 transition-colors duration-300 text-sm">
                  Terms of Service
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
