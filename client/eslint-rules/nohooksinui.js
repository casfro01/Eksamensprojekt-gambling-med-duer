const noHooksInUi = {
  meta: {
    type: "problem",
    // Message that will be shown when the rule is violated
    messages: { ban: "No {{name}} in UI files. Move to a hook." },
  },
  create(ctx) {
    // Get the filename and check if it ends with .tsx
    const f = ctx.getFilename().replace(/\\/g, "/");
    const isUi = /.tsx$/.test(f);
    if (!isUi) return {};

    // List of hooks that are banned in UI files -> Violating separation of concerns e.g. state and logic in our view
    const banned = new Set([
      "useState",
      "useReducer",
      "useEffect",
      "useContext",
      "useRef",
      "useMemo",
      "useCallback",
    ]);

    return {
      // Check for banned hooks in import statements
      ImportSpecifier(n) {
        // Check if the import is from react and the imported name is in the banned list
        if (n.parent.source.value === "react" && banned.has(n.imported.name)) {
          ctx.report({
            node: n,
            messageId: "ban",
            data: { name: n.imported.name },
          });
        }
      },
      // Check for banned hooks in function calls
      CallExpression(n) {
        // Get the callee and the name of the function
        const cal = n.callee;
        const name = cal.type === "Identifier" ? cal.name : null;
        // Check if the name is in the banned list
        if (name && banned.has(name))
          ctx.report({ node: n, messageId: "ban", data: { name } });
      },
    };
  },
};
export const plugin = { rules: { "no-hooks-in-ui": noHooksInUi } };