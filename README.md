# cgo — C/C++ Playground

A playground for experimenting with C and C++ code. This repository provides tools, examples, and a web-based interface (built with TypeScript/JavaScript/CSS) to write, compile, and test small C/C++ snippets quickly.

## About
This project is a lightweight playground for learning, testing, and sharing C/C++ code. It aims to make it easy to iterate on small examples without installing a full toolchain, while keeping the codebase modern and approachable using TypeScript for the frontend/backend tooling.

## Features
- Write and run C and C++ snippets in a sandboxed environment
- Example snippets to demonstrate common patterns
- Simple web UI for editing and running code (built in TypeScript)
- Extensible architecture so new tools or compilers can be added

## Getting started

Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- (Optional) Docker, if the repository includes a Dockerfile for sandboxing

Quick start (example)
1. Clone the repository:
   git clone https://github.com/DylanZM/cgo.git
2. Install dependencies:
   npm install
3. Start the development server:
   npm run dev
4. Open the URL shown by the dev server (commonly http://localhost:3000)

Note: Replace the commands above with the actual scripts used in this repository if they differ (for example, `npm start`, `npm run serve`, or `yarn dev`).

## Usage
- Use the web UI to create a new snippet, choose C or C++, and run the code.
- Save and share snippets by copying the page link (if the app supports sharing).
- Look in the `examples/` (or similar) directory for ready-made code samples.

