"use client";

import React from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { Link } from "@nextui-org/react";

export default function Menu() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="solid" className="cursor-pointer font-semibold">
          Open Menu
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Link Actions">
        {/* <DropdownItem key="Home">
          <Link href="/" style={{ display: 'block', width: '100%', height: '100%' }}>Home</Link>
        </DropdownItem> */}
        <DropdownItem key="season">
          <Link href="/season" style={{ display: 'block', width: '100%', height: '100%' }}>Season</Link>
        </DropdownItem>
        <DropdownItem key="tournaments">
          <Link href="/tournaments" style={{ display: 'block', width: '100%', height: '100%' }}>Tournaments</Link>
        </DropdownItem>
        {/* <DropdownItem key="rankings">
          <Link href="/rankings" style={{ display: 'block', width: '100%', height: '100%' }}>Rankings</Link>
        </DropdownItem> */}
        <DropdownItem key="Feed">
          <Link href="/instagram" style={{ display: 'block', width: '100%', height: '100%' }}>Feed</Link>
        </DropdownItem>
        <DropdownItem key="about">
          <Link href="/about" style={{ display: 'block', width: '100%', height: '100%' }}>About Us</Link>
        </DropdownItem>
        <DropdownItem key="contact">
          <Link href="/contact" style={{ display: 'block', width: '100%', height: '100%' }}>Contact Us</Link>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
