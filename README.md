# SystemVerilog LSP

Verilog and SystemVerilog language support that understands your whole project: live errors, go to definition, hover and completion.

## Features

- **Live errors** as you type, including unsaved files and headers.
- **Go to definition** across files for modules, interfaces, packages, ports, parameters, signals, functions and `` `include `` files.
- **Hover** shows the declaration, its type, and evaluated widths and parameter values.
- **Completion** for keywords, declarations, package members, instance ports and parameters, and include paths.
- **Syntax coloring, outline and folding** that keep working while code is incomplete.
- **No setup needed**: open a folder and its `.v` and `.sv` files are found automatically.
- **Responsive on large designs**: errors show up first while navigation finishes in the background.
- **Everything included**: no compiler or other tools to install. Works on remote Linux hosts too.
- **Restart** the language server from the command palette: **SystemVerilog LSP: Restart**.

## Project Configuration

For designs that need a specific source order, include paths, defines or a top module, add `.svls.toml` at the workspace root:

```toml
files = ["rtl/types.sv", "rtl/top.sv"]
filelists = ["rtl.f"]
include_dirs = ["rtl/include"]
top_modules = ["top"]
exclude = ["generated/**"]

[defines]
SYNTHESIS = "1"
```

- Paths are relative to the workspace root. `files` and `filelists` replace automatic discovery; `exclude` only filters it.
- File lists support source paths, `-f`, `-F`, `+incdir+` and `+define+`.
- An existing `.svls.toml` from the svls linter works as is; its include paths and defines are used.

## Requirements

- VS Code 1.90 or later on Linux (x64 or ARM64), macOS (Intel or Apple Silicon) or Windows x64.

## Known Issues

- Workspaces with more than 1,000 source files and no file list are analyzed one folder at a time. Add `files` or `filelists` for whole-design navigation.
- Hover can leave out evaluated widths and values when a declaration is used with different parameters.
- Names built by complex macros may have no definition or hover.
- Find references, rename and signature help are not available yet.

Report issues on [GitHub](https://github.com/mashurr/systemverilog-lsp/issues).

## Release Notes

See [CHANGELOG.md](CHANGELOG.md).
