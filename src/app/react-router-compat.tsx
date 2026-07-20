"use client";

import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter, useParams as useNextParams, usePathname, useSearchParams as useNextSearchParams } from 'next/navigation';

// Mock Link wrapper that converts 'to' into 'href'
export const Link = React.forwardRef<HTMLAnchorElement, any>(
  ({ to, href, ...props }, ref) => {
    const destination = to || href || '#';
    return <NextLink href={destination} ref={ref} {...props} />;
  }
);
Link.displayName = 'Link';

// Mock useNavigate wrapping next/navigation useRouter
export function useNavigate() {
  const router = useRouter();
  return (to: string | number, options?: { replace?: boolean }) => {
    if (typeof to === 'number') {
      if (to === -1) {
        window.history.back();
      } else {
        window.history.go(to);
      }
      return;
    }
    if (options?.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
}

// Mock useParams wrapping next/navigation useParams
export function useParams() {
  const params = useNextParams();
  return params || {};
}

// Mock useSearchParams wrapping next/navigation search params
export function useSearchParams() {
  const searchParams = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams = (newParams: any) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  return [searchParams, setSearchParams] as const;
}

// Mock useLocation wrapping next/navigation path/search hooks
export function useLocation() {
  const pathname = usePathname();
  const searchParams = useNextSearchParams();
  return {
    pathname: pathname || '',
    search: searchParams ? `?${searchParams.toString()}` : '',
    hash: '',
    state: null,
  };
}

// Mock Navigate element that performs client-side redirect on mount
export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  const router = useRouter();
  useEffect(() => {
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [router, to, replace]);
  return null;
}
