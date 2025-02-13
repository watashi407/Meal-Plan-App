import { Home, Settings, User, Folder, Mail } from 'lucide-react';

export const navigationItems = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: Folder,
  },
  {
    title: 'About',
    href: '/about',
    icon: User,
  },
  {
    title: 'Contact',
    href: '/contact',
    icon: Mail,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
] as const;
