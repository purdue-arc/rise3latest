import "./globals.css";
import {NavigationMenu} from "@/components/ui/navigation-menu";
import Navbar from "@/components/Navbar";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
            <NavigationMenu className="width=500, height=100"></NavigationMenu>
            <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
