import { z } from "zod";

import * as outlineIcons from "@heroicons/react/24/outline";
import * as solidIcons from "@heroicons/react/24/solid";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const getAllIcons = () => {
  // Only keep keys ending with 'Icon'
  const solid = Object.keys(solidIcons).filter((k) => k.endsWith("Icon"));
  const outline = Object.keys(outlineIcons).filter((k) => k.endsWith("Icon"));
  return {
    solid,
    outline
  };
};

export const categorizeIcon = (iconName: string): string[] => {
  // Simple heuristic: categorize by substrings in the name
  const cats: string[] = [];
  const lower = iconName.toLowerCase();
  if (lower.includes("arrow")) cats.push("arrows");
  if (
    lower.includes("user") ||
    lower.includes("person") ||
    lower.includes("group")
  )
    cats.push("users");
  if (
    lower.includes("file") ||
    lower.includes("document") ||
    lower.includes("folder") ||
    lower.includes("clipboard")
  )
    cats.push("files");
  if (
    lower.includes("circle") ||
    lower.includes("square") ||
    lower.includes("star") ||
    lower.includes("cube") ||
    lower.includes("shape")
  )
    cats.push("shapes");
  if (
    lower.includes("plus") ||
    lower.includes("minus") ||
    lower.includes("xmark") ||
    lower.includes("check") ||
    lower.includes("chevron") ||
    lower.includes("menu") ||
    lower.includes("list") ||
    lower.includes("dot") ||
    lower.includes("ellipsis")
  )
    cats.push("interface");
  if (
    lower.includes("cart") ||
    lower.includes("bag") ||
    lower.includes("credit") ||
    lower.includes("currency") ||
    lower.includes("wallet") ||
    lower.includes("receipt") ||
    lower.includes("gift")
  )
    cats.push("commerce");
  if (
    lower.includes("chat") ||
    lower.includes("mail") ||
    lower.includes("envelope") ||
    lower.includes("phone") ||
    lower.includes("message") ||
    lower.includes("inbox")
  )
    cats.push("communication");
  if (
    lower.includes("device") ||
    lower.includes("computer") ||
    lower.includes("phone") ||
    lower.includes("tablet") ||
    lower.includes("tv") ||
    lower.includes("camera")
  )
    cats.push("devices");
  if (
    lower.includes("sun") ||
    lower.includes("moon") ||
    lower.includes("cloud") ||
    lower.includes("weather")
  )
    cats.push("weather");
  if (cats.length === 0) cats.push("misc");
  return cats;
};

const allIcons = getAllIcons();
export const iconMeta = [
  ...allIcons.solid.map((name) => ({
    name,
    style: "solid",
    categories: categorizeIcon(name)
  })),
  ...allIcons.outline.map((name) => ({
    name,
    style: "outline",
    categories: categorizeIcon(name)
  }))
];

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "Heroicons MCP Server",
    version: "0.2.0"
  });

  // Tool: search_icons
  server.tool(
    "search_icons",
    "Search for icons from heroicons by name or category",
    {
      query: z.string().describe("Search term for icon name or category"),
      style: z
        .enum(["solid", "outline"])
        .optional()
        .describe("Icon style: solid or outline"),
      category: z
        .string()
        .optional()
        .describe("Category to filter by (optional)"),
      limit: z
        .number()
        .min(1)
        .max(100)
        .default(20)
        .optional()
        .describe("Max results to return")
    },
    async ({ query, style, category, limit }) => {
      let results = iconMeta.filter((icon) => {
        const matchName = icon.name.toLowerCase().includes(query.toLowerCase());
        const matchCat = category ? icon.categories.includes(category) : true;
        const matchStyle = style ? icon.style === style : true;
        return matchName && matchCat && matchStyle;
      });
      if (limit) results = results.slice(0, limit);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2)
          }
        ]
      };
    }
  );

  // Tool: get_icon_usage_examples
  server.tool(
    "get_icon_usage_examples",
    "Get usage examples for an icon",
    {
      name: z.string().describe("Icon component name, e.g. BeakerIcon"),
      style: z
        .enum(["solid", "outline"])
        .describe("Icon style: solid or outline")
    },
    async ({ name, style }) => {
      const pkg = `@heroicons/react/24/${style}`;
      const importLine = `import { ${name} } from '${pkg}';`;
      const jsxLine = `<${name} className="w-6 h-6 text-blue-500" />`;
      const example = `${importLine}\n\nfunction Example() {\n  return (\n    <div>\n      ${jsxLine}\n    </div>\n  );\n}`;
      return {
        content: [
          {
            type: "text",
            text: example
          }
        ]
      };
    }
  );

  // Tool: list_all_icons
  server.tool(
    "list_all_icons",
    "List all icons from the heroicons library, optionally filtered by style",
    {
      style: z
        .enum(["solid", "outline"])
        .optional()
        .describe("Icon style: solid or outline (optional)")
    },
    async ({ style }) => {
      // Limit to 1000 icons for safety
      let results = iconMeta;
      if (style) {
        results = results.filter((icon) => icon.style === style);
      }
      const names = results.slice(0, 1000).map((icon) => icon.name);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(names, null, 2)
          }
        ]
      };
    }
  );
  return server;
}
