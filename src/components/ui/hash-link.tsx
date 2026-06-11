"use client";

import Link from "next/link";
import { scrollToHash } from "@/lib/scroll-to-hash";

type HashLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export function HashLink({ href, onClick, ...props }: HashLinkProps) {
  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        onClick={(event) => {
          event.preventDefault();
          scrollToHash(href);
          onClick?.(event as unknown as React.MouseEvent<HTMLAnchorElement>);
        }}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  if (href.includes("#")) {
    const [pathname, hash = ""] = href.split("#");

    return (
      <Link
        href={href}
        prefetch={false}
        onClick={(event) => {
          if (pathname === "" || pathname === window.location.pathname) {
            event.preventDefault();
            scrollToHash(`#${hash}`);
          }
          onClick?.(event);
        }}
        {...props}
      />
    );
  }

  return <Link href={href} prefetch={false} onClick={onClick} {...props} />;
}
