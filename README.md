# heroicons-mcp

<a href="https://glama.ai/mcp/servers/@SeeYangZhi/heroicons-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@SeeYangZhi/heroicons-mcp/badge" />
</a>

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server exposing [Heroicons](https://heroicons.com/) as resources and tools for LLMs and agentic applications. Built with Bun and the MCP TypeScript SDK.

## What is Heroicons?

[Heroicons](https://heroicons.com/) is a popular library of hand-crafted SVG icons, designed by the makers of Tailwind CSS. The icons are available in multiple styles (Outline, Solid) and are easy to integrate into web projects.

## What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) is a standard for AI tools to request specific context from sources outside their main training data.

This MCP server allows AI coding assistants and other agentic applications to access information about Heroicons, enabling better assistance and icon search capabilities.

## Features

- Exposes Heroicons as MCP resources (Outline and Solid styles)
- Provides tools for searching icons by name or keywords
- Allows listing all icons or icons within a specific style
- Ready for integration with Claude Desktop and other MCP clients
- Can be run as an HTTP server or a stdio-based MCP server

## Prerequisites

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/)

## Getting Started (Development)

### 1. Clone the repository

```bash
git clone https://github.com/SeeYangZhi/heroicons-mcp.git
cd heroicons-mcp
```

### 2. Install Bun (if you don't have it)

Refer to the official [Bun installation guide](https://bun.sh/docs/installation).  
After installation, restart your terminal and check:

```bash
bun --version
```

### 3. Install dependencies

```bash
bun install
```

### 4. Build the project

This compiles the TypeScript source to JavaScript in the `build` directory.

```bash
bun run build
```

## Usage

### HTTP Mode

You can run the HTTP server using `npx`:

```bash
npx heroicons-mcp
```

This starts the HTTP server (defaults to port 3000, as defined in `src/http.ts`).

Or install globally:

```bash
npm install -g heroicons-mcp
```

Then run:

```bash
heroicons-mcp
```

### Stdio Mode

```bash
npx heroicons-mcp --stdio
# or if installed globally
heroicons-mcp --stdio
```

## Local Development

There are two main ways to run the MCP server:

### 1. HTTP Mode

Suitable for clients that support communication over HTTP.

**For development (using Bun):**

```bash
bun run start
# or directly
bun run src/entry.ts
```

This runs the server defined in `src/entry.ts`, which defaults to HTTP mode.

### 2. Stdio Mode

Often used for direct integration with tools like Claude Desktop or the MCP Inspector, communicating over standard input/output.

**For development (using Bun):**

```bash
bun run src/entry.ts --stdio
```

## Configuration with AI Tools

### Example: Claude Desktop

To use this MCP server in [Claude Desktop](https://www.anthropic.com/claude-desktop):

1. Open your Claude Desktop configuration file:

```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

(Or use your preferred editor) 2. Add the server to the `mcpServers` section.

**Option A: via `npx`:**

```json
{
  "mcpServers": {
    "heroicons": {
      "command": "npx",
      "args": ["heroicons-mcp", "--stdio"]
    }
  }
}
```

**Option B: Pointing directly to the build output (ensure you have built the project using `bun run build`):**

```json
{
  "mcpServers": {
    "heroicons": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/heroicons-mcp/build/entry.js", "--stdio"]
    }
  }
}
```

Replace `/ABSOLUTE/PATH/TO/heroicons-mcp/build/entry.js` with the actual absolute path to your built `entry.js` file.

3. Save the file and restart Claude Desktop.
4. You should now see the "heroicons" server available in Claude's tools panel.

_Note: The `npx heroicons-mcp --stdio` command is the recommended way for stdio mode._

## Tools Available (MCP)

This MCP server exposes the following tools to AI coding assistants:

1. **list_all_icons**

- Description: Lists all available Heroicons, optionally filtered by style (outline, solid).
- Parameters: `style` (optional: "outline" | "solid")

2. **search_icons**

- Description: Searches for Heroicons by name or keywords across all styles.
- Parameters: `query` (string), `style` (optional: "outline" | "solid")

3. **get_icon_usage_examples**

- Description: Retrieves JSX example usage for a specific icon.
- Parameters: `name` (string), `style` (string: "outline" | "solid")

## Example Usage

Here's how an AI tool might use this MCP server:

1. **User asks AI tool**: "Find me a 'user' icon from Heroicons, preferably the solid style."
2. **AI tool calls `search_icons`**:

- `query`: "user"
- `style`: "solid"

3. **MCP server responds** with a list of matching solid Heroicons (e.g., `UserIcon`, `UserCircleIcon`, `UserPlusIcon`).
4. **User asks tool**: "Show usage example of UserIcon".
5. **AI tool calls `get_icon_usage_examples`**:

- `name`: "UserIcon"
- `style`: "solid"

6. **MCP server responds** with the JSX code example:

```jsx
import { UserIcon } from "@heroicons/react/24/solid";

function Example() {
  return (
    <div>
      <UserIcon className="w-6 h-6 text-blue-500" />
    </div>
  );
}
```

## Testing MCP Locally with Inspector

You can test the MCP server (stdio mode) locally using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector).

First, ensure the project is built:

```bash
bun run build
```

Then launch the Inspector and connect it to your server using the `node ./build/entry.js` command with the `--stdio` flag:

```bash
npx @modelcontextprotocol/inspector node ./build/entry.js --stdio
```

This will open the Inspector interface, allowing you to interactively test resources and tools exposed by your MCP server.

## Development Scripts

- **`bun run dev`**: Starts the server in HTTP mode for development (uses `src/entry.ts`).
- **`bun run dev:stdio`**: Starts the stdio MCP server for development (uses `src/entry.ts --stdio`).
- **`bun run build`**: Compiles TypeScript to JavaScript (output in `build/`).
- **`bun run lint`**: Lints the codebase using ESLint.

## Resources

- [Heroicons](https://heroicons.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Bun](https://bun.sh/)

## License

[MIT](LICENSE)
