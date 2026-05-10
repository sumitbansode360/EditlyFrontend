"use client";

import Link from "next/link";
import {
  FileText,
  Search,
  User,
  LogOut,
  LogIn,
  Settings,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavbarProps = {
  appName?: string;
  user?: {
    name: string;
    email?: string;
    image?: string;
    isAuthenticated: boolean;
  };
  onSearch?: (value: string) => void;
  onProfileClick?: () => void;
  onLogin?: () => void;
  onLogout?: () => void;
};

export default function Navbar({
  appName = "CollabDocs",
  user = {
    name: "Guest User",
    isAuthenticated: false,
  },
  onSearch,
  onProfileClick,
  onLogin,
  onLogout,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        {/* LEFT SIDE */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <FileText className="h-5 w-5" />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-base font-semibold leading-none">
              {appName}
            </h1>

            <p className="mt-1 text-xs text-muted-foreground">
              Realtime Document Editor
            </p>
          </div>
        </Link>

        {/* CENTER SEARCH */}
        <div className="hidden max-w-xl flex-1 md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="text"
              placeholder="Search documents..."
              className="h-11 rounded-xl pl-10 shadow-sm"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-xl border bg-background px-3 py-2 transition-colors hover:bg-muted focus:outline-none">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.image} alt={user.name} />

                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="hidden text-left sm:block">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {user.isAuthenticated ? "Active now" : "Guest"}
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 rounded-xl"
            >
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {user.name}
                  </span>

                  {user.email && (
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  )}
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={onProfileClick}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {user.isAuthenticated ? (
                <DropdownMenuItem
                  onClick={onLogout}
                  className="cursor-pointer text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={onLogin}
                  className="cursor-pointer"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="border-t px-4 py-3 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="text"
            placeholder="Search documents..."
            className="pl-10"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}