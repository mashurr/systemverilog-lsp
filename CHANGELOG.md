# Changelog

## 0.2.0

- New language server with live project-wide errors, go to definition, hover and completion.
- Syntax coloring, outline and folding for Verilog and SystemVerilog.
- Optional `.svls.toml` for source order, file lists, include paths, defines and top modules; existing svls linter settings are picked up.
- Errors appear first on large designs while navigation finishes in the background, and very large workspaces without a file list are analyzed one folder at a time.
- `.svh` files are recognized, and **SystemVerilog LSP: Restart** restarts the server.
- Renamed to SystemVerilog LSP; existing installs update normally.

## 0.1.1

- Syntax error diagnostics.
