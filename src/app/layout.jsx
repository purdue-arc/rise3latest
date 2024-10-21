import "./globals.css";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import Navbar from "@/components/Navbar";
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full overflow-auto">
      <body className="h-full overflow-auto">
        {/* <NavigationMenu className="width=500, height=100"></NavigationMenu> */}
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
