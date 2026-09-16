# Asset and Content Boundaries / 资产与内容边界

The root software license covers original application code only where
e-dialect is authorized to license it. Content, data, media, and brand assets
do not automatically receive that software license merely because they are
stored in or displayed by this repository.

| Path or material | Boundary |
|---|---|
| Original Vue application code, configuration, and build scripts | Software license in [`LICENSE`](./LICENSE), subject to authorship and file-level exceptions |
| `src/assets/content.js` | Independently rewritten short factual summaries; site content rather than software, with provenance and reuse boundaries recorded in [`CONTENT_PROVENANCE.md`](./CONTENT_PROVENANCE.md) |
| `src/assets/*.png` and `public/favicon.png` | Logos and visual/brand assets; no trademark or additional media permission is granted by the root software license |
| Text, corpus material, or media loaded from external services or supplied later | External content; source, provenance, and an applicable content/data license or other authorization are required |
| Generated builds and screenshots | Their status follows the rights in their inputs; generation does not create a new license for excluded content or brand assets |

Dependencies installed from `package.json` and `package-lock.json` retain their
upstream licenses. Moving external material into this repository does not
change its ownership or licensing status.

---

根软件许可证只覆盖 e-dialect 有权授权的原创应用代码。`src/assets/content.js` 中的简短
事实摘要属于站点内容，其重写经过与重用边界见 [`CONTENT_PROVENANCE.md`](./CONTENT_PROVENANCE.md)；
`src/assets/*.png` 与 `public/favicon.png` 属于视觉或品牌资产。这些材料不会因为存放于
本仓库或由网站展示而自动取得软件许可证。重用相关材料前必须另行核实来源、权利、
授权及商标边界；生成构建物或截图也不会为其输入内容产生新的许可。
