/**
 * Entry point for the MCP server using stdio transport.
 *
 * This implementation creates an MCP server instance and connects it to a
 * standard input/output (stdio) transport, allowing communication over
 * process stdio streams.
 *
 * If the server fails to start or encounters an error during initialization,
 * the process will exit with a non-zero status code.
 */
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { createMcpServer } from "./utils.js";

async function main() {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(() => {
  process.exit(1);
});
