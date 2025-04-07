import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <header
      className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50
    support-[backdrop-filter]:bg-background/60"
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.PNG"
            alt="AICareerLogo"
            width={200}
            height={70}
            className="h-14 py-1 w-auto object-contain rounded-lg"
          />
        </Link>
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button variant="outline">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden md:block">Industry Insights</span>
              </Button>
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger>
                <Button asChild>
                  <div>
                    <StarsIcon className="w-4 h-4" />
                    <span className="hidden md:block">Growth Tools</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href={"/resume"} className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Build Resume</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link
                    href={"/ai-cover-letter"}
                    className="flex items-center gap-2"
                    >
                    <PenBox className="w-4 h-4" />
                    <span>Cover Letter</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={"/interview"} className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>Interview Prep</span>
                    </Link>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
          <SignedOut>
            <SignInButton>
                <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton // appearance prop
            appearance={{
                elements:{
                    avatarBox: 'w-10 h-10',
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "font-semibold"
                }
            }}
            afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
