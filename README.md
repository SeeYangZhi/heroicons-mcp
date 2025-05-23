# heroicons-mcp

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server exposing [Heroicons](https://heroicons.com/) as resources and tools for LLMs and agentic applications. Built with Bun and the MCP TypeScript SDK.

## Features

- Exposes Heroicons as MCP resources
- Provides icon search and retrieval tools
- Ready for integration with Claude Desktop and other MCP clients

## Prerequisites

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/) (see install instructions below)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SeeYangZhi/heroicons-mcp.git
cd heroicons-mcp
```

### 2. Install Bun (if you don't have it)

#### On macOS (with Homebrew):

```bash
brew tap oven-sh/bun
brew install bun
```

#### Or with the official install script (macOS, Linux, WSL):

```bash
curl -fsSL https://bun.sh/install | bash
```

After installation, restart your terminal and check:

```bash
bun --version
```

### 3. Install dependencies

```bash
bun install
```

### 4. Build the project

```bash
bun run build
```

### 5. Run the server (for local development)

```bash
bun run index.ts
```

## Testing MCP Locally with Inspector

You can test your MCP server locally using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), an interactive tool for debugging and verifying MCP servers.

First, build the project:

```bash
bun run build
```

Then launch the Inspector and connect it to your built server:

```bash
npx @modelcontextprotocol/inspector node build/index.js
```

This will open the Inspector interface, allowing you to interactively test resources, tools, and prompts exposed by your MCP server.

## Using with Claude Desktop

To use this MCP server in [Claude Desktop](https://www.anthropic.com/claude-desktop):

1. Build the project (if you haven't already):
   ```bash
   bun run build
   ```
2. Open your Claude Desktop configuration file:
   ```bash
   code ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```
   (Or use your preferred editor)
3. Add your server to the `mcpServers` section. Example:
   ```json
   {
     "mcpServers": {
       "heroicons": {
         "command": "node",
         "args": ["/ABSOLUTE/PATH/TO/heroicons-mcp/build/index.js"]
       }
     }
   }
   ```
   Replace `/ABSOLUTE/PATH/TO/heroicons-mcp/build/index.js` with the actual absolute path to your built server file.
4. Save the file and restart Claude Desktop.
5. You should now see the "heroicons" server available in Claude's tools panel.

## Resources

- [Heroicons](https://heroicons.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [Bun](https://bun.sh/)

## License

[MIT](LICENSE)
