import type { Plugin } from "@opencode-ai/plugin"

const plugin: Plugin = {
  id: "prettier-hook",
  async setup({ $ }) {
    return {
      "tool.execute.after": async (input, output) => {
        if (input.tool !== "write" && input.tool !== "edit") return

        const filePath = input.args?.filePath as string | undefined
        if (!filePath || !/\.(ts|tsx)$/.test(filePath)) return

        try {
          await $`npx prettier --write ${filePath}`.quiet()
        } catch (err) {
          console.error(`[prettier-hook] Failed to format ${filePath}:`, err)
        }
      },
    }
  },
}

export default plugin